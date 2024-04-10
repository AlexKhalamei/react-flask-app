from flask import jsonify, request, render_template, redirect, url_for, Blueprint, flash
from models.models import Page, User
from __init__ import db

from flask_login import login_user, logout_user, login_required

from werkzeug.security import check_password_hash, generate_password_hash

routes_blueprint = Blueprint('routes', __name__)


@routes_blueprint.route("/")
@login_required
def admin():
    pages = Page.query.all()
    return render_template("admin.html", pages=pages)


@routes_blueprint.route("/api/pages", methods=['GET'])
def get_pages():
    pages = Page.query.all()
    pages_json = [{"id": page.id, "title": page.title, "content": page.content, "url": page.url} for page in pages]
    return jsonify({"pages": pages_json})


@routes_blueprint.route("/api/pages/<int:page_id>", methods=['GET'])
def get_page(page_id):
    page = Page.query.get(page_id)
    if page:
        return jsonify({"page": {"id": page.id, "title": page.title, "content": page.content, "url": page.url}})
    else:
        return jsonify({"error": "Страница не найдена"}), 404


@routes_blueprint.route("/", methods=['POST'])
def create_page():
    title = request.form['title']
    content = request.form['content']
    url = request.form['url']

    new_page = Page(title=title, content=content, url=url)
    db.session.add(new_page)
    db.session.commit()
    return redirect(url_for('routes.admin'))


@routes_blueprint.route("/api/pages/<int:page_id>", methods=['POST', 'PUT'])
def update_page(page_id):
    page = Page.query.get(page_id)
    if page:
        if request.method == 'POST' or request.method == 'PUT':
            page.title = request.form["title"]
            page.content = request.form["content"]
            page.url = request.form["url"]
            db.session.commit()
            return redirect(url_for('routes.admin'))
    else:
        return jsonify({"error": "Страница не найдена"}), 404


@routes_blueprint.route("/api/pages/<string:title>", methods=['POST', 'DELETE'])
def delete_page(title):
    if request.method == 'POST':
        page = Page.query.filter_by(title=title).first()
        if page:
            db.session.delete(page)
            db.session.commit()
            return redirect(url_for('routes.admin'))
        else:
            return jsonify({"error": "Страница не найдена"}), 404


@routes_blueprint.route('/login', methods=['POST', 'GET'])
def login_page():
    login = request.form.get('login')
    password = request.form.get('password')

    if request.method == 'POST':
        if login and password:
            user = User.query.filter_by(login=login).first()

            if user and check_password_hash(user.password, password):
                login_user(user)

                next_page = request.args.get('next')

                return redirect(next_page or url_for('routes.admin'))
            else:
                flash('Login or password is not correct')
        else:
            flash('Please fill login and password fields')

    return render_template('login.html')


@routes_blueprint.route('/register', methods=['POST', 'GET'])
def register_page():
    login = request.form.get('login')
    password = request.form.get('password')
    password2 = request.form.get('password2')

    if request.method == 'POST':
        if not (login or password or password2):
            flash('Please, fill all fields!')
        elif password != password2:
            flash('Passwords are not equal!')
        else:
            hash_pwd = generate_password_hash(password, method='pbkdf2:sha256')
            new_user = User()
            new_user.login = login
            new_user.password = hash_pwd
            db.session.add(new_user)
            db.session.commit()

            return redirect(url_for('routes.login_page'))

    return render_template('register.html')


@routes_blueprint.route('/logout', methods=['POST', 'GET'])
@login_required
def logout_page():
    logout_user()
    return redirect(url_for('routes.login_page'))


@routes_blueprint.after_request
def redirect_to_signin(response):
    if response.status_code == 401:
        return redirect(url_for('routes.login_page') + '?next=' + request.url)
    else:
        return response
