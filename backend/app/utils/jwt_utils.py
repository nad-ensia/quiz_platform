import jwt
import datetime
from flask import current_app

def encode_jwt(payload: dict, exp_minutes: int = 60):
    payload_copy = payload.copy()
    payload_copy["exp"] = datetime.datetime.utcnow() + datetime.timedelta(minutes=exp_minutes)
    token = jwt.encode(payload_copy, current_app.config["JWT_SECRET"], algorithm="HS256")
    return token

def decode_jwt(token: str):
    try:
        payload = jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
