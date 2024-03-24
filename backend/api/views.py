from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/add_stock', methods=['POST'])
def add_stock():
    return 'Done', 201

@main.route('/stocks')
def stocks():
    stocks = []

    return jsonify({'stocks' : stocks})