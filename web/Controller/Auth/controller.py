import jwt
from flask import request, current_app, jsonify
from marshmallow import ValidationError
from flask_cors import cross_origin

from web.Controller.Employees import employee_login_schema
from web.Controller.Auth import auth
from web.Extension.models import Employee
from web.Middleware.check_auth import token_required


@auth.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = employee_login_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        # chech ton tai trong TH tu tao
        employee = Employee.query.filter_by(id=data['id'], password=data['password']).first()
        if employee is None:
            return {"error": "That employee does not exist"}, 400

        # check ton tai trong TH luu hash
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
                resp = jsonify({'status': 'success', "token": token, "role": employee.role})
                resp.set_cookie("access-token", token, )
                resp.status_code = 200
                return resp
            except Exception as e:
                return {"error": str(e)}, 500
    except Exception as e:
        return {"error": str(e)}, 500


@auth.route('/api/logout', methods=['GET'])
@token_required
def logout(user):
    resp = jsonify({"status": "success"})
    resp.set_cookie("access-token", '', expires=0)
    resp.status_code = 200
    return resp
