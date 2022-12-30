from web.Extension.models import db, Office
from web.Middleware.check_auth import token_required
from flask import request, current_app, jsonify
from marshmallow import ValidationError
from web.Controller.Offices import Offices, offices_schema, office_schema


@Offices.route('/offices', methods=['GET'])
@token_required
def get_all_offices(current_user):
    pass


@Offices.route('/offices/<id>', methods=['GET'])
@token_required
def get_office_by_id(current_user, id):
    pass


@Offices.route('/offices/create', methods=['POST'])
@token_required
def create_new_office(current_user):
    pass


@Offices.route('/offices/<id>', methods=['PUT'])
@token_required
def update_office(current_user, id):
    pass


@Offices.route('/offices/<id>', methods=['DELETE'])
@token_required
def delete_new_office(current_user, id):
    pass