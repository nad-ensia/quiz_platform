from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.quiz import Quiz
from app.services.encryption import create_quiz_key

quizzes_bp = Blueprint('quizzes', __name__)

@quizzes_bp.route('/', methods=['POST'])
@jwt_required()
def create_quiz():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user or user.role != 'teacher':
        return jsonify({"error": "Only teachers can create quizzes"}), 403
    
    data = request.get_json()
    
    # Validate input
    if 'title' not in data:
        return jsonify({"error": "Quiz title is required"}), 400
    
    # Create encryption key for this quiz
    key_id = create_quiz_key()
    
    # Create new quiz
    quiz = Quiz(
        creator_id=user.id,
        encryption_key_id=key_id
    )
    
    # Set encrypted fields
    quiz.title = data['title']
    if 'description' in data:
        quiz.description = data['description']
    
    db.session.add(quiz)
    db.session.commit()
    
    return jsonify({
        "message": "Quiz created successfully",
        "quiz_id": quiz.id
    }), 201

@quizzes_bp.route('/', methods=['GET'])
@jwt_required()
def get_quizzes():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Teachers see their created quizzes
    if user.role == 'teacher':
        quizzes = Quiz.query.filter_by(creator_id=user.id).all()
    # Students see all quizzes
    else:
        quizzes = Quiz.query.all()
    
    return jsonify({
        "quizzes": [{
            "id": quiz.id,
            "title": quiz.title,
            "description": quiz.description,
            "creation_date": quiz.creation_date.isoformat()
        } for quiz in quizzes]
    }), 200

@quizzes_bp.route('/<int:quiz_id>', methods=['GET'])
@jwt_required()
def get_quiz(quiz_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    
    # Security check: Only creator or enrolled students can access
    if user.role == 'teacher' and quiz.creator_id != user.id:
        return jsonify({"error": "Not authorized"}), 403
    
    # For a student, check if they're enrolled (you'd need to implement this)
    
    # Return detailed quiz data
    return jsonify({
        "id": quiz.id,
        "title": quiz.title,
        "description": quiz.description,
        "creation_date": quiz.creation_date.isoformat(),
        "questions": []  # You'd populate this with question data
    }), 200