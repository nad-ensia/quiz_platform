from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config


db = SQLAlchemy()
from app.models.quiz import Quiz
from app.models.student_quiz import StudentQuiz
from app.models.user import User
from app.models.encryption_key import EncryptionKey
from app.models.question import Question
from app.models.student_answer import StudentAnswer
from app.models.question import Question
from app.models.option import Option

migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Configure CORS - restrict to your React frontend origin in production
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.quizzes import quizzes_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(quizzes_bp, url_prefix='/api/quizzes')
    
    @app.route('/api/health')
    def health_check():
        return {"status": "healthy"}
    
    return app