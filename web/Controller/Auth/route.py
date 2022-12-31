from flask import Blueprint
from web.Controller.Auth.controller import login, logout

auth = Blueprint('auth', __name__)


@auth.route('/api/login', methods=['POST'])
def login_():
    return login()


@auth.route('/api/logout', methods=['GET'])
def logout_():
    return logout()