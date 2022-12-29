from flask import Blueprint
from web.Extension.ma import EmployeeSchema, EmployeeSchema_login


employees = Blueprint('Employees', __name__)
employees_schema = EmployeeSchema(many=True)
employee_schema = EmployeeSchema()
employee_login_schema = EmployeeSchema_login()
