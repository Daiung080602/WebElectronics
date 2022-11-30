from .extensions import ma
from .models import Office, Employee, Customer, Category, \
    Productline, Product, Lot, Management, WarrantyManagement, Transaction
    
class OfficeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Office

class EmployeeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Employee
        
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
        