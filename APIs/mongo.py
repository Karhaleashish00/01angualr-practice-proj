import jwt
from bson import ObjectId
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from bson.json_util import dumps, loads

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/salon-app"
mongo = PyMongo(app)
app.config['SECRET_KEY'] = '123'

UPLOAD_FOLDER = "D:\\0Angular-practice\\01angualr-practice-proj\\src\\assets"
POST_FOLDER = "D:\\0Angular-practice\\01angualr-practice-proj\\src\\assets\\userpost"
app.config['POST_FOLDER'] = POST_FOLDER
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route("/registerCustomer", methods=['POST'])
def registerCustomer():
    data = request.json
    activity = {}
    query = {}
    query["username"] = data["username"]
    user = mongo.db.custRegister.find_one(query)
    if user:
        return jsonify({'message': 'user already exist'}), 409
    else:
        try:
            data['filename'] = ""
            data['filepath'] = ""
            activity.update({'postCount': 0})
            activity.update({'postPaths': []})
            activity.update({'followers':[]})
            activity.update({'followersCount': 0})
            activity.update({'following': []})
            activity.update({'followingCount': 0})
            data['activity'] = activity
            mongo.db.custRegister.insert_one(data)
        except:
            return jsonify({'message': 'something went wrong'}), 500

    return jsonify({"message": "user register successfully"}), 200


@app.route("/registerShop", methods=['POST'])
def registershop():
    data = request.json
    query = {}
    query["username"] = data["username"]
    user = mongo.db.shopRegister.find_one(query)
    if user:
        return jsonify({'message': 'user already exist'}), 409
    else:
        try:
            data['profileImage'] =""
            data['profileImagename'] = ""
            data['address'] = ""
            data['stars'] = ""
            mongo.db.shopRegister.insert_one(data)
        except:
            return jsonify({'message': 'something went wrong'}), 500

    return jsonify({"message": "user register successfully"}), 200


@app.route("/getCustomerProfile", methods=['GET', 'POST'])
def get_customer_profile():
    try:
        data = request.json
        if '_id' in data:
            id = data['_id']
            obj_id = ObjectId(id)
            existing_profile = mongo.db.custRegister.find_one({'_id': obj_id})
            existing_profile['_id'] = str(existing_profile['_id'])
            if 'password' in existing_profile:
                del existing_profile['password']
            if 'conformPassword' in existing_profile:
                del existing_profile['conformPassword']
            return jsonify({"user": existing_profile}), 200
        else:
            email = data["email"]
            password = data["password"]
            query = {}
            query['email'] = email
            query['password'] = password
            existing_profile = mongo.db.custRegister.find_one(query)
            existing_profile['_id'] = str(existing_profile['_id'])
            if 'password' in existing_profile:
                del existing_profile['password']
            if 'conformPassword' in existing_profile:
                del existing_profile['conformPassword']
            return jsonify({"user": existing_profile}), 200
    except:
        return jsonify({'message': 'something went wrong'}), 500


@app.route("/getCustomerRegisters", methods=['GET', 'POST'])
def get_customer_register():
    try:
        data = request.json
        email = data["email"]
        password = data["password"]
        query = {}
        query['email'] = email
        query['password'] = password
        existing_user = mongo.db.custRegister.find_one(query)

        if existing_user['email'] == email:
            token = jwt.encode({'userid': str(existing_user['_id'])}, app.config['SECRET_KEY'])
            # print(token)
            # payload = jwt.decode(token,'123', algorithms=['HS256'])
            # print("userid : ", payload['userid'])
            return {"validUser": True, 'token': token, 'id': str(existing_user['_id'])}, 200
        else:
            return jsonify({"message": "User not found"}), 400
    except:
        return jsonify({'message': 'something went wrong'}), 500


