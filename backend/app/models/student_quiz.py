from app import db

class StudentQuiz(db.Model):
    __tablename__ = 'student_quiz'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'))
    status = db.Column(db.String(20), default='not started')
    score = db.Column(db.Float, default=0.0)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    attempt_num = db.Column(db.Integer, default=1)

    student_answers = db.relationship('StudentAnswer', backref='student_quiz', lazy=True)
