from app import db
from datetime import datetime
from app.services.encryption import encrypt_data, decrypt_data

class Quiz(db.Model):
    __tablename__ = 'quiz'
    
    id = db.Column(db.Integer, primary_key=True)
    title_encrypted = db.Column(db.Text, nullable=False)
    description_encrypted = db.Column(db.Text, nullable=True)
    difficulty_level_encrypted = db.Column(db.String(20), nullable=False)
    deadline_encrypted = db.Column(db.DateTime, nullable=True)
    attempts = db.Column(db.Integer, nullable=False, default=1)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creation_date = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
    encryption_key_id = db.Column(db.Integer, db.ForeignKey('encryption_keys.id'))
    
    questions = db.relationship('Question', backref='quiz', lazy='dynamic', cascade='all, delete-orphan')
    student_quizzes = db.relationship('StudentQuiz', backref='quiz', lazy='dynamic')
    
    @property
    def title(self):
        return decrypt_data(self.title_encrypted, self.encryption_key_id)
    
    @title.setter
    def title(self, value):
        self.title_encrypted = encrypt_data(value, self.encryption_key_id)
    
    @property
    def description(self):
        if self.description_encrypted:
            return decrypt_data(self.description_encrypted, self.encryption_key_id)
        return None
    
    @description.setter
    def description(self, value):
        if value:
            self.description_encrypted = encrypt_data(value, self.encryption_key_id)
        else:
            self.description_encrypted = None