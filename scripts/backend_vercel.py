from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import jwt
import os
from functools import wraps

app = Flask(__name__)
CORS(app)

SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
USERS = {'admin': 'admin123'}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token missing'}), 401
        try:
            token = token.split(' ')[1]
            jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'online', 'server': 'vercel'}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username in USERS and USERS[username] == password:
        token = jwt.encode(
            {'username': username, 'exp': datetime.utcnow() + timedelta(hours=24)},
            SECRET_KEY,
            algorithm='HS256'
        )
        return jsonify({'message': 'Login successful', 'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/upload', methods=['POST'])
@token_required
def upload_files():
    uploaded_files = []
    if 'files' in request.files:
        for file in request.files.getlist('files'):
            if file:
                uploaded_files.append(file.filename)
    return jsonify({'message': 'Files processed', 'files': uploaded_files}), 200

@app.route('/api/files', methods=['GET'])
@token_required
def list_files():
    return jsonify({'files': []}), 200
