import os
from dotenv import load_dotenv
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

# Configure detailed logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def send_email_with_attachment(file: bytes, filename: str):
    try:
        sender_email = "jobfhr6@gmail.com"
        sender_password = "app password"
        recipient_email = "nguyenbaduy011@gmail.com"

        # Log email sender and recipient
        logger.info(f"Sender Email: {sender_email}")
        logger.info(f"Recipient Email: {recipient_email}")

        if not all([sender_email, sender_password, recipient_email]):
            logger.error("Thiếu thông tin email. Kiểm tra .env")
            return False

        # Construct the email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f'CV Mới: {filename}'

        body = f'CV mới được nộp: {filename}'
        msg.attach(MIMEText(body, 'plain'))

        part = MIMEBase('application', 'octet-stream')
        part.set_payload(file)
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename={filename}')
        msg.attach(part)

        # Connect to Gmail SMTP server and send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.set_debuglevel(1)
            server.starttls()
            
            logger.info("Đang đăng nhập email...")
            server.login(sender_email, sender_password)
            logger.info("Đăng nhập thành công")
            
            logger.info("Đang gửi email...")
            server.send_message(msg)
            logger.info("Gửi email thành công")
        
        return True

    except smtplib.SMTPAuthenticationError as auth_error:
        logger.error(f"Lỗi xác thực SMTP: {auth_error}")
        return False
    except Exception as e:
        logger.error(f"Lỗi gửi email không xác định: {e}")
        return False

@app.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    if file.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail="Chỉ được upload file PDF")

    file_content = await file.read()

    # Send email
    email_sent = send_email_with_attachment(file_content, file.filename)

    if email_sent:
        return {"message": "CV đã được tải lên và gửi thành công"}
    else:
        raise HTTPException(status_code=500, detail="Lỗi gửi email")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)