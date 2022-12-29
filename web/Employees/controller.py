from web.Employees import employees, employees_schema, employee_schema
from web.Extension.models import Employee, db, Office
from web.Middleware.check_auth import token_required
from flask import request, current_app, jsonify
from marshmallow import ValidationError


@employees.route('/employees', methods=['GET'])
@token_required
def get_all_employees(current_user):
    try:
        role = current_user.role
        print(role)
        if role == 1:
            employee = Employee.query.all()
        elif role == 2 or role == 3 or role == 4:
            employee = Office.query.filter_by(id=current_user.office_id).first().employees
        return employees_schema.jsonify(employee)

    except Exception as e:
        return {'error': str(e)}, 500


@employees.route('/employees/current', methods=['GET'])
@token_required
def get_current_employee(current_user):
    try:
        return employee_schema.jsonify(current_user)
    except Exception as e:
        return {'error': str(e)}, 500


@employees.route('/employees/<id>', methods=['GET'])
@token_required
def get_employee_by_id(current_user, id):
    try:
        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {'error': 'dont have employee has this id'}, 400
        if current_user.role == 1 or current_user.office_id == employee.office_id:
            return employee_schema.jsonify(employee)
        else:
            return {"error": 'dont have employee has this id in this base'}, 400

    except Exception as e:
        return {'error': str(e)}, 500


@employees.route('/offices/listId', methods=['GET'])
@token_required
def get_list_office_id(current_user):
    try:
        if current_user.role == 1:
            list_office_id = [o.id for o in Office.query.all()]
        else:
            list_office_id = [current_user.office_id]
        return {'list_office_id': list_office_id}, 200
    except Exception as e:
        return {'error': str(e)}, 500


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

        employee = Employee.query.filter_by(id=data['id']).first()
        if employee:
            return {"error": "This id already have"}, 400
        else:
            employee = Employee(**data)
            employee.set_psw()

            role_current = current_user.role
            role_new = employee.role
            if role_current == 1:
                if role_new == 1:  # tao dc employee co role = 2,3,4,5
                    return {'error': 'role of new employee must be 2, 3, 4, 5'}, 400
            else:  # tao dc employ co role = 5
                if role_new in range(1, 5):
                    return {'error': 'role of new employee must be 5'}, 400

            db.session.add(employee)
            db.session.commit()
            return {"status": "success"}, 201

    except Exception as e:
        return {"error": str(e)}, 500


@employees.route('/employees/<id>', methods=['PUT'])
@token_required
def update_employee(current_user, id):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = employee_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {'error': 'dont have employee has this id'}, 400
        if current_user.role == 1 or current_user.office_id == employee.office_id:
            for key, value in data.items():
                if hasattr(employee, key) and value is not None and key not in ['id', 'password']:
                    setattr(employee, key, value)
            db.session.commit()
        return {"status": "success"}, 201

    except Exception as e:
        return {"error": str(e)}, 500


@employees.route('/employees/<id>', methods=['DELETE'])
@token_required
def delete_new_employee(current_user, id):
    try:
        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            return {'error': 'dont have employee has this id'}, 400
        if current_user.role == 1 or current_user.office_id == employee.office_id:
            db.session.delete(employee)
            db.session.commit()
            return {'status': 'success'}
        else:
            return {'error': 'dont have employee has this id'}, 400
    except Exception as e:
        return {'error': str(e)}, 500
