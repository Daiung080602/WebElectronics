from flask import Flask
import os
from web.Extension.models import db
from web.Extension.ma import ma
from web.Extension import migrate
from flask_cors import CORS


def create_db(app):
    if not os.path.exists("web/electronics.db"):
        with app.app_context():
            db.create_all()
        print("CREATED DATABASE")


def create_app(config_file='config.py'):
    app = Flask(__name__)
    CORS(
        app=app,
        origins='*',
        methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
        supports_credentials=True
    )
    app.config.from_pyfile(config_file)

    from web.Controller.Auth.route import auth
    app.register_blueprint(auth)

    from web.Controller.Offices.route import Offices
    app.register_blueprint(Offices)
    
    from web.Controller.Product.route import Products
    app.register_blueprint(Products) 
    
    from web.Controller.Customer.route import Customers
    app.register_blueprint(Customers)

    from web.Controller.Productline.route import Productlines
    app.register_blueprint(Productlines)
    
    db.init_app(app)
    create_db(app)

    ma.init_app(app)
    migrate.init_app(app, db)
    # khi nào sửa cơ sở dữ liệu thì chạy 'flask db migrate' rồi 'flask db upgrade'

    return app
