from flask import Blueprint
from web.Extension.ma import OfficeSchema_login

auth = Blueprint('auth', __name__)

officeschema_login = OfficeSchema_login()
