import jwt
from flask import request, current_app, jsonify
from marshmallow import ValidationError

from web.Employees import employee_login_schema
from web.Auth import auth
from web.Extension.models import Employee
from web.Middleware.check_auth import token_required
from flask_cors import cross_origin


@auth.route('/login', methods=['POST'])
def login():
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = employee_login_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        # Use get to see if employee already exists
        employee = Employee.query.filter_by(id=data['id']).first()
        if employee is None or not employee.check_psw(data['password']):
            return {"error": "That employee does not exist"}, 400
        else:
            try:
                # token should expire after 24 hrs
                token = jwt.encode(
                    {"employee_id": employee.id},
                    current_app.config["SECRET_KEY"]
                )
                resp = jsonify({"token": token, "role": employee.role})
                resp.set_cookie("access-token", token)
                resp.status_code = 201
                return resp
            except Exception as e:
                return {"error": str(e)}, 500
    except Exception as e:
        return {"error": str(e)}, 500


@auth.route('/logout', methods=['GET'])
@cross_origin
@token_required
def logout(user):
    resp = jsonify({"message": "success"})
    resp.set_cookie("access-token", '', expires=0)
    resp.status_code = 200
    return resp
