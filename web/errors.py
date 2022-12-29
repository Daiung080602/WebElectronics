from flask import jsonify


def response(status_code, message=None, error=None):
    payload = {
        'status_code': status_code,
    }
    if message:
        payload['message'] = message
        payload['error'] = error
    response = jsonify(payload)
    # response.status_code = status_code
    return response

