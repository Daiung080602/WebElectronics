from flask import Blueprint
from web.Controller.Offices.controller import get_all_offices, get_all_agent, get_all_warranty, \
    get_current_office, get_office_by_id, create_new_office, update_office, delete_office

Offices = Blueprint('Offices', __name__)

# file chứa các route xử lý office (phân quyền)

# lấy tất cả cơ sở bảo hành
@Offices.route('/api/list_warranty', methods=['GET'])
def get_all_warranty_():
    return get_all_warranty()

# lấy tất cả đại lý
@Offices.route('/api/list_agent', methods=['GET'])
def get_all_agent_():
    return get_all_agent()

# lấy thông tin của ofice hiện tại
@Offices.route('/api/current', methods=['GET'])
def get_current_office_():
    return get_current_office()

# lấy toàn bộ thông tin các office
@Offices.route('/api/admin/offices', methods=['GET'])
def get_all_offices_():
    return get_all_offices()

# lấy office theo id
@Offices.route('/api/admin/offices/<id>', methods=['GET'])
def get_office_by_id_(id):
    return get_office_by_id(id)

# tạo office mới
@Offices.route('/api/admin/offices', methods=['POST'])
def create_new_office_():
    return create_new_office()

# chỉnh sửa thông tin office
@Offices.route('/api/admin/offices/<id>', methods=['PUT'])
def update_office_(id):
    return update_office(id)

# xóa office
@Offices.route('/api/admin/offices/<id>', methods=['DELETE'])
def delete_office_(id):
    return delete_office(id)



