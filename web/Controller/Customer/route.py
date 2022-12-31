from flask import Blueprint
from web.Controller.Customer.controller import get_all_customers, create_new_customer, \
    update_customer, create_transaction
Customers = Blueprint('Customers', __name__)


@Customers.route('/api/customers', methods=["GET"])
def get_all_customers_():
    return get_all_customers()


@Customers.route('/api/customers', methods=["POST"])
def create_new_customer_():
    return create_new_customer()


@Customers.route('/api/customers/<id>', methods=["PUT"])
def update_customer_(id):
    return update_customer(id)


@Customers.route('/api/transactions', methods=['POST'])
def create_transaction():
    return create_transaction()