from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import database
import bcrypt

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Health endpoint
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "ok"}), 200

# Users
@app.route('/api/users', methods=['GET'])
def get_users():
    users = database.get_users()
    return jsonify(users)

@app.route('/api/users/me', methods=['GET'])
def get_user():
    cookies = request.cookies.get("user_data")

    if not cookies:
        return jsonify('Not signed in'), 400

    user_id = cookies.split("id\":")[1].split(",")[0]
    user = database.get_user_by_id(user_id)

    return jsonify(user)

@app.route('/api/users/me', methods=['POST'])
def update_user():
    data = request.json
    cookies = request.cookies.get("user_data")

    if not cookies:
        return jsonify('Not signed in'), 400

    user_id = cookies.split("id\":")[1].split(",")[0]
    name = data.get('name')
    email = data.get('email')

    if not user_id or not name or not email:
        return jsonify('Please provide id, name and email'), 400

    database.update_user_details(user_id, name, email, None)

    return jsonify({'message': 'User updated'})

@app.route('/api/users/update', methods=['POST'])
def update_user_by_id():
    data = request.json
    id = data.get('id')
    name = data.get('name')
    email = data.get('email')
    membership = data.get('membership')

    if not id or not name or not email:
        return jsonify('Please provide id, name and email'), 400

    database.update_user_details(id, name, email, membership)

    return jsonify({'message': 'User updated'})

@app.route('/api/users/membership', methods=['POST'])
def change_membership():
    data = request.json
    cookies = request.cookies.get("user_data")

    if not cookies:
        return jsonify('Not signed in'), 400

    user_id = cookies.split("id\":")[1].split(",")[0]
    membership = data.get('membership')

    if not user_id or not membership:
        return jsonify('Please provide id and membership'), 400

    database.update_user_membership(user_id, membership)

    return jsonify({'message': 'Membership updated'})

# Rental equipment
@app.route('/api/equipment', methods=['GET'])
def get_equipment():
    equipment = database.get_equipment()
    return jsonify(equipment)

@app.route('/api/equipment', methods=['POST'])
def change_stock():
    data = request.json

    id = data.get('id')
    stock = data.get('stock')

    if not id or not str(stock):
        return jsonify('Please provide name and stock'), 400

    database.update_equipment_stock(id, stock)

    return jsonify({'message': 'Stock updated'})

@app.route('/api/equipment/rentals', methods=['GET'])
def get_equipment_rentals():
    rentals = database.get_equipment_rentals()
    return jsonify(rentals)

@app.route('/api/equipment/rentals', methods=["DELETE"])
def delete_equipment_rental():
    data = request.json

    id = data.get('id')

    if not id:
        return jsonify('Please provide id'), 400

    database.delete_equipment_rental(id)

    return jsonify({'message': 'Rental deleted'})

@app.route('/api/equipment/checkout', methods=['POST'])
def checkout_equipment():
    data = request.json

    cookies = request.cookies.get("user_data")

    if not cookies:
        return jsonify('Not signed in'), 400

    user_id = cookies.split("id\":")[1].split(",")[0]
    equipment_id = data.get('equipment_id')
    quantity = data.get('quantity')

    if not user_id or not equipment_id or not quantity:
        return jsonify('Please provide user_id and equipment_id and quantity'), 400

    database.create_equipment_rental(user_id, equipment_id, quantity)

    return jsonify({'message': 'Equipment checked out'})

# Auth
@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify('Please provide email and password'), 400

    user = database.get_user_by_email(email)

    if user and bcrypt.checkpw(password.encode(), user[4].encode()):
        return jsonify({'message': 'Successfully signed in', 'user': {"id": user[0], "name": user[1], "email": user[2], "membership": user[3], "admin": user[5]}})
    else:
        return jsonify("Invalid email or password"), 401
    
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify("Please provide name, email and password"), 400

    existing_user = database.get_user_by_email(email)

    if existing_user:
        return jsonify("User with that email already exists"), 400

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    database.create_user(name, email, 'Guest', hashed_password)
    user = database.get_user_by_email(email)

    return jsonify({'message': 'Successfully signed up', 'user': {"id": user[0], "name": user[1], "email": user[2], "membership": user[3]}})

# Reservations
@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    reservations = database.get_reservations()
    return jsonify(reservations)

@app.route('/api/reservations/<room>', methods=['GET'])
def get_reservations_by_space(room):
    room_name = room.replace('%20', ' ')
    reservations = database.get_reservations_by_space(room_name)
    return jsonify(reservations)

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.json
    cookies = request.cookies.get("user_data")
    print(data)
    if not cookies:
        return jsonify('Not signed in'), 400

    user_id = cookies.split("id\":")[1].split(",")[0]
    space = data.get('space')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    print(user_id, space, start_date, end_date)
    if not user_id or not space or not start_date or not end_date:
        return jsonify('Missing parameters'), 400

    database.create_reservation(user_id, space, start_date, end_date)
    new_reservations = database.get_reservations_by_space(space)

    return jsonify(new_reservations)


@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'Irvine')

    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid=6a09bbe8a08af9c70ca1570473f44f35&units=metric'

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        weather = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'weather': data['weather'][0]['main']
        }
        return jsonify(weather)
    else:
        return jsonify('Could not fetch weather data'), response.status_code

if __name__ == '__main__':
    database.init_db()
    app.run(debug=True)