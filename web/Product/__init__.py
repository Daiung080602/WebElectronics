from flask import Blueprint
from web.Extension.ma import ProductSchema


products = Blueprint('products', __name__)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)