from web.Employees import employees, employees_schema, employee_schema, employee_schema2
from web.Extension.models import Employee, db, Office
from web.Middleware.check_auth import token_required
from flask import request, current_app, jsonify
from marshmallow import ValidationError


@employees.route('/employees', methods=['GET'])
@token_required
def get_all_employees(current_user):

    role = current_user.role
    if role == 1:
        employee = Employee.query.all()
    if role == 2:
        employee = Employee.query.filter_by(Employee.office_id.any(Office.category == 1)).all()
    if role == 3:
        employee = Employee.query.filter_by(Employee.office_id.any(Office.category == 2)).all()
    if role == 4:
        employee = Employee.query.filter_by(Employee.office_id.any(Office.category == 3)).all()
    return employees_schema.jsonify(employee)


@employees.route('/employees/<id>', methods=['GET'])
@token_required
def get_employee_by_id(current_user, id):
    employee = Employee.query.filter_by(id=id).first()
    if not employee:
        return {'error': 'dont have employee has this id'}, 400
    if current_user.role == 1 or current_user.office_id == employee.office_id:
        return employee_schema.jsonify(employee)
    else:
        return {"error": 'dont have employee has this id'}, 400


@employees.route('/employees/create', methods=['POST'])
@token_required
def create_new_employee(current_user):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = employee_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        employee = Employee(**data)
        employee.set_psw()

        db.session.add(employee)
        db.session.commit()

        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500


@employees.route('/employees/<id>', methods=['PUT'])
@token_required
def update_employee(current_user, id):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = employee_schema2.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {'error': 'dont have employee has this id'}, 400
        if current_user.role == 1 or current_user.office_id == employee.office_id:
            for key in data.keys():
                if key != 'id':
                    employee.change_value(key, data[key])
            db.session.commit()
        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500


@employees.route('/employees/<id>', methods=['DELETE'])
@token_required
def delete_new_employee(current_user, id):
    employee = Employee.query.filter_by(id=id).first()
    if not employee:
        return {'error': 'dont have employee has this id'}, 400
    if current_user.role == 1 or current_user.office_id == employee.office_id:
        db.session.delete(employee)
        db.session.commit()
        return {'message': 'success'}
    else:
        return {'error': 'dont have employee has this id'}, 400