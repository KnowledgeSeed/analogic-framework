import os, smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader, select_autoescape, TemplateNotFound
import logging
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=3)

class EmailManager:

    def send_email(self, request, tm1_service, setting, authentication_provider):
        post_data = request.json if request.method == 'POST' else request.values.to_dict()

        customer_email_template_dir = os.path.join(setting.site_root, 'server', 'email_templates')
        cnf = setting.get_config()
        smtp_password = setting.get_smtp_password()
        instance_name = setting.get_instance()

        executor.submit(
            EmailManager.send_email_background,
            post_data, customer_email_template_dir, cnf, smtp_password, instance_name
        )

        return {'message': 'Email queued'}, 200, {'Content-type': 'application/json'}

    @staticmethod
    def send_email_background(post_data, template_dir, cnf, smtp_password, instance_name):
        logger = logging.getLogger(instance_name)

        if 'email_template' not in post_data:
            logger.error('missing email_template parameter from request')
            return

        if not os.path.exists(template_dir):
            logger.error(template_dir + ' does not exist')
            return

        env = Environment(
            loader=FileSystemLoader(template_dir),
            autoescape=select_autoescape()
        )

        email_template_name = post_data['email_template'].removesuffix('.html') + '.html'
        try:
            email_html = env.get_template(email_template_name).render(post_data)
        except TemplateNotFound:
            logger.error(post_data['email_template'] + ' template not found in: ' + template_dir)
            return

        if 'smtp' not in cnf:
            logger.error('smtp is not configured')
            return

        smtp_config = cnf['smtp']

        sender_email = EmailManager._get_required_config_value(smtp_config, 'sender_email')
        receiver_email = post_data.get('receiver_email')

        if receiver_email is None:
            logger.error('receiver_email missing')
            return

        multi_receiver = type(receiver_email) is list

        message = MIMEMultipart()
        message["Subject"] = post_data.get('subject', '')
        message["From"] = sender_email
        message["To"] = ','.join(receiver_email) if multi_receiver else receiver_email

        message.attach(MIMEText(email_html, "html"))

        smtp_server = EmailManager._get_required_config_value(smtp_config, 'server')
        port = EmailManager._get_required_config_value(smtp_config, 'port')
        is_ssl = smtp_config.get('ssl', False)
        is_tls = smtp_config.get('tls', False)

        try:
            if is_ssl is False:
                server = smtplib.SMTP(smtp_server, port)
                if is_tls:
                    server.starttls()
            else:
                context = ssl.create_default_context()
                server = smtplib.SMTP_SSL(smtp_server, port, context=context)

            if smtp_password is not None:
                server.login(sender_email, smtp_password)

            if multi_receiver:
                for email in receiver_email:
                    server.sendmail(sender_email, email, message.as_string())
            else:
                server.sendmail(sender_email, receiver_email, message.as_string())

            server.quit()
        except Exception as e:
            logger.error(f"SMTP error occurred: {str(e)}")

    @staticmethod
    def _get_required_config_value(cnf, property_name):
        val = cnf.get(property_name)
        if val is None:
            raise Exception('{0} is not configured'.format(property_name))
        return val

    @staticmethod
    def _error(message, logger):
        logger.error(message)
        return {'message': message}, 500, {'Content-type': 'application/json'}