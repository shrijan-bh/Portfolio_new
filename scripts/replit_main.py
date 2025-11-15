"""
Portfolio Backend for Replit
Optimized for free Replit hosting with file uploads and JWT authentication
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

SECRET_KEY = os.environ.get('SECRET_KEY', 'shrijan-portfolio-secret-key-2024')

UPLOAD_FOLDER = os.path.join(os.path.expanduser('~'), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

USERS = {
    'admin': 'admin123'  # Change to your own password
}

def token_required(f):
    """Decorator to verify JWT token before accessing protected routes"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token missing', 'status': 'error'}), 401
        
        try:
            # Token format: "Bearer <token>"
            token = token.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except Exception as e:
            return jsonify({'message': 'Invalid token', 'status': 'error'}), 401
        
        return f(*args, **kwargs)
    return decorated

# ============ HEALTH CHECK ============
@app.route('/health', methods=['GET'])
def health():
    """Check if backend is online"""
    return jsonify({
        'status': 'online',
        'server': 'replit',
        'message': 'Backend is running successfully'
    }), 200

# ============ AUTHENTICATION ============
@app.route('/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        
        if not username or not password:
            return jsonify({'message': 'Username and password required', 'status': 'error'}), 400
        
        # Verify credentials
        if username not in USERS or USERS[username] != password:
            return jsonify({'message': 'Invalid credentials', 'status': 'error'}), 401
        
        # Create JWT token valid for 24 hours
        token = jwt.encode(
            {
                'username': username,
                'exp': datetime.utcnow() + timedelta(hours=24),
                'iat': datetime.utcnow()
            },
            SECRET_KEY,
            algorithm='HS256'
        )
        
        return jsonify({
            'message': 'Login successful',
            'status': 'success',
            'token': token
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Login error: {str(e)}', 'status': 'error'}), 500

# ============ FILE UPLOAD ============
@app.route('/upload', methods=['POST'])
@token_required
def upload_files():
    """Upload photos and documents"""
    try:
        if 'files' not in request.files or len(request.files.getlist('files')) == 0:
            return jsonify({'message': 'No files provided', 'status': 'error'}), 400
        
        uploaded_files = []
        errors = []
        
        for file in request.files.getlist('files'):
            if not file or not file.filename:
                continue
            
            # Check file size (5MB max)
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)
            
            if file_size > 5 * 1024 * 1024:
                errors.append(f"{file.filename}: File too large (max 5MB)")
                continue
            
            try:
                # Create unique filename with timestamp
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
                filename = timestamp + file.filename
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                
                # Save file
                file.save(filepath)
                uploaded_files.append(filename)
                
            except Exception as e:
                errors.append(f"{file.filename}: {str(e)}")
        
        if not uploaded_files:
            return jsonify({
                'message': 'Upload failed',
                'status': 'error',
                'errors': errors
            }), 400
        
        return jsonify({
            'message': f'Successfully uploaded {len(uploaded_files)} file(s)',
            'status': 'success',
            'files': uploaded_files,
            'errors': errors if errors else None
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Upload error: {str(e)}', 'status': 'error'}), 500

# ============ FILE LISTING ============
@app.route('/files', methods=['GET'])
@token_required
def list_files():
    """List all uploaded files"""
    try:
        files = []
        
        if os.path.exists(UPLOAD_FOLDER):
            files = [
                {
                    'name': f,
                    'uploaded': os.path.getctime(os.path.join(UPLOAD_FOLDER, f))
                }
                for f in os.listdir(UPLOAD_FOLDER)
                if os.path.isfile(os.path.join(UPLOAD_FOLDER, f))
            ]
            # Sort by upload time (newest first)
            files.sort(key=lambda x: x['uploaded'], reverse=True)
            files = [f['name'] for f in files]
        
        return jsonify({
            'status': 'success',
            'files': files,
            'count': len(files)
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error listing files: {str(e)}',
            'files': []
        }), 500

# ============ ERROR HANDLERS ============
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Endpoint not found', 'status': 'error'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'message': 'Internal server error', 'status': 'error'}), 500

# ============ MAIN ============
if __name__ == '__main__':
    # Get port from environment or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    print(f"\n{'='*50}")
    print(f"Portfolio Backend Starting...")
    print(f"Server: Replit")
    print(f"Port: {port}")
    print(f"Upload Folder: {UPLOAD_FOLDER}")
    print(f"{'='*50}\n")
    
    # Run Flask app
    app.run(
        debug=False,  # Never use debug=True on production
        port=port,
        host='0.0.0.0',  # Accept connections from anywhere
        threaded=True  # Handle concurrent requests
    )
