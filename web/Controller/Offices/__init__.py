from flask import Blueprint
from web.Extension.ma import OfficeSchema

Offices = Blueprint('Offices', __name__)
offices_schema = OfficeSchema(many=True)
office_schema = OfficeSchema()