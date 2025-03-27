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

**Install dependencies**

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
**Environment Variables**

```bash
cp .env.example .env.local
# Edit .env.local with your Firebase configuration
```

``

## License

MIT
