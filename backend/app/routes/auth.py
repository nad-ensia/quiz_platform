from flask import Blueprint, request, jsonify, make_response
from app.utils.helpers import hash_password
from app.models.supabase_queries import get_user_by_rfid, update_user_signup_info
from werkzeug.security import check_password_hash 
from app.utils.jwt_utils import encode_jwt

auth_bp = Blueprint('auth', __name__)



#---------------signup-------------------

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received data:", data)
    
    # Check for all required fields
    required_fields = ['rfid', 'role', 'full_name', 'email', 'password', 'confirm_password']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        print("Missing fields:", missing_fields)
        return jsonify({'error': 'Missing fields', 'missing': missing_fields}), 400

    rfid = data['rfid']
    role = data['role']
    full_name = data['full_name']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']

    # Validate password confirmation
    print(f"Validating passwords: password == confirm_password? {password == confirm_password}")
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    # Find user by RFID
    print(f"Looking for user with RFID: {rfid}")
    user = get_user_by_rfid(rfid)
    print("User found:", user)
    if not user:
        return jsonify({'error': 'RFID not found'}), 404

    # Check if provided role matches the user's role
    print(f"Checking role: provided '{role}', user role '{user['role']}'")
    if user['role'] != role:
        return jsonify({'error': 'Role mismatch'}), 403

    # Check if user already signed up (email, full_name or password already set)
    print(f"Checking if user already signed up: email: {user.get('email')}, full_name: {user.get('full_name')}, password: {user.get('password')}")
    
    def is_filled(value):
        return value is not None and value != ''
    
    if any(is_filled(user.get(field)) for field in ['email', 'full_name', 'password']):
        return jsonify({'error': 'User already signed up'}), 409

    # Hash the password securely
    hashed_pwd = hash_password(password)
    print(f"Hashed password: {hashed_pwd}")

    # Update the user info in the database (email, full_name, password)
    print("Updating user signup info...")
    update_resp = update_user_signup_info(user['id'], full_name, email, hashed_pwd)

    # Fixed error handling for Supabase APIResponse object
    if not update_resp:
        return jsonify({'error': 'No response from database'}), 500
        
    if hasattr(update_resp, 'error') and update_resp.error:
        return jsonify({'error': f'Database error: {update_resp.error}'}), 500
        
    if not hasattr(update_resp, 'data') or not update_resp.data:
        return jsonify({'error': 'Update returned no data'}), 500

    # Successful signup completion
    return jsonify({'message': 'Signup successful'}), 201






#---------------login-------------------

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Login request data:", data)
    
    required_fields = ['rfid', 'password', 'role']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        print("Missing fields in login data:", missing_fields)
        return jsonify({'error': 'Missing fields', 'missing': missing_fields}), 400

    rfid = data['rfid']
    password = data['password']
    role = data['role']

    print(f"Attempting login for RFID: {rfid}, Role: {role}")

    # Fetch user by RFID
    user = get_user_by_rfid(rfid)
    print("User fetched from DB:", user)
    if not user:
        print("User not found for RFID:", rfid)
        return jsonify({'error': 'User not found'}), 404

    # Check role match
    print(f"User role in DB: {user['role']}, Provided role: {role}")
    if user['role'] != role:
        print("Role mismatch")
        return jsonify({'error': 'Role mismatch'}), 403

    # Verify password (hashed)
    if not user.get('password'):
        print("No password set for user; user must sign up first")
        return jsonify({'error': 'User has no password set, please sign up'}), 403

    from werkzeug.security import check_password_hash
    password_matches = check_password_hash(user['password'], password)
    print(f"Password verification result: {password_matches}")
    if not password_matches:
        print("Invalid password attempt for user:", user['id'])
        return jsonify({'error': 'Invalid password'}), 401

    # Prepare JWT payload
    payload = {
        "id": user['id'],
        "name": user.get('full_name', ''),
        "role": user['role'],
        "rfid": user['rfid']
    }
    print("JWT payload to encode:", payload)
    token = encode_jwt(payload, exp_minutes=60)
    print("Generated JWT token:", token)

    # Create response with HttpOnly cookie
    response = make_response(jsonify({'message': 'Login successful'}))
    response.set_cookie('access_token', token, httponly=True, secure=True, samesite='Strict')
    print("Login successful, sending response with cookie")

    return response
