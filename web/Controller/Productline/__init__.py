from flask import Blueprint
from web.Extension.ma import ProductlineSchema


Productlines = Blueprint('productlines', __name__)
productline_schema = ProductlineSchema()
productlines_schema = ProductlineSchema(many=True)