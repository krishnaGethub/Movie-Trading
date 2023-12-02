const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let currentPrice = 50;

wss.on('connection', (ws) => {
    // Send initial data to the client
    ws.send(JSON.stringify({ type: 'priceUpdate', data: currentPrice }));

    // Simulate live updates every second
    const interval = setInterval(() => {
        currentPrice += Math.random() * 4 - 2; // Simulate price fluctuations
        ws.send(JSON.stringify({ type: 'priceUpdate', data: currentPrice.toFixed(2) }));
    }, 1000);

    ws.on('close', () => {
        clearInterval(interval);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
