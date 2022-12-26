from flask import render_template, redirect, url_for, Blueprint

home = Blueprint('home', __name__)

@home.route('/')
def homepage():
    return render_template('login.html')