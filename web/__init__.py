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
    CORS(app)
    app.config.from_pyfile(config_file)

    from web.Controller.Auth.controller import auth
    app.register_blueprint(auth)

    from web.Controller.Offices import Offices
    app.register_blueprint(Offices)

    from web.Controller.Product import Products
    app.register_blueprint(Products)

    db.init_app(app)
    create_db(app)

    admin.init_app(app)
    ma.init_app(app)

    return app
