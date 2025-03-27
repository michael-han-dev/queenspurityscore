# Rice Purity App

A modern, clean implementation of the Rice Purity Test with enhanced features like faculty selection, score analytics, and user suggestions. This is specifically tailored for Queen's University and also not associated with the University in any way.

## Project Structure

This is a monorepo containing:

- `web/` - Next.js frontend application
- `api/` - Flask backend service

## Requirements

- Node.js 18+
- PNPM 8+
- Python 3.8+
- Firebase account

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/rice-purity-app.git
cd rice-purity-app
```

2. **Install dependencies**

```bash
# Install frontend dependencies
pnpm install

# Setup Python environment
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

3. **Environment Variables**

```bash
cp .env.example .env.local
# Edit .env.local with your Firebase configuration
```

4. **Run Development Servers**

```bash
# Run both frontend and backend
pnpm dev

# Or run individually
pnpm dev:web
pnpm dev:api
```

5. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Firebase Setup

See [Firebase Setup Guide](./FIREBASE_SETUP.md) for detailed instructions on configuring Firebase for this project.

## License

MIT
