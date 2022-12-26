from flask import Flask
import os
from web.models import db
from web.admin import admin
from web.ma import ma
from sqlalchemy import create_engine
from .models import login


def create_db(app):
    if not os.path.exists("web/electronics.db"):
        with app.app_context():
            db.create_all()
        print("CREATED DATABASE")
def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    
    from .home.controller import home
    app.register_blueprint(home)
    
    from .auth.controller import auth
    app.register_blueprint(auth)
    
    db.init_app(app)
    login.init_app(app)
    create_db(app)
    admin.init_app(app)
    ma.init_app(app)
    
    return app