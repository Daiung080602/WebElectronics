from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES

def response(status_code, message=None):
    payload = {
        'status_code': status_code,
    }
    if message:
        payload['status'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response

def bad_request(message):
    return response(400, message)