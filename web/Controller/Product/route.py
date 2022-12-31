from flask import Blueprint
from web.Controller.Product.controller import get_all_products, get_product_by_state, \
    update_product, create_new_lot, get_all_lots, update_state_if_agent_get_lot

Products = Blueprint('Products', __name__)


@Products.route('/api/products', methods=['GET'])
def get_all_products_():
    return get_all_products()


@Products.route('/api/products/<state>', methods=['GET'])
def get_product_by_state_(state):
    return get_product_by_state(state)


@Products.route('/api/products/<id>', methods=['PUT'])
def update_product_(id):
    return update_product(id)


@Products.route('/api/lots', methods=['GET'])
def get_all_lots_():
    return get_all_lots()


@Products.route('/api/lots', methods=['POST'])
def create_new_lot_():
    return create_new_lot()


@Products.route('/api/lots/<id>', methods=['PUT'])
def update_state_if_agent_get_lot_(id):
    return update_state_if_agent_get_lot(id)
