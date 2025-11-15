from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')
HOME = os.environ.get('HOME', '/home/username')
UPLOAD_FOLDER = os.path.join(HOME, 'mysite', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

USERS = {
    'admin': 'admin123'
}

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

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'online', 'server': 'pythonanywhere'}), 200

@app.route('/login', methods=['POST'])
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

@app.route('/upload', methods=['POST'])
@token_required
def upload_files():
    if 'files' not in request.files:
        return jsonify({'message': 'No files provided'}), 400
    
    uploaded_files = []
    try:
        for file in request.files.getlist('files'):
            if file and file.filename:
                filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                uploaded_files.append(filename)
    except Exception as e:
        return jsonify({'message': f'Upload error: {str(e)}'}), 500
    
    return jsonify({'message': 'Files uploaded', 'files': uploaded_files}), 200

@app.route('/files', methods=['GET'])
@token_required
def list_files():
    try:
        files = []
        if os.path.exists(UPLOAD_FOLDER):
            files = [f for f in os.listdir(UPLOAD_FOLDER) if os.path.isfile(os.path.join(UPLOAD_FOLDER, f))]
        return jsonify({'files': files}), 200
    except:
        return jsonify({'files': []}), 200
