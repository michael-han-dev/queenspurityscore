import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()

class FirebaseClient:
    """Firebase client for interacting with Firestore."""
    
    def __init__(self):
        self.db = None
        self.initialized = False
        self._initialize()
    
    def _initialize(self):
        """Initialize Firebase connection."""
        try:
            service_account_path = os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY_PATH')
            if not service_account_path or not os.path.exists(service_account_path):
                print("WARNING: Firebase service account key not found.")
                return False
            
            # Check if already initialized
            if not len(firebase_admin._apps):
                cred = credentials.Certificate(service_account_path)
                firebase_admin.initialize_app(cred)
            
            self.db = firestore.client()
            self.initialized = True
            return True
        except Exception as e:
            print(f"Error initializing Firebase: {e}")
            return False
    
    def add_suggestion(self, suggestion_text):
        """Add a suggestion to Firestore."""
        if not self.initialized:
            raise Exception("Firebase client not initialized")
        
        suggestion = {
            'text': suggestion_text,
            'timestamp': datetime.now(),
            'reviewed': False
        }
        
        return self.db.collection('suggestions').add(suggestion)
    
    def add_score(self, score, faculty):
        """Add a score to Firestore."""
        if not self.initialized:
            raise Exception("Firebase client not initialized")
        
        score_data = {
            'score': score,
            'faculty': faculty,
            'timestamp': datetime.now()
        }
        
        return self.db.collection('scores').add(score_data)
    
    def get_scores_by_faculty(self, faculty=None):
        """Get scores, optionally filtered by faculty."""
        if not self.initialized:
            raise Exception("Firebase client not initialized")
        
        scores_ref = self.db.collection('scores')
        
        if faculty:
            query = scores_ref.where('faculty', '==', faculty)
        else:
            query = scores_ref
            
        return [doc.to_dict() for doc in query.stream()]
    
    def get_analytics(self, faculty=None):
        """Calculate analytics for scores."""
        scores = self.get_scores_by_faculty(faculty)
        
        if not scores:
            return {
                "average": None,
                "lowest": None,
                "total": 0
            }
        
        score_values = [score['score'] for score in scores]
        average = sum(score_values) / len(score_values) if score_values else 0
        lowest = min(score_values) if score_values else 0
        
        return {
            "average": round(average, 2),
            "lowest": lowest,
            "total": len(scores)
        }

# Singleton instance
firebase_client = FirebaseClient() 