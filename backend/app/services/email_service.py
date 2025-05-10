from flask_mail import Message
from flask import current_app
from app.extensions import mail

def send_confirmation_email(user_email, booking):
    msg = Message("Your Move is Confirmed",
                  sender=current_app.config.get("MAIL_DEFAULT_SENDER"),
                  recipients=[user_email])
    msg.body = f"Hello,\n\nYour move for booking ID {booking.id} has been confirmed.\n\nThank you!"
    mail.send(msg)
