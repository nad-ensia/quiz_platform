from app import db

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    question_text = db.Column(db.LargeBinary, nullable=False)
    question_type = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer, nullable=False)

    options = db.relationship('Option', backref='question', lazy=True)
