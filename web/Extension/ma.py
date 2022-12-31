from web.Extension import ma
from web.Extension.models import Office, Customer, Lot, Product, Productline, Transaction
from marshmallow import fields, validate, ValidationError, post_load
from web.Middleware.check_auth import token_required


def must_be_all_number(id):
    if sum(c.isdigit() for c in id) != len(id):
        raise ValidationError("Each char must be digit.")
    
class OfficeSchema_login(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Office
        
    office_id = fields.Str(
        required=True,
        validate=[validate.Length(equal=8), must_be_all_number]
    )
    password = fields.Str(
        required=True,
        validate=[validate.Length(min=8, max=20),
                validate.Regexp(
                    regex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$',
                    error='Password must has length between 8 and 20, has digits, lower and upper letters'
                )],
        load_only=True
    )
    

class OfficeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Office

    office_id = fields.Str(
        required=True,
        validate=[validate.Length(equal=8), must_be_all_number]
    )
    password = fields.Str(
        required=True,
        validate=[validate.Length(min=8, max=20),
                  validate.Regexp(
                      regex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$',
                      error='Password must has length between 8 and 20, has digits, lower and upper letters'
                  )],
        load_only=True
    )
    phone = fields.Str(
        validate=[validate.Length(equal=10), must_be_all_number]
    )
    role = fields.Int(
        required=True,
        validate=[validate.Range(min=1, max=4)]
    )


class OfficeSchema_put(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Office

    password = fields.Str(
        validate=[]
    )
    phone = fields.Str(
        validate=[validate.Length(equal=10), must_be_all_number]
    )


@token_required
def must_be_in_list_exporter_id(current_office, id):
    list_office_id = [o.office_id for o in Office.query.filter_by(role=4)]
    if not id in list_office_id:
        raise ValidationError(f"office_id must be one of {list_office_id}")


@token_required
def must_be_in_list_productline_id(current_office, id):
    list_pl_id = [pl.productline_id for pl in Productline.query.all()]
    if not id in list_pl_id:
        raise ValidationError(f"office_id must be one of {list_pl_id}")


class LotSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = Lot

    exporter_id = fields.Str(
        required=True,
        validate=[must_be_in_list_exporter_id]
    )
    productline_id = fields.Str(
        required=True,
        validate=[must_be_in_list_productline_id]
    )
    office = ma.Nested(OfficeSchema)


class CustomerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Customer

    phone = fields.Str(
        required=True,
        validate=[validate.Length(equal=10), must_be_all_number]
    )


class ProductlineSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Productline


@token_required
def must_be_in_list_agent_id(current_office, id):
    list_office_id = [o.office_id for o in Office.query.filter_by(role=2)]
    if not id in list_office_id:
        raise ValidationError(f"office_id must be one of {list_office_id}")


@token_required
def must_be_in_list_warranty_id(current_office, id):
    list_office_id = [o.office_id for o in Office.query.filter_by(role=3)]
    if not id in list_office_id:
        raise ValidationError(f"office_id must be one of {list_office_id}")


class TransactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Transaction
        include_fk = True

    customer = ma.Nested(CustomerSchema)


class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = Product

    agent_id = fields.Str(
        required=True,
        validate=[validate.Length(equal=8), must_be_all_number, must_be_in_list_agent_id]
    )
    warranty_id = fields.Str(
        required=True,
        validate=[validate.Length(equal=8), must_be_all_number, must_be_in_list_warranty_id]
    )
    agent = ma.Nested(OfficeSchema)
    warranty = ma.Nested(OfficeSchema)
    lot = ma.Nested(LotSchema)
    transaction = ma.Nested(TransactionSchema)


