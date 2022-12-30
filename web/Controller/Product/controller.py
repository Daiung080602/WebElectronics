from flask import request
from marshmallow import ValidationError

from web.Controller.Product import Products, product_schema, products_schema, lots_schema, lot_schema
from web.Extension.models import db, Office, Lot, Product
from web.Middleware.check_auth import token_required


@Products.route('/api/lots', methods=['GET'])
@token_required
def get_all_lots(current_office):
    try:
        role = current_office.role
        if role == 1:
            lots = Lot.query.all()
        else:
            lots = current_office.lots

        return lots_schema.jsonify(lots)
    except Exception as e:
        return {'error': str(e)}, 500


@Products.route('/api/lots', methods=['POST'])
@token_required
def create_new_lot(current_office):
    try:
        role = current_office.role
        if role == 4:
            json_input = request.get_json()

            # validate data
            try:
                data = lot_schema.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            lot = Lot.query.filter_by(lot_id=data['lot_id']).first()
            if lot:
                return {"error": "This lot id already have"}, 400
            else:
                new_lot = Lot(**data)
                for i in range(new_lot.amount):
                    new_product = Product(state="Mới sản xuất", lot_id=new_lot.lot_id)
                    db.session.add(new_product)
                db.session.add(lot)
                db.session.commit()
                return {"status": "success"}, 201

        else:
            return {'error': 'dont have permission create lot'}, 400

    except Exception as e:
        return {'error': str(e)}, 500


@Products.route('/api/products', methods=['GET'])
@token_required
def get_all_products(current_office):
    try:
        role = current_office.role
        if role == 1:
            product = Lot.query.all()
        elif role == 2:
            product = Office.query.filter_by(office_id=current_office.office_id).first().products_agent
        elif role == 3:
            product = Office.query.filter_by(office_id=current_office.office_id).first().products_warranty
        return products_schema.jsonify(product)

    except Exception as e:
        return {'error': str(e)}, 500


@Products.route('/api/products/<state>', methods=['GET'])
@token_required
def get_product_by_id(current_office, state):
    product = Lot.query.filter_by(state=state).all()
    if not product:
        return {'error': 'dont have employee has this state'}, 400
    if current_office.role == 1 or current_office.office_id == product.office_id:
        return product_schema.jsonify(product)
    else:
        return {"error": 'dont have employee has this id'}, 400


@Products.route('/api/products', methods=['POST'])
@token_required
def create_new_product(current_office):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = product_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        employee = Lot(**data)
        employee.set_psw()

        db.session.add(employee)
        db.session.commit()

        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500


@Products.route('/api/products/<id>', methods=['PUT'])
@token_required
def update_product(current_office, id):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = product_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        product = Lot.query.filter_by(id=id).first()
        if not product:
            return {'error': 'dont have employee has this id'}, 400
        if current_office.role == 1 or current_office.office_id == product.office_id:
            for key in data.keys():
                if key != 'id':
                    product.change_value(key, data[key])
            db.session.commit()
        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500

