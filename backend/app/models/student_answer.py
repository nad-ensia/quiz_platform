from app import db

class StudentAnswer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_quiz_id = db.Column(db.Integer, db.ForeignKey('student_quiz.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    answer = db.Column(db.LargeBinary, nullable=False)
    is_correct = db.Column(db.Boolean, default=False)
