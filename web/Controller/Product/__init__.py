from flask import Blueprint
from web.Extension.ma import ProductSchema, LotSchema


Products = Blueprint('Products', __name__)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
lot_schema = LotSchema()
lots_schema = LotSchema(many=True)
