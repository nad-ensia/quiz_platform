from flask_cors import CORS
from supabase import create_client

cors = CORS()

class Supabase:
    def __init__(self):
        self.client = None

    def init_app(self, app):
        self.client = create_client(app.config['SUPABASE_URL'], app.config['SUPABASE_KEY'])
    def __getattr__(self, name):
        return getattr(self.client, name)
    
supabase = Supabase()
