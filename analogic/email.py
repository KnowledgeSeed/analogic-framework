import os, smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader, select_autoescape, TemplateNotFound
import logging
from analogic.analogic import APPLICATIONS_DIR


class EmailManager:

    def send_email(self, request, tm1_service, setting):
        logger = logging.getLogger(setting.get_instance())

        post_data = request.values.to_dict()

        if 'email_template' not in post_data:
            return self._error('missing email_template parameter from request', logger)

        customer_email_template_dir = os.path.join(setting.site_root, 'server', 'configs', 'email_templates')

        if not os.path.exists(customer_email_template_dir):
            return self._error(customer_email_template_dir + ' does not exist', logger)

        env = Environment(
            loader=FileSystemLoader(customer_email_template_dir),
            autoescape=select_autoescape()
        )

        email_template_name = post_data['email_template'].removesuffix('.html') + '.html'
        try:
            email_html = env.get_template(email_template_name).render(post_data)
        except TemplateNotFound:
            return self._error(post_data['email_template'] + ' template not found in: ' + customer_email_template_dir,
                               logger)

        cnf = setting.get_config()

        if 'smtp' not in cnf:
            return self._error('smtp is not configured', logger)

        smtp_config = cnf['smtp']

        sender_email = smtp_config['sender_email']
        receiver_email = post_data['receiver_email']

        message = MIMEMultipart()
        message["Subject"] = post_data.get('subject', '')
        message["From"] = sender_email
        message["To"] = receiver_email

        message.attach(MIMEText(email_html, "html"))

        smtp_server = smtp_config['server']
        port = smtp_config['port']

        if 'localhost' == smtp_server:
            server = smtplib.SMTP(smtp_server, port)
            server.sendmail(sender_email, receiver_email, message.as_string())
        else:
            context = ssl.create_default_context()
            password = setting.get_smtp_password()
            server = smtplib.SMTP_SSL(smtp_server, port, context=context)
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())

        return 'OK'

    def _error(self, message, logger):
        logger.error(message)
        return message
