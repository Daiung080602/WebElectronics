from web.Extension import ma
from web.Extension.models import Office, Employee, Customer, Category, \
    Productline, Product, Lot, Management, WarrantyManagement, Transaction
from marshmallow import fields, validate, ValidationError, post_load

from web.Middleware.check_auth import token_required


class OfficeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Office


def must_be_all_number(id):
    if sum(c.isdigit() for c in id) != len(id):
        raise ValidationError("Each char must be digit.")

class EmployeeSchema_login(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Employee

    id = fields.Str(
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


@token_required
def must_be_in_list_office_id(current_user, id):
    if current_user.role == 1:
        list_office_id = [o.id for o in Office.query.all()]
    else:
        list_office_id = [current_user.office_id]
    if not id in list_office_id:
        raise ValidationError(f"office_id must be one of {list_office_id}")


class EmployeeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Employee

    id = fields.Str(
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
        validate=[validate.Range(min=1, max=5)]
    )
    office_id = fields.Str(
        required=True,
        validate=[must_be_in_list_office_id]
    )


class CustomerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Customer


class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category


class LotSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Lot


class ProductlineSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Productline


class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product


class ManagementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Management


class WarrantyManagementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = WarrantyManagement


class TransactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Transaction
