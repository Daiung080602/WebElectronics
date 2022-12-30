from flask import request
from marshmallow import ValidationError

from web.Controller.Productline import Productlines, productlines_schema, productline_schema
from web.Extension.models import Productline, db
from web.Middleware.check_auth import token_required


@Productlines.route('/api/productlines', methods=['GET'])
@token_required
def get_all_productlines(current_office):
    try:
        role = current_office.role
        if role == 1:
            pl = Productline.query.all()
        else:
            pl_id = [l.productline_id for l in current_office.lots]
            pl = Productline.query.filter(Productline.productline_id.in_(pl_id)).all()

        return productlines_schema.jsonify(pl)

    except Exception as e:
        return {'error': str(e)}, 500


@Productlines.route('/api/productlines', methods=['POST'])
@token_required
def create_new_productline(current_office):
    try:
        role = current_office.role
        if role == 1:
            json_input = request.get_json()

            # validate data
            try:
                data = productline_schema.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            pl = Productline.query.filter_by(productline_id=data['productline_id']).first()
            if pl:
                return {"error": "This productline id already have"}, 400
            else:
                pl = Productline(**data)
                db.session.add(pl)
                db.session.commit()
                return {"status": "success"}, 201

        else:
            return {'error': 'dont have permission change productline'}, 400
    except Exception as e:
        return {'error': str(e)}, 500


@Productlines.route('/api/productlines', methods=['PUT'])
@token_required
def update_productline(current_office):
    try:
        role = current_office.role
        if role == 1:
            json_input = request.get_json()

            # validate data
            try:
                data = productline_schema.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            pl = Productline.query.filter_by(productline_id=data['productline_id']).first()
            if not pl:
                return {"error": "This productline is not exist"}, 400
            else:
                for key, value in data.items():
                    if hasattr(pl, key) and value is not None and key not in ['productline_id']:
                        setattr(pl, key, value)
                db.session.commit()
                return {"status": "success"}, 201
        else:
            return {'error': 'dont have permission change productline'}, 400

    except Exception as e:
        return {'error': str(e)}, 500