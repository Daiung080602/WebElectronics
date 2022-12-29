from web.Product import products, product_schema, products_schema
from web.Extension.models import Product, db
from web.Middleware.check_auth import token_required
from flask import request, current_app, jsonify
from marshmallow import ValidationError


@products.route('/products', methods=['GET'])
@token_required
def get_all_products(current_user):

    role = current_user.role
    if role == 1:
        product = Product.query.all()
    if role == 2:
        product = Product.query.filter_by(Product.office_id.any(Office.category == 1)).all()
    if role == 3:
        product = Product.query.filter_by(Product.office_id.any(Office.category == 2)).all()
    if role == 4:
        product = Product.query.filter_by(Employee.office_id.any(Office.category == 3)).all()
    return products_schema.jsonify(product)


@products.route('/products/<id>', methods=['GET'])
@token_required
def get_product_by_id(current_user, id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return {'error': 'dont have employee has this id'}, 400
    if current_user.role == 1 or current_user.office_id == product.office_id:
        return product_schema.jsonify(product)
    else:
        return {"error": 'dont have employee has this id'}, 400


@products.route('/products/create', methods=['POST'])
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


@products.route('/products/<id>', methods=['PUT'])
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


@products.route('/products/<id>', methods=['DELETE'])
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