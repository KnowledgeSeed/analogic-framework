import os, smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader, select_autoescape, TemplateNotFound
import logging


class EmailManager:

    def send_email(self, request, tm1_service, setting, authentication_provider):
        post_data = request.json if request.method == 'POST' else request.values.to_dict()
        return EmailManager.send_email_by_params(setting, post_data)

    @staticmethod
    def send_email_by_params(setting, post_data, sender_email_address = None):
        logger = logging.getLogger(setting.get_instance())

        if 'email_template' not in post_data:
            return EmailManager._error('missing email_template parameter from request', logger)

        customer_email_template_dir = os.path.join(setting.site_root, 'server', 'email_templates')

        if not os.path.exists(customer_email_template_dir):
            return EmailManager._error(customer_email_template_dir + ' does not exist', logger)

        env = Environment(
            loader=FileSystemLoader(customer_email_template_dir),
            autoescape=select_autoescape()
        )

        email_template_name = post_data['email_template'].removesuffix('.html') + '.html'
        try:
            email_html = env.get_template(email_template_name).render(post_data)
        except TemplateNotFound:
            return EmailManager._error(
                post_data['email_template'] + ' template not found in: ' + customer_email_template_dir,
                logger)

        cnf = setting.get_config()

        if 'smtp' not in cnf:
            return EmailManager._error('smtp is not configured', logger)

        smtp_config = cnf['smtp']

        if sender_email_address is None:
            sender_email = EmailManager._get_required_config_value(smtp_config, 'sender_email')
        else:
            sender_email = sender_email_address

        receiver_email = post_data.get('receiver_email')

        if receiver_email is None:
            raise Exception('receiver_email missing')

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
        password = setting.get_smtp_password()

        if is_ssl is False:
            server = smtplib.SMTP(smtp_server, port)
            if is_tls:
                server.starttls()
        else:
            context = ssl.create_default_context()
            server = smtplib.SMTP_SSL(smtp_server, port, context=context)

        if password is not None:
            server.login(sender_email, password)

        if multi_receiver:
            for email in receiver_email:
                server.sendmail(sender_email, email, message.as_string())
        else:
            server.sendmail(sender_email, receiver_email, message.as_string())

        server.quit()

        return {}, 200, {'Content-type': 'application/json'}

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
