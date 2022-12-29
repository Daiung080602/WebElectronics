from flask import session
from flask_admin.contrib.sqla import ModelView
from web.Extension.models import Office, Employee, Customer, Product, Management, WarrantyManagement, Transaction
from web.Extension import admin, db


class AdminView(ModelView):
    def __init__(self, model, *args, **kwargs):
        self.column_list = [i.key for i in model.__table__.columns]
        self.form_columns = self.column_list
        super(AdminView, self).__init__(model, *args, **kwargs)

    page_size = 10
    column_display_pk = True


admin.add_view(AdminView(Office, db.session))
admin.add_view(AdminView(Employee, db.session))
admin.add_view(AdminView(Customer, db.session))
admin.add_view(AdminView(Product, db.session))
admin.add_view(AdminView(Management, db.session))
admin.add_view(AdminView(WarrantyManagement, db.session))
admin.add_view(AdminView(Transaction, db.session))
