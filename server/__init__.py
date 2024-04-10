from flask import Flask
from flask_cors import CORS
from config import host, user, password, db_name, port, secret_key
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = secret_key
cors = CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{user}:{password}@{host}:{port}/{db_name}"
db = SQLAlchemy(app)
manager = LoginManager(app)
