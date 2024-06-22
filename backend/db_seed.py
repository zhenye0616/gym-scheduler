import sqlite3
import bcrypt

db = sqlite3.connect("database.db")
db_cur = db.cursor()


# Create DB Schemas
db_cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, membership TEXT, password TEXT, admin BOOLEAN DEFAULT 0)")
db_cur.execute("CREATE TABLE IF NOT EXISTS equipment (id INTEGER PRIMARY KEY, name TEXT, stock INTEGER)")
db_cur.execute("CREATE TABLE IF NOT EXISTS reservation (id INTEGER PRIMARY KEY, user_id INTEGER, room TEXT, start_date TEXT, end_date TEXT, FOREIGN KEY(user_id) REFERENCES users(id))")
db_cur.execute("CREATE TABLE IF NOT EXISTS equipment_rental (id INTEGER PRIMARY KEY, user_id INTEGER, equipment_id INTEGER, quantity INTEGER, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(equipment_id) REFERENCES equipment(id))")

# Insert Dummy Data
db_cur.execute(f"INSERT INTO users (name, email, membership, password) VALUES ('Peter Anteater', 'peter.anteater@gmail.com', 'Guest', '{bcrypt.hashpw(b'ants', bcrypt.gensalt()).decode()}')")

# Insert Rental Equipment Data
db_cur.execute("INSERT INTO equipment (name, stock) VALUES ('Tennis Racket', 6), ('Basketball', 0), ('Volleyball', 3), ('Football', 7), ('Soccer Ball', 0), ('Hockey Stick', 1), ('Baseball', 12)")

db.commit()

db.close()

print("Finished seeding database")