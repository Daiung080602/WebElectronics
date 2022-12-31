from flask import request
from marshmallow import ValidationError
from web.Controller.Product import Products, product_schema, products_schema, lots_schema, lot_schema
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
            product = Product.query.filter(Product.lot_id.in_([l.lot_id for l in lots])).all()
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
            product = Product.query.filter_by(state=state, agent_id=current_office.office_id).all()
        elif role == 3: 
            product = Product.query.filter_by(state=state, warranty_id=current_office.office_id).all()
        elif role == 4:
            lots = Lot.query.filter_by(exporter_id=current_office.office_id).all()
            productss = Product.query.filter(Product.lot_id.in_([l.lot_id for l in lots])).all()
            product = Product.query.filter(Product.state.in_([p.state for p in productss])).all()
        return products_schema.jsonify(product)

    except Exception as e:
        return {'error': str(e)}, 500


@Products.route('/api/products/<id>', methods=['PUT'])
@token_required
def update_product(current_office, id):
    try:
        role = current_office.role
        json_input = request.get_json()

        # validate data
        try:
            data = product_schema.load(json_input)
        except ValidationError as err:
            return {"error": err.messages}, 400

        product = Product.query.filter_by(product_id=id).first()
        if not product:
            return {'error': 'dont have employee has this id'}, 400
        if role == 1 or (role == 2 and current_office.office_id == product.agent_id) or \
            (role == 3 and current_office.office_id == product.warranty_id) or (role == 4 and current_office.office_id == product.lot.exporter_id):
            for key in data.keys():
                if key != 'product_id':
                    product.change_value(key, data[key])
            db.session.commit()
        return {"message": "success"}

    except Exception as e:
        return {"error": str(e)}, 500

@Products.route('/api/lots', methods=['GET'])
@token_required
def get_all_lots(current_office):
    try:
        role = current_office.role
        if role == 1:
            lots = Lot.query.all()
        elif role == 4:
            lots = current_office.lots
        elif role == 3:
            lots = 2
        elif role == 2:
            lots = 1
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


