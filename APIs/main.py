import uuid
import datetime
import jwt
import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
dbname = 'angular-practice'
user = 'postgres'
password = '123'
host = 'localhost'
port = '5432'

app.config['SECRET_KEY'] = '123'


def get_db():
    db = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
    return db


def generate_uuid():
    generated_uuid = uuid.uuid4()
    return str(generated_uuid)


@app.route("/registerCustomer", methods=['POST'])
def register_customer():
    try:
        db = get_db()
        cursor = db.cursor()
        userid = generate_uuid()
        data = request.json
        username = data["username"]
        password = data["password"]
        email = data["email"]

        # Check if the user already exists
        cursor.execute('SELECT * FROM "customer-register" WHERE "username" = %s OR "email" = %s', (username, email))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"error": "User already exists"}), 409

        # If user doesn't exist, insert into the database
        query = 'INSERT INTO "customer-register"("id","username","password","email") VALUES(%s,%s,%s,%s)'
        cursor.execute(query, (userid, username, password, email))
        db.commit()
        return jsonify({"message": "Data inserted successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500


@app.route("/registerShop", methods=['POST'])
def register_shop():
    try:
        db = get_db()
        cursor = db.cursor()
        userid = generate_uuid()
        data = request.json
        username = data["username"]
        password = data["password"]
        email = data["email"]

        # Check if the user already exists
        cursor.execute('SELECT * FROM "shop-register" WHERE "username" = %s OR "email" = %s', (username, email))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"error": "User already exists"}), 409

        # If user doesn't exist, insert into the database
        query = 'INSERT INTO "shop-register"("id","username","password","email") VALUES(%s,%s,%s,%s)'
        cursor.execute(query, (userid, username, password, email))
        db.commit()
        return jsonify({"message": "Data inserted successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500


@app.route("/getCustomerRegisters", methods=['GET', 'POST'])
def get_customer_register():
    try:
        db = get_db()
        cursor = db.cursor()
        data = request.json
        email = data["email"]
        password = data["password"]
        cursor.execute('SELECT * FROM "customer-register" WHERE "email" = %s AND "password" = %s',
                       (email, password))
        existing_user = cursor.fetchone()
        cursor.close()
        if existing_user:
            token = jwt.encode({'userid': existing_user[0]}, app.config['SECRET_KEY'])
            # print(token)
            # payload = jwt.decode(token,'123', algorithms=['HS256'])
            # print("userid : ", payload['userid'])
            return {"validUser": True, 'token': token}, 200
        else:
            return "User not found", 400

    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500


@app.route("/getShopRegisters", methods=['GET', 'POST'])
def get_shop_register():
    try:
        db = get_db()
        cursor = db.cursor()
        data = request.json
        email = data["email"]
        password = data["password"]
        cursor.execute('SELECT * FROM "shop-register" WHERE "email" = %s AND "password" = %s',
                       (email, password))
        existing_user = cursor.fetchone()
        cursor.close()
        if existing_user:
            token = jwt.encode({'shopid': existing_user[0]}, app.config['SECRET_KEY'])
            return {"validUser": True,'token':token}, 200
        else:
            return "User not found", 400

    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500


if __name__ == '__main__':
    app.run(debug=True)
