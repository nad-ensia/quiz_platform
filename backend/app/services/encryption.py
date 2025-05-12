from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os
from flask import current_app
from app import db

class EncryptionKey(db.Model):
    __tablename__ = 'encryption_keys'
    
    id = db.Column(db.Integer, primary_key=True)
    key_identifier = db.Column(db.String(64), unique=True, nullable=False)
    encrypted_key = db.Column(db.Text, nullable=False)
    iv = db.Column(db.Text, nullable=False)  # Initialization vector
    
    quizzes = db.relationship('Quiz', backref='encryption_key', lazy='dynamic')

def generate_master_key():
    """Generate a new master encryption key"""
    return Fernet.generate_key()

def get_master_key():
    """Retrieve the master encryption key from environment"""
    key = current_app.config['MASTER_ENCRYPTION_KEY']
    if not key:
        raise ValueError("Master encryption key not configured")
    return key.encode() if isinstance(key, str) else key

def create_quiz_key():
    """Create a new encryption key for a quiz"""
    # Generate new key
    key = Fernet.generate_key()
    
    # Generate a random identifier
    key_identifier = base64.urlsafe_b64encode(os.urandom(16)).decode('utf-8')
    
    # Generate IV
    iv = os.urandom(16)
    iv_b64 = base64.b64encode(iv).decode('utf-8')
    
    # Encrypt the key with master key
    master_key = get_master_key()
    f = Fernet(master_key)
    encrypted_key = f.encrypt(key).decode('utf-8')
    
    # Store encrypted key
    key_entry = EncryptionKey(
        key_identifier=key_identifier,
        encrypted_key=encrypted_key,
        iv=iv_b64
    )
    db.session.add(key_entry)
    db.session.commit()
    
    return key_entry.id

def get_key_for_quiz(key_id):
    """Retrieve and decrypt a quiz encryption key"""
    key_entry = EncryptionKey.query.get(key_id)
    if not key_entry:
        raise ValueError(f"No encryption key found with ID {key_id}")
    
    master_key = get_master_key()
    f = Fernet(master_key)
    return f.decrypt(key_entry.encrypted_key.encode())

def encrypt_data(data, key_id):
    """Encrypt data using a specific quiz key"""
    if data is None:
        return None
        
    key = get_key_for_quiz(key_id)
    f = Fernet(key)
    return f.encrypt(data.encode()).decode('utf-8')

def decrypt_data(encrypted_data, key_id):
    """Decrypt data using a specific quiz key"""
    if encrypted_data is None:
        return None
        
    key = get_key_for_quiz(key_id)
    f = Fernet(key)
    return f.decrypt(encrypted_data.encode()).decode('utf-8')