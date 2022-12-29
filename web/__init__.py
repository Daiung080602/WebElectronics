from flask import Flask
import os
from web.Extension.models import db
from web.Extension.admin import admin
from web.Extension.ma import ma
from flask_cors import CORS


def create_db(app):
    if not os.path.exists("web/electronics.db"):
        with app.app_context():
            db.create_all()
        print("CREATED DATABASE")


def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    CORS.init_app(
        app=app,
        origins='*',
        methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
        supports_credentials=True
    )
    from web.Auth.controller import auth
    app.register_blueprint(auth)

    from web.Employees.controller import employees
    app.register_blueprint(employees)

    db.init_app(app)
    create_db(app)

    admin.init_app(app)
    ma.init_app(app)

    return app
