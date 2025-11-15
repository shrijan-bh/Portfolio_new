from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps
from PIL import Image
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')
UPLOAD_FOLDER = '/tmp/uploads'
IMAGES_FOLDER = os.path.join(UPLOAD_FOLDER, 'images')
DOCUMENTS_FOLDER = os.path.join(UPLOAD_FOLDER, 'documents')

os.makedirs(IMAGES_FOLDER, exist_ok=True)
os.makedirs(DOCUMENTS_FOLDER, exist_ok=True)

USERS = {'admin': 'admin123'}

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.ico'}
DOCUMENT_EXTENSIONS = {'.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx', '.csv'}

def get_file_category(filename):
    ext = os.path.splitext(filename)[1].lower()
    if ext in IMAGE_EXTENSIONS:
        return 'images', IMAGES_FOLDER
    elif ext in DOCUMENT_EXTENSIONS:
        return 'documents', DOCUMENTS_FOLDER
    else:
        return 'documents', DOCUMENTS_FOLDER

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'message': 'Token missing'}), 401
        try:
            token = auth_header.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'online', 'server': 'replit'}), 200

@app.route('/login', methods=['POST'])
def login():
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
    if 'files' not in request.files:
        return jsonify({'message': 'No files provided'}), 400
    
    uploaded_files = {'images': [], 'documents': []}
    try:
        for file in request.files.getlist('files'):
            if file and file.filename:
                file_size = len(file.read())
                if file_size > 5 * 1024 * 1024:
                    file.seek(0)
                    return jsonify({'message': 'File too large (max 5MB)'}), 413
                file.seek(0)
                
                category, folder = get_file_category(file.filename)
                filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
                filepath = os.path.join(folder, filename)
                file.save(filepath)
                uploaded_files[category].append(filename)
    except Exception as e:
        return jsonify({'message': f'Upload error: {str(e)}'}), 500
    
    return jsonify({'message': 'Files uploaded', 'uploaded': uploaded_files}), 200

@app.route('/files', methods=['GET'])
@token_required
def list_files():
    try:
        images = []
        documents = []
        
        if os.path.exists(IMAGES_FOLDER):
            images = [f for f in os.listdir(IMAGES_FOLDER) if os.path.isfile(os.path.join(IMAGES_FOLDER, f))]
        
        if os.path.exists(DOCUMENTS_FOLDER):
            documents = [f for f in os.listdir(DOCUMENTS_FOLDER) if os.path.isfile(os.path.join(DOCUMENTS_FOLDER, f))]
        
        return jsonify({
            'folders': {
                'images': images,
                'documents': documents
            },
            'total': {
                'images': len(images),
                'documents': len(documents)
            }
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/preview/<category>/<filename>', methods=['GET'])
@token_required
def preview_file(category, filename):
    try:
        if category == 'images':
            folder = IMAGES_FOLDER
        elif category == 'documents':
            folder = DOCUMENTS_FOLDER
        else:
            return jsonify({'message': 'Invalid category'}), 400
        
        filepath = os.path.join(folder, filename)
        
        if not os.path.exists(filepath):
            return jsonify({'message': 'File not found'}), 404
        
        # For images, create a thumbnail
        if category == 'images':
            try:
                img = Image.open(filepath)
                img.thumbnail((100, 100), Image.Resampling.LANCZOS)
                img_io = io.BytesIO()
                img.save(img_io, 'JPEG', quality=70)
                img_io.seek(0)
                return send_file(img_io, mimetype='image/jpeg', as_attachment=False)
            except:
                # If thumbnail fails, return original image
                return send_from_directory(folder, filename)
        else:
            return send_from_directory(folder, filename)
    except Exception as e:
        return jsonify({'message': f'Preview error: {str(e)}'}), 500

@app.route('/download/<category>/<filename>', methods=['GET'])
@token_required
def download_file(category, filename):
    try:
        if category == 'images':
            folder = IMAGES_FOLDER
        elif category == 'documents':
            folder = DOCUMENTS_FOLDER
        else:
            return jsonify({'message': 'Invalid category'}), 400
        
        return send_from_directory(folder, filename, as_attachment=True)
    except Exception as e:
        return jsonify({'message': f'File not found: {str(e)}'}), 404

@app.route('/delete/<category>/<filename>', methods=['DELETE'])
@token_required
def delete_file(category, filename):
    try:
        if category == 'images':
            folder = IMAGES_FOLDER
        elif category == 'documents':
            folder = DOCUMENTS_FOLDER
        else:
            return jsonify({'message': 'Invalid category'}), 400
        
        filepath = os.path.join(folder, filename)
        if os.path.exists(filepath):
            os.remove(filepath)
            return jsonify({'message': f'File {filename} deleted successfully'}), 200
        else:
            return jsonify({'message': 'File not found'}), 404
    except Exception as e:
        return jsonify({'message': f'Delete error: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, port=port, host='0.0.0.0')
