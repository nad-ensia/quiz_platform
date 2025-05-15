from flask import Flask
from app.extensions import supabase, cors
from app.routes.auth import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Init CORS, Supabase, etc.
    cors.init_app(app)
    supabase.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api")

    return app
