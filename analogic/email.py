import os, smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader, select_autoescape


class EmailManager:

    def send_email(self, request, tm1_service, setting):
        post_data = request.values.to_dict()
        customer_email_template_dir = os.path.join(setting.site_root, 'configs', 'hays', 'email_templates')

        env = Environment(
            loader=FileSystemLoader(customer_email_template_dir),
            autoescape=select_autoescape()
        )

        email_template_name = post_data['email_template'].removesuffix('.html') + '.html'
        email_html = env.get_template(email_template_name).render(post_data)

        cnf = setting.get_config()
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
            password = setting.get_password(sender_email)
            server = smtplib.SMTP_SSL(smtp_server, port, context=context)
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())

        return 'OK'

