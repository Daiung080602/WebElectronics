from flask import Blueprint
from web.Extension.ma import CustomerSchema, TransactionSchema


Customers = Blueprint('Customers', __name__)
customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)
transaction_schema = TransactionSchema()
