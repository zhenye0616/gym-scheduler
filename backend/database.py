import sqlite3

db = None

def init_db():
    global db
    db = sqlite3.connect("database.db", check_same_thread=False)
    print("Database initialized")

# Users
def get_users():
    db_cur = db.cursor()
    result = db_cur.execute("SELECT id, name, email, membership, admin FROM users").fetchall()
    db_cur.close()
    return result

def get_user_by_id(id):
    db_cur = db.cursor()
    result = db_cur.execute(f"SELECT id, name, email, membership, admin FROM users WHERE id = '{id}'").fetchone()
    db_cur.close()
    return result

def get_user_by_email(email):
    db_cur = db.cursor()
    result = db_cur.execute(f"SELECT * FROM users WHERE email = '{email}'").fetchone()
    db_cur.close()
    return result

def create_user(name, email, membership, password):
    db_cur = db.cursor()
    db_cur.execute(f"INSERT INTO users (name, email, membership, password) VALUES ('{name}', '{email}', '{membership}', '{password}')")
    db.commit()
    db_cur.close()

def update_user_details(id, name, email, membership):
    db_cur = db.cursor()
    if not membership:
        db_cur.execute(f"UPDATE users SET name = '{name}', email = '{email}' WHERE id = '{id}'")
    else:
        db_cur.execute(f"UPDATE users SET name = '{name}', email = '{email}', membership = '{membership}' WHERE id = '{id}'")
    db.commit()
    db_cur.close()

def update_user_membership(id, membership):
    db_cur = db.cursor()
    db_cur.execute(f"UPDATE users SET membership = '{membership}' WHERE id = '{id}'")
    db.commit()
    db_cur.close()

# Equipment
def get_equipment():
    db_cur = db.cursor()
    result = db_cur.execute("""SELECT e.id, e.name, e.stock, e.stock - IFNULL(SUM(r.quantity), 0) AS available_stock
    FROM equipment e
    LEFT JOIN equipment_rental r ON e.id = r.equipment_id
    GROUP BY e.id, e.name, e.stock""").fetchall()
    db_cur.close()
    return result

def get_equipment_rentals():
    db_cur = db.cursor()
    result = db_cur.execute("SELECT equipment_rental.id, equipment.name, equipment_rental.quantity, users.name FROM equipment_rental INNER JOIN equipment ON equipment_rental.equipment_id = equipment.id INNER JOIN users on equipment_rental.user_id = users.id").fetchall()
    db_cur.close()
    return result

def update_equipment_stock(id, stock):
    db_cur = db.cursor()
    db_cur.execute(f"UPDATE equipment SET stock = '{stock}' WHERE id = '{id}'")
    db.commit()
    db_cur.close()

def create_equipment_rental(user_id, equipment_id, quantity):
    db_cur = db.cursor()
    db_cur.execute(f"INSERT INTO equipment_rental (user_id, equipment_id, quantity) VALUES ('{user_id}', '{equipment_id}', '{quantity}')")
    db.commit()
    db_cur.close()

def delete_equipment_rental(id):
    db_cur = db.cursor()
    db_cur.execute(f"DELETE FROM equipment_rental WHERE id = '{id}'")
    db.commit()
    db_cur.close()

# Reservations
def get_reservations():
    db_cur = db.cursor()
    result = db_cur.execute("SELECT reservation.id, room, start_date, end_date, name, user_id FROM reservation INNER JOIN users ON reservation.user_id = users.id").fetchall()
    db_cur.close()
    return result

def get_reservations_by_space(room):
    db_cur = db.cursor()
    result = db_cur.execute(f"SELECT * FROM reservation WHERE room = '{room}'").fetchall()
    db_cur.close()
    return result


def create_reservation(user_id, space, start_date, end_date):
    db_cur = db.cursor()
    
    db_cur.execute(f"INSERT INTO reservation (user_id, room, start_date, end_date) VALUES ('{user_id}', '{space}', '{start_date}', '{end_date}')")
    db.commit()
    db_cur.close()

