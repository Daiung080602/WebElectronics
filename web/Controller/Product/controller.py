from flask import request
from marshmallow import ValidationError
from web.Controller.Product import Products, product_schema, products_schema, lots_schema
from web.Extension.models import Product, db, Office, Lot
from web.Middleware.check_auth import token_required


@Products.route('/api/products', methods=['GET'])
@token_required
def get_all_products(current_office):
    try:
        role = current_office.role
        if role == 1:
            product = Product.query.all()
        elif role == 2:
            product = Office.query.filter_by(office_id=current_office.office_id).first().products_agent
        elif role == 3:
            product = Office.query.filter_by(office_id=current_office.office_id).first().products_warranty
        elif role == 4:
            lots = Lot.query.filter_by(exporter_id=current_office.office_id).all()
            return lots_schema.jsonify(lots)
        return products_schema.jsonify(product)

    except Exception as e:
        return {'error': str(e)}, 500


@Products.route('/api/products/<state>', methods=['GET'])
@token_required
def get_product_by_state(current_office, state):
    try:
        role = current_office.role
        if role == 1:
            product = Product.query.filter_by(state=state).all()
        elif role == 2:
            product = Office.query.filter_by(state=state, agent_id=current_office.office_id).all()
        elif role == 3: 
            product = Office.query.filter_by(state=state, warranty_id=current_office.office_id).all()
        elif role == 4:
            product = [l.products for l in Lot.query.filter_by(exporter_id=current_office.office_id).all()]
        return products_schema.jsonify(product)

    except Exception as e:
        return {'error': str(e)}, 500

@Products.route('/api/lots', methods=['POST'])
@token_required
def create_new_lots(current_office):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = product_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        employee = Product(**data)
        employee.set_psw()

        db.session.add(employee)
        db.session.commit()

        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500


@Products.route('/products/<id>', methods=['PUT'])
@token_required
def update_product(current_office, id):
    try:
        json_input = request.get_json()

        # validate data
        try:
            data = product_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        product = Product.query.filter_by(id=id).first()
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


@Products.route('/products/<id>', methods=['DELETE'])
@token_required
def delete_new_product(current_office, id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return {'error': 'dont have employee has this id'}, 400
    if current_office.role == 1 or current_office.office_id == product.office_id:
        db.session.delete(product)
        db.session.commit()
        return {'message': 'success'}
    else:
        return {'error': 'dont have employee has this id'}, 400
