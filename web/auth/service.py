from flask import request, redirect, url_for, render_template, session
from ..models import Employee, db, login
from .controller import auth
from flask_login import login_required, current_user, login_user, logout_user
from .errors import bad_request

login.login_view = 'login'

@auth.route('/home')
@login_required
def home():
    return render_template('home.html')

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('auth.home'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        repeat_password = request.form['repeat_password']
        fullname = request.form['fullname']
        if not username:
            return bad_request('Username is required!')
        elif repeat_password != password:
            return bad_request('Password and repeat_password are not the same!')
        elif not fullname:
            return bad_request('Fullname is required!')
        else:
            user_exist = Employee.query.filter_by(username=username).first()
            if user_exist:
                return bad_request('Username has existed !')
            else:
                new_user = Employee(username=username, password=password, fullname=fullname)
                new_user.set_psw(password=password)
                db.session.add(new_user)
                db.session.commit()
                print('Successfully created new user !')
                return redirect(url_for('auth.login'))
    return render_template('signup.html')

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('auth.home'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = Employee.query.filter_by(username=username).first()
        if not user:
            return bad_request('Wrong username !')
        elif not user.check_psw(password=password):
            return bad_request('Wrong password !')
        else:
            login_user(user)
            # Cấp quyền để login
            pass
    return render_template('login.html')
    
@auth.route('/logout')
def logout():
    logout_user()
    session.pop('username', None)
    session.pop('password', None)
    return redirect(url_for('auth.login'))

        
        
        