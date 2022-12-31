from flask import Blueprint
from web.Controller.Auth.controller import login, logout

auth = Blueprint('auth', __name__)

# file chứa các route cho đăng nhập, đăng xuất

# đăng nhập
@auth.route('/api/login', methods=['POST'])
def login_():
    return login()

# đăng xuất
@auth.route('/api/logout', methods=['GET'])
def logout_():
    return logout()