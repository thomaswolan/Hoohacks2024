from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from views import main

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    app.register_blueprint(main)

    return app