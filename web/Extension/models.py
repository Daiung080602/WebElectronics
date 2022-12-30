from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from web.Extension import db


class Office(db.Model):
    office_id = Column(String(8), primary_key=True)
    password = Column(String(50), nullable=False)
    role = Column(Integer)  # 1: admin, 2: dai ly, 3: bao hanh, 4: cssx
    address = Column(Text)
    phone = Column(String(10))
    name = Column(String(50))
    products_agent = relationship("Product", foreign_keys="[Product.agent_id]")
    products_warranty = relationship("Product", foreign_keys="[Product.warranty_id]")
    lots = relationship("Lot", backref="office", lazy=True)

    def __str__(self):
        return f'Office ({self.office_id}: {self.name})'
    
    def set_psw(self):
        self.password = generate_password_hash(self.password)

    def check_psw(self, password):
        return check_password_hash(self.password, password)

class Customer(db.Model):
    customer_id = Column(Integer, primary_key=True, autoincrement=True)
    fullname = Column(String(50), nullable=False)
    address = Column(Text)
    phone = Column(String(10))
    transactions = relationship('Transaction', backref='customer', lazy=True)

    def __str__(self):
        return f'Customer ({self.customer_id}, {self.fullname})'

class Productline(db.Model):
    productline_id = Column(String(50), primary_key=True)
    type = Column(String(50), nullable=False)
    details = Column(Text, nullable=False)
    image = Column(Text)
    date_warranty = Column(DateTime, nullable=False)        # Theo thang
    lots = relationship('Lot', backref='productline', lazy=True)

    def __str__(self):
        return self.productline_id

class Lot(db.Model):
    lot_id = Column(String(50), primary_key=True)
    date_export = Column(DateTime, nullable=False)
    exporter_id = Column(String(8), ForeignKey(Office.office_id), nullable=False)
    productline_id = Column(String(50), ForeignKey(Productline.productline_id), nullable=False)

    def __str__(self):
        return self.lot_id

class Product(db.Model):
    product_id = Column(Integer, primary_key=True, autoincrement=True)
    state = Column(String(50), nullable=False)
    lot_id = Column(String(50), ForeignKey(Lot.lot_id), nullable=False)
    agent_id = Column(String(8), ForeignKey(Office.office_id))
    warranty_times = Column(Integer)
    warranty_id = Column(String(8), ForeignKey(Office.office_id))
    
    def __str__(self):
        return self.product_id
    

class Transaction(db.Model):
    product_id = Column(Integer, ForeignKey(Product.product_id), primary_key=True)
    customer_id = Column(Integer, ForeignKey(Customer.customer_id), primary_key=True)
    buy_date = Column(DateTime, nullable=False)

    def __str__(self):
        return f'Transaction: {self.product_id} is bought by {self.customer_id} on {self.buy_date}'
    