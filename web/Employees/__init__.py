from flask import Blueprint
from web.Extension.ma import EmployeeSchema, EmployeeSchema2


employees = Blueprint('Employees', __name__)
employees_schema = EmployeeSchema(many=True)
employee_schema = EmployeeSchema()
employee_schema2 = EmployeeSchema2()
