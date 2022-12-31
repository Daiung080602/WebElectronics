from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate


db = SQLAlchemy()
ma = Marshmallow()  # giúp validate dữ liệu và đưa dữ liệu về json
migrate = Migrate()  # quản lý cơ sở dữ liệu
