from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from .extensions import db
from flask_login import UserMixin, LoginManager

login = LoginManager()
    
class Office(db.Model):
    id = Column(String(50), primary_key=True)
    address = Column(Text)
    phone = Column(String(15))
    id_manager = Column(Integer, nullable=False)
    employees = relationship('Employee', backref='office', lazy=True)
    lots = relationship('Lot', backref='office', lazy=True)
    
    def __str__(self):
        return f'Office ({self.id})'
    
class Employee(UserMixin, db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    avatar = Column(Text)
    fullname = Column(String(50), nullable=False)
    phone = Column(String(15))
    address = Column(Text)
    role = Column(Integer)
    office_id = Column(String(50), ForeignKey(Office.id))
    
    def __str__(self):
        return f'Employee ({self.id}, {self.fullname})'
    def set_psw(self, password):
        self.password = generate_password_hash(password=password)
    def check_psw(self, password):
        return check_password_hash(self.password, password)
    
@login.user_loader
def load_user(id):
    return Employee.query.get(int(id))

class Customer(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    fullname = Column(String(50), nullable=False)
    address = Column(Text)
    phone = Column(String(15))
    
    def __str__(self):
        return f'Customer ({self.id}, {self.fullname})'

class Category(db.Model):
    type_name = Column(String(50), primary_key=True)
    productline = Column(String(50), nullable=False)
    productlines = relationship('Productline', backref='category', lazy=True)

    def __str__(self):
        return f'Category ({self.type_name}, {self.productline})'

class Productline(db.Model):
    product_name = Column(String(50), primary_key=True)
    details = Column(Text)
    amount = Column(Integer, nullable=False)
    image = Column(Text)
    time_warranty = Column(DateTime, nullable=False)
    product_type = Column(String(50), ForeignKey(Category.type_name), nullable=False)
    products = relationship('Product', backref='productline', lazy=True)
    
    def __str__(self):
        return self.productline
    
class Lot(db.Model):
    lot_id = Column(String(50), primary_key=True)
    date_export = Column(DateTime, nullable=False)
    id_manufacture = Column(String(50), ForeignKey(Office.id), nullable=False)
    products = relationship('Product', backref='lot', lazy=True)
    
    def __str__(self):
        return self.lot_id
    
class Product(db.Model):
    id = Column(String(15), primary_key=True)
    product_name = Column(String(50), ForeignKey(Productline.product_name), nullable=False)
    lot_id = Column(String(50), ForeignKey(Lot.lot_id), nullable=False)
    
    def __str__(self):
        return self.id
    
class Management(db.Model):
    id_product = Column(String(15), ForeignKey(Product.id), primary_key=True)
    id_agent = Column(String(50), ForeignKey(Office.id), primary_key=True)
    is_warranty = Column(String(50), ForeignKey(Office.id), primary_key=True)
    state = Column(String(50), nullable=False)
    
    def __str__(self):
        return f'Product {self.id_product} belongs to {self.id_agent} is {self.state}'

class WarrantyManagement(db.Model):
    id_product = Column(String(15), ForeignKey(Product.id), primary_key=True)
    id_agent = Column(String(50), ForeignKey(Office.id), primary_key=True)
    state = Column(String(50), nullable=False)
    warranty_times = Column(Integer, nullable=False)
    
    def __str__(self):
        return f'Product {self.id_product} is  repaired {self.warranty_times} times'
    
class Transaction(db.Model):
    id_product = Column(String(15), ForeignKey(Product.id), primary_key=True)
    id_customer = Column(Integer, ForeignKey(Customer.id), primary_key=True)
    buy_date = Column(DateTime, nullable=False)
    
    def __str__(self):
        return f'Transaction: {self.id_product} is bought by {self.id_customer} on {self.buy_date}'
    
    
    
    
     
    