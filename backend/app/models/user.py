from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import string

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'teacher' or 'student'
    salt = db.Column(db.String(32), nullable=False)
    rfid_uuid = db.Column(db.String(128), nullable=True)

    quizzes_created = db.relationship('Quiz', backref='creator', lazy='dynamic')
    student_quizzes = db.relationship('StudentQuiz', backref='student', lazy=True)

    def __init__(self, username, email, password, role, rfid_uuid=None):
        self.username = username
        self.email = email
        self.salt = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
        self.password_hash = generate_password_hash(password + self.salt)
        self.role = role
        self.rfid_uuid = rfid_uuid
        # Ensure the role is either 'teacher' or 'student'
        if role not in ['teacher', 'student']:
            raise ValueError("Role must be either 'teacher' or 'student'")
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password + self.salt)