from flask import Blueprint
from web.Extension.ma import OfficeSchema, OfficeSchema_put

Offices = Blueprint('Offices', __name__)
offices_schema = OfficeSchema(many=True)
office_schema = OfficeSchema()
office_schema_put = OfficeSchema_put()
