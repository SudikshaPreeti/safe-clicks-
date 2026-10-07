// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// A simple heuristic function to simulate "Real-time scanning"
// In a real production app, you would call Google Safe Browsing API here.
const analyzeUrl = (url) => {
    let score = 0; // 0 = Safe, 100 = Dangerous
    let reasons = [];

    // Heuristic 1: Check for IP address instead of domain name
    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    if (ipRegex.test(url)) {
        score += 40;
        reasons.push("URL uses an IP address instead of a domain name.");
    }

    // Heuristic 2: Check for suspicious keywords
    const suspiciousKeywords = ['login', 'verify', 'bank', 'update', 'secure', 'account', 'free', 'gift'];
    const lowerUrl = url.toLowerCase();
    
    suspiciousKeywords.forEach(keyword => {
        if (lowerUrl.includes(keyword)) {
            score += 15;
            reasons.push(`Contains suspicious keyword: "${keyword}"`);
        }
    });

    // Heuristic 3: URL Length (Phishing URLs are often very long)
    if (url.length > 75) {
        score += 20;
        reasons.push("URL is unusually long.");
    }

    // Heuristic 4: Too many subdomains (e.g., secure.login.bank.com.evil-site.com)
    const dots = (url.match(/\./g) || []).length;
    if (dots > 3) {
        score += 20;
        reasons.push("URL has too many subdomains.");
    }

    // Heuristic 5: Check for HTTPS (just a basic check)
    if (!url.startsWith('https://')) {
        score += 10;
        reasons.push("Connection is not secure (HTTP).");
    }

    // Determine Status
    let status = "Safe";
    if (score >= 40) status = "Suspicious";
    if (score >= 70) status = "Dangerous";

    return {
        url,
        score: Math.min(score, 100), // Cap at 100
        status,
        reasons: reasons.length > 0 ? reasons : ["No immediate threats detected."]
    };
};

app.post('/scan', (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    // Simulate network delay for "Real-time scanning" feel
    setTimeout(() => {
        const result = analyzeUrl(url);
        res.json(result);
    }, 800); 
});

app.listen(PORT, () => {
    console.log(`Safe Clicks Backend running on http://localhost:${PORT}`);
});