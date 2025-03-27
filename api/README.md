# Rice Purity Test API

Flask-based backend service for the Rice Purity Test application.

## Setup

1. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Set up environment variables:

Either create a `.env` file in the root of the api directory or set these manually:

```
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./serviceAccountKey.json
```

3. Place your Firebase service account key:

Download your Firebase service account key from the Firebase Console and save it as `serviceAccountKey.json` in the api directory.

4. Run the development server:

```bash
flask run
```

The API will be available at http://localhost:5000.

## API Endpoints

### Health Check

- **GET** `/`
  - Returns a simple message to confirm the API is running.
  - Response: `{ "message": "Rice Purity Test API is running" }`

### Submit Suggestion

- **POST** `/api/suggestions`
  - Submit a new prompt suggestion.
  - Request body:
    ```json
    {
      "suggestion": "Your prompt suggestion text"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Suggestion submitted successfully"
    }
    ```

### Submit Score

- **POST** `/api/scores`
  - Submit a test score with faculty/category information.
  - Request body:
    ```json
    {
      "score": 75,
      "faculty": "engineering"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Score submitted successfully"
    }
    ```

### Get Analytics

- **GET** `/api/analytics`
  - Get analytics for all scores or filtered by faculty.
  - Query parameters:
    - `faculty` (optional): Filter by faculty/category
  - Response:
    ```json
    {
      "average": 68.5,
      "lowest": 42,
      "total": 120
    }
    ```