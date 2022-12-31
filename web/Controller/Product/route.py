from flask import Blueprint
from web.Controller.Product.controller import get_all_products, get_product_by_state, \
    update_product, create_new_lot, get_all_lots, update_state_if_agent_get_lot

Products = Blueprint('Products', __name__)

# file chứa các route xử lý product (phân quyền)

# lấy thông tin của tất cả các sản phẩm
@Products.route('/api/products', methods=['GET'])
def get_all_products_():
    return get_all_products()

# lấy sản phẩm theo state
@Products.route('/api/products/<state>', methods=['GET'])
def get_product_by_state_(state):
    return get_product_by_state(state)

# chỉnh sửa state của sản phẩm
@Products.route('/api/products/<id>', methods=['PUT'])
def update_product_(id):
    return update_product(id)

# lấy ra toàn bộ lô
@Products.route('/api/lots', methods=['GET'])
def get_all_lots_():
    return get_all_lots()

# tạo lô mới
@Products.route('/api/lots', methods=['POST'])
def create_new_lot_():
    return create_new_lot()

# chỉnh sửa state của product nếu agent nhận lô
@Products.route('/api/lots/<id>', methods=['PUT'])
def update_state_if_agent_get_lot_(id):
    return update_state_if_agent_get_lot(id)
