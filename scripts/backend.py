from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app)

# Configuration
SECRET_KEY = 'your-secret-key-change-this'
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'public', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# In-memory user database (for local testing)
USERS = {
    'admin': 'admin123'
}

# Token verification decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token missing'}), 401
        
        try:
            token = token.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    return decorated

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'online'}), 200

@app.route('/login', methods=['POST'])
def login():
    """Login endpoint - validates username and password"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username in USERS and USERS[username] == password:
        token = jwt.encode(
            {
                'username': username,
                'exp': datetime.utcnow() + timedelta(hours=24)
            },
            SECRET_KEY,
            algorithm='HS256'
        )
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/upload', methods=['POST'])
@token_required
def upload_files():
    """Upload files endpoint"""
    if 'files' not in request.files:
        return jsonify({'message': 'No files provided'}), 400
    
    uploaded_files = []
    for file in request.files.getlist('files'):
        if file:
            filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            uploaded_files.append(filename)
    
    return jsonify({'message': 'Files uploaded', 'files': uploaded_files}), 200

@app.route('/files', methods=['GET'])
@token_required
def list_files():
    """List all uploaded files"""
    files = []
    if os.path.exists(UPLOAD_FOLDER):
        files = os.listdir(UPLOAD_FOLDER)
    return jsonify({'files': files}), 200

if __name__ == '__main__':
    print("Starting Admin Backend Server...")
    print("Access the admin panel: http://localhost:3000/admin")
    print("Press S-H-E on the hero page to navigate to admin login")
    app.run(debug=True, port=5000, host='localhost')
