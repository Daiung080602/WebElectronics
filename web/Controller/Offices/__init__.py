from flask import Blueprint
from web.Extension.ma import OfficeSchema, OfficeSchema_login


Offices = Blueprint('Offices', __name__)
offices_schema = OfficeSchema(many=True)
office_schema = OfficeSchema()
officeschema_login = OfficeSchema_login()