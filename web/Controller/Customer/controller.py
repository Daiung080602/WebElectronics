from flask import request
from marshmallow import ValidationError

from web.Extension.models import db
from web.Controller.Customer import Customers, customer_schema, customers_schema
from web.Middleware.check_auth import token_required
from web.Extension.models import Customer, Lot, Transaction


@Customers.route('/api/customers', methods=["GET"])
@token_required
def get_all_customers(current_office):
    try:
        role = current_office.role
        if role == 1:
            customers = Customer.query.all()
        elif role == 2:
            products = Lot.query.filter_by(agent_id=current_office.office_id, state="Đã bán").all()
            list_product_id = [p.product_id for p in products]
            list_transaction = Transaction.query.filter(Transaction.product_id.in_(list_product_id)).all()
            customers = [t.customer for t in list_transaction]
        else:
            return {'error': 'this base dont have customer'}, 400
        return customers_schema.jsonify(customers)

    except Exception as e:
        return {'error': str(e)}, 500


@Customers.route('/api/customers', methods=["POST"])
@token_required
def create_new_customer(current_office):
    try:
        role = current_office.role
        if role == 1 or role == 2:
            json_input = request.get_json()

            # validate data
            try:
                data = customer_schema.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            customer = Customer.query.filter_by(customer_id=data['customer_id']).first()
            if customer:
                return {"error": "This customer id already have"}, 400
            else:
                customer = Customer(**data)
                db.session.add(customer)
                db.session.commit()
                return {"status": "success"}, 201

        else:
            return {'error': 'dont have permission create customer'}, 400

    except Exception as e:
        return {'error': str(e)}, 500


@Customers.route('/api/customers/<id>', methods=["PUT"])
@token_required
def update_customer(current_office, id):
    try:
        role = current_office.role
        if role == 1 or role == 2:
            json_input = request.get_json()

            # validate data
            try:
                data = customer_schema.load(json_input)
            except ValidationError as err:
                return {"error": err.messages}, 400

            customer = Customer.query.filter_by(customer_id=data['customer_id']).first()
            if not customer:
                return {"error": "This customer if not exist"}, 400
            else:
                for key, value in data.items():
                    if hasattr(customer, key) and value is not None and key not in ['customer_id']:
                        setattr(customer, key, value)
                db.session.commit()
                return {"status": "success"}, 201

        else:
            return {'error': 'dont have permission to change info of customer'}, 400

    except Exception as e:
        return {'error': str(e)}, 500
