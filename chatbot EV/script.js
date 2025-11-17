// API URL
const API_URL = 'http://127.0.0.1:8001/predict';

// UI elements
const btn = document.getElementById('chatbot-button');
const box = document.getElementById('chatbot-box');
const close = document.getElementById('chatbot-close');
const msgs = document.getElementById('chatbot-messages');
const input = document.getElementById('chatbot-input');
const send = document.getElementById('chatbot-send');

// Open/close chatbot
btn.addEventListener('click', () => box.classList.toggle('hidden'));
close.addEventListener('click', () => box.classList.add('hidden'));

// Send message
send.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

// Add messages to UI
function addMessage(text, sender = 'bot') {
    const d = document.createElement('div');
    d.className = 'msg ' + (sender === 'user' ? 'user-msg' : 'bot-msg');
    d.innerHTML = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
}

// Escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Handle sending user message
async function sendMessage() {
    const txt = input.value.trim();
    if (!txt) return;

    addMessage('<strong>You:</strong> ' + escapeHtml(txt), 'user');
    input.value = '';

    const reply = await getBotResponse(txt);
    addMessage('<strong>Bot:</strong> ' + escapeHtml(reply), 'bot');
}

// Main bot logic
async function getBotResponse(input) {

    const text = input.toLowerCase().trim();

    // Prediction command
    if (text.startsWith('predict')) {
        const parts = text.split(/\s+/);

        if (parts.length !== 5) {
            return '⚠ Use: predict <charging_point> <temperature> <humidity> <vehicle_count>';
        }

        const payload = {
            charging_point: Number(parts[1]),
            temperature: Number(parts[2]),
            humidity: Number(parts[3]),
            vehicle_count: Number(parts[4])
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.error) return '❌ ' + data.error;
            return `⚡ Predicted EV Demand: ${data.prediction.toFixed(2)} kWh`;

        } catch (err) {
            return '⚠ API error — Make sure server is running on port 8001.';
        }
    }

    // Default reply
    return 'I can predict EV demand 🤖. Try: predict 10 25 60 100';
}
