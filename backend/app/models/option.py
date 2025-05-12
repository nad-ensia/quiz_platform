from app import db

class Option(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    option_text = db.Column(db.LargeBinary, nullable=False)
    is_correct = db.Column(db.Boolean, default=False)