@app.route("/getShopRegisters", methods=['GET', 'POST'])
def get_shop_register():
    try:
        data = request.json
        email = data["email"]
        password = data["password"]
        query = {}
        query['email'] = email
        query['password'] = password
        existing_user = mongo.db.shopRegister.find_one(query)
        if existing_user['email'] == email:
            token = jwt.encode({'userid': str(existing_user['_id'])}, app.config['SECRET_KEY'])
            # print(token)
            # payload = jwt.decode(token,'123', algorithms=['HS256'])
            # print("userid : ", payload['userid'])
            return {"validUser": True, 'token': token, 'id':str(existing_user['_id'])}, 200
        else:
            return jsonify({"message": "User not found"}), 400
    except:
        return jsonify({'message': 'something went wrong'}), 500


@app.route("/setcustomerdetail", methods=['POST'])
def set_customer_details():
    data = request.json
    id = data['_id']
    obj_id = ObjectId(id)
    insertdata = {}
    if 'dialog' in data:
        insertdata['dialog'] = data['dialog']
    if 'email' in data:
        insertdata['email'] = data['email']
    if 'username' in data:
        insertdata['username'] = data['username']
    result = mongo.db.custRegister.update_one({'_id': obj_id}, {'$set': insertdata})

    if result.modified_count > 0:
        return {'message': "Modified sucessfully"}, 200
    else:
        return {'message': "something went wrong"}, 500


@app.route('/setCustomerProfileImage', methods=['GET', 'POST'])
def set_customer_profile_image():
    file = request.files['file']
    obj_id = ObjectId(request.form['_id'])
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        fileDetails = {
            "filename": filename,
            "filepath": filepath
        }
        result = mongo.db.custRegister.update_one({'_id': obj_id}, {'$set': fileDetails})

        if result.modified_count > 0:
            return {'message': "Modified sucessfully"}, 200
        else:
            return {'message': "something went wrong"}, 500
    else:
        return jsonify({"error": "File type not allowed"}), 400


@app.route("/getAllShopRegisters", methods=['GET', 'POST'])
def get_all_shop_registers():
    try:
        objects = list(mongo.db.shopRegister.find())
        filtered_objects = []
        for obj in objects:
            if obj['username'] != 'inital':
                obj['_id'] = str(obj['_id'])
                filtered_objects.append(obj)
        return filtered_objects, 200
    except Exception as e:
        return {"message": "something went wrong"}, 500

@app.route("/getShopProfile",methods=['GET','POST'])
def get_shop_profile():
    try:
        data = request.json
        if '_id' in data:
            id = data['_id']
            obj_id = ObjectId(id)
            existing_profile = mongo.db.shopRegister.find_one({'_id': obj_id})
            existing_profile['_id'] = str(existing_profile['_id'])
            if 'password' in existing_profile:
                del existing_profile['password']
            if 'conformPassword' in existing_profile:
                del existing_profile['conformPassword']
            return jsonify({"user": existing_profile}), 200
    except:
        return jsonify({'message': 'something went wrong'}), 500

@app.route("/setCustomerPost",methods=['GET','POST'])
def set_cust_post():
   file = request.files['file']
   obj_id = ObjectId(request.form['_id'])  
   user = mongo.db.custRegister.find_one({'_id':obj_id})
   count = int(user['activity']['postCount'])
   count = count + 1
   if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
   if file and allowed_file(file.filename):   
        filename = secure_filename(file.filename)
        desc = request.form['desc']
        filepath = os.path.join(app.config['POST_FOLDER'], filename)
        file.save(filepath)
        postdetails = {
            "filename": filename,
            "filepath": filepath,
            "desc": desc
        }
        update = {
            '$push': {'postimages': postdetails},
            '$inc': {'activity.postCount': count}
        }
        result = mongo.db.custRegister.update_one({'_id': obj_id}, update)
        if result.modified_count > 0:
            return {'message': "Modified sucessfully"}, 200
        else:
            return {'message': "something went wrong"}, 500     
   else:
        return jsonify({"error": "File type not allowed"}), 400
   
# @app.route("/getcustomerposts",methods = ['GET','POST'])
# def getcustpost():
#     obj_id = ObjectId(request.form['_id'])
#     query = {'_id':obj_id}
#     user = mongo.db.custRegister.find_one(query)
#     print(user)
#     user['_id'] = str(user['_id'])
#     return jsonify(user)
if __name__ == '__main__':
    app.run(debug=True)
