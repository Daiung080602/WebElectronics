from flask import Blueprint

from web.Controller.Productline.controller import get_all_productlines, create_new_productline, update_productline

Productlines = Blueprint('productlines', __name__)

# file chứa route xử lý các dòng sản phẩm (phân quyền)

# lấy toàn bộ dòng sản phẩm
@Productlines.route('/api/productlines', methods=['GET'])
def get_all_productlines_():
    return get_all_productlines()

# tạo dòng sản phẩm mới
@Productlines.route('/api/productlines', methods=['POST'])
def create_new_productline_():
    return create_new_productline()

# chỉnh sửa thông tin dòng sản phẩm
@Productlines.route('/api/productlines/<id>', methods=['PUT'])
def update_productline_(id):
    return update_productline(id)