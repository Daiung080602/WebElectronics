import jwt
from flask import request, current_app, jsonify
from marshmallow import ValidationError
from flask_cors import cross_origin
from web.Controller.Auth import auth
from web.Extension.models import Office
from web.Middleware.check_auth import token_required
from web.Controller.Offices import officeschema_login


@auth.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = officeschema_login.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        # chech ton tai trong TH tu tao
        office = Office.query.filter_by(office_id=data['office_id'], password=data['password']).first()
        if office is None:
            return {"error": "That office does not exist"}, 400

        # check ton tai trong TH luu hash
        # office = Office.query.filter_by(office_id=data['office_id']).first()
        # if office is None or not office.check_psw(data['password']):
        #     return {"error": "That office does not exist"}, 400
        else:
            try:
                # token should expire after 24 hrs
                token = jwt.encode(
                    {"office_id": office.office_id},
                    current_app.config["SECRET_KEY"]
                )
                resp = jsonify({'status': 'success', "token": token, "role": office.role})
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
