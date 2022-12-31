from flask import request
from marshmallow import ValidationError

from web.Extension.models import db, Office
from web.Middleware.check_auth import token_required
from web.Extension.ma import OfficeSchema, OfficeSchema_put


offices_schema = OfficeSchema(many=True)
office_schema = OfficeSchema()
office_schema_put = OfficeSchema_put()


@token_required
def get_all_warranty(current_office):
    try:
        warranty = Office.query.filter_by(role=3).all()
        return offices_schema.jsonify(warranty)
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def get_all_agent(current_office):
    try:
        agent = Office.query.filter_by(role=2).all()
        return offices_schema.jsonify(agent)
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def get_current_office(current_office):
    try:
        return office_schema.jsonify(current_office)
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def get_all_offices(current_office):
    try:
        role = current_office.role
        if role == 1:
            office = Office.query.all()
        elif role == 2 or role == 3 or role == 4:
            office = Office.query.filter_by(office_id=current_office.office_id).first()
        return offices_schema.jsonify(office)
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def get_office_by_id(current_office, id):
    try:
        if current_office.role == 1:
            office = Office.query.filter_by(office_id=id).first()
            if not office:
                return {'error': 'dont have office has this id'}, 400
            else:
                return office_schema.jsonify(office)
        else:
            return {"error": 'dont have permission'}, 400
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def create_new_office(current_office):
    try:
        role = current_office.role
        if role == 1:
            json_input = request.get_json()

            # validate data
            try:
                data = office_schema.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            office = Office.query.filter_by(office_id=data['office_id']).first()
            if office:
                return {"error": "This office id already have"}, 400
            else:
                office = Office(**data)
                office.set_psw()
                office.active = True

                db.session.add(office)
                db.session.commit()
                return {"status": "success"}, 201
        else:
            return {'error': 'dont have permission to create new office'}, 400
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def update_office(current_office, id):
    try:
        role = current_office.role
        if role == 1:
            json_input = request.get_json()

            # validate data
            try:
                data = office_schema_put.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            office = Office.query.filter_by(office_id=id).first()
            if office is None:
                return {"error": "This office is not exist"}, 400
            else:
                for key, value in data.items():
                    if hasattr(office, key) and value is not None \
                            and key not in ['office_id', 'role', 'password']:
                        setattr(office, key, value)
                db.session.commit()
                return {"status": "success"}, 200
        else:
            return {'error': 'dont have permission to change info office'}, 400
    except Exception as e:
        return {'error': str(e)}, 500


@token_required
def delete_office(current_office, id):
    try:
        role = current_office.role
        if role == 1:
            office = Office.query.filter_by(office_id=id).first()
            if not office:
                return {'error': 'dont have office has this id'}, 400
            else:
                db.session.delete(office)
                db.session.commit()
                return {'status': 'success'}
        else:
            return {'error': 'dont have permission to delete info of office'}, 400
    except Exception as e:
        return {'error': str(e)}, 500