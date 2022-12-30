from flask import request
from marshmallow import ValidationError

from web.Controller.Product import Products, product_schema, products_schema
from web.Extension.models import Product, db, Office, Lot
from web.Middleware.check_auth import token_required
from flask_cors import cross_origin


@Products.route('/products', methods=['GET'])
@cross_origin
@token_required
def get_all_products(current_user):
    try:
        role = current_user.role
        print(role)
        if role == 1:
            product = Product.query.all()
        elif role == 2 or role == 3 or role == 4:
            product = Office.query.filter_by(office_id=current_user.office_id)
            # product = Product.query.filter_by(id=current_user.office_id).first().employees
        return products_schema.jsonify(product)

    except Exception as e:
        return {'error': str(e)}, 500


@Products.route('/products/<id>', methods=['GET'])
@cross_origin
@token_required
def get_product_by_id(current_user, id):
    product = Product.query.filter_by(product_id=id).first()
    if not product:
        return {'error': 'dont have employee has this id'}, 400
    if current_user.role == 1 or current_user.office_id == product.office_id:
        return product_schema.jsonify(product)
    else:
        return {"error": 'dont have employee has this id'}, 400


@Products.route('/products/create', methods=['POST'])
@cross_origin
@token_required
def create_new_product(current_user):
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
@cross_origin
@token_required
def update_product(current_user, id):
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
        if current_user.role == 1 or current_user.office_id == product.office_id:
            for key in data.keys():
                if key != 'id':
                    product.change_value(key, data[key])
            db.session.commit()
        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500


@Products.route('/products/<id>', methods=['DELETE'])
@cross_origin
@token_required
def delete_new_product(current_user, id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return {'error': 'dont have employee has this id'}, 400
    if current_user.role == 1 or current_user.office_id == product.office_id:
        db.session.delete(product)
        db.session.commit()
        return {'message': 'success'}
    else:
        return {'error': 'dont have employee has this id'}, 400
