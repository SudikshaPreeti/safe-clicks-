# 🛡️ Safe Clicks

Safe Clicks is a security tool designed to detect unsafe or phishing URLs. It provides users with real-time safety ratings and risk indicators to promote safer browsing habits.

## 🚀 Features

- **Real-time URL Scanning:** Lightweight Node.js backend that instantly analyzes URLs for suspicious patterns.
- **Heuristic Threat Detection:** Identifies risks based on IP address usage, suspicious keywords (e.g., "login", "verify", "free"), URL length, and subdomain count.
- **Intuitive User Interface:** Clean, responsive React frontend with a modern dark theme.
- **Instant Feedback:** Visual risk scoring (Safe, Suspicious, Dangerous) with a dynamic progress bar and detailed risk indicators.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Axios (for API requests)
- CSS3 (Custom styling, Flexbox, Animations)

**Backend:**
- Node.js
- Express.js
- CORS

## 📂 Project Structure

```text
safe-clicks/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Styling
│   │   └── main.jsx
│   └── package.json
├── server.js               # Node.js/Express Backend
├── package.json            # Backend dependencies
└── README.md

##Frontend- 
cd client
npm run dev

## backend-
node server.js