from flask_admin import Admin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate


db = SQLAlchemy()
admin = Admin(name='', template_mode='bootstrap4')
ma = Marshmallow()
migrate = Migrate()
