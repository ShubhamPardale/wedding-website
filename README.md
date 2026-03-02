# Sarah & James Wedding Website

A simple, elegant RSVP wedding website that runs locally.

## Features

- **Wedding details** — Date, time, venue, and dress code
- **Our Story** — A brief narrative about the couple
- **RSVP form** — Collects name, email, number of guests, attendance, and optional message

## How to Run Locally

### Option 1: Open directly (simplest)

Double-click `index.html` to open it in your default browser.

### Option 2: Using a local server (recommended)

**Python:**
```bash
# Python 3
cd wedding-website
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

**Node.js (npx):**
```bash
cd wedding-website
npx serve
```

**VS Code:** Install the "Live Server" extension and right-click `index.html` → "Open with Live Server"

## Customizing

Edit `index.html` to update:
- Couple names (replace "Sarah" and "James")
- Wedding date, venue, and time
- Our Story text
- RSVP deadline

## Note

RSVPs are stored in your browser's localStorage for this local demo. For a real wedding, you'd connect the form to a backend service (e.g., Firebase, Formspree, or your own API) to store responses.
