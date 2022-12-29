from functools import wraps
import jwt
from flask import request, current_app
from web.Extension.models import Employee


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if request.cookies:
            token = request.cookies['access-token']
        if not token:
            return {'error': 'Token is missing !!'}, 401
        print(token)
        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            print(data)
            current_user = Employee.query.filter_by(id=data['employee_id']).first()

        except Exception as e:
            return {"error": str(e)}, 500

        return f(current_user, *args, **kwargs)

    return decorated

