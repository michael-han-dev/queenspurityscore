from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from firebase_client import firebase_client

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    return jsonify({"message": "Rice Purity Test API is running"})

@app.route('/api/suggestions', methods=['POST'])
def submit_suggestion():
    if not firebase_client.initialized:
        return jsonify({"error": "Firebase is not configured"}), 503
    
    data = request.json
    if not data or 'suggestion' not in data:
        return jsonify({"error": "Suggestion is required"}), 400
    
    try:
        firebase_client.add_suggestion(data['suggestion'])
        return jsonify({"success": True, "message": "Suggestion submitted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/scores', methods=['POST'])
def submit_score():
    if not firebase_client.initialized:
        return jsonify({"error": "Firebase is not configured"}), 503
    
    data = request.json
    if not data or 'score' not in data or 'faculty' not in data:
        return jsonify({"error": "Score and faculty are required"}), 400
    
    try:
        firebase_client.add_score(data['score'], data['faculty'])
        return jsonify({"success": True, "message": "Score submitted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    if not firebase_client.initialized:
        return jsonify({"error": "Firebase is not configured"}), 503
    
    try:
        faculty = request.args.get('faculty')
        analytics = firebase_client.get_analytics(faculty)
        return jsonify(analytics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 