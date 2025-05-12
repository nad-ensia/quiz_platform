from app import db

class EncryptionKey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key_identifier = db.Column(db.String(128), nullable=False, unique=True)
    encrypted_key = db.Column(db.LargeBinary, nullable=False)
    iv = db.Column(db.LargeBinary, nullable=False)

    quizzes = db.relationship('Quiz', backref='encryption_key', lazy=True)
