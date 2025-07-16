const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Node.js server!');
    }

    else if (parsedUrl.pathname === '/user' && req.method === 'GET') {
        const name = parsedUrl.query.name || 'Guest';
        const role = parsedUrl.query.role || 'Visitor';

        const user = { name, role };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    }

    else if (parsedUrl.pathname === '/time' && req.method === 'GET') {
        const date = new Date();

        const datetime = { date };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(datetime));
    }

    else if (parsedUrl.pathname === '/user' && req.method === 'POST') {
        let body = '';

        // Step 1: Collect data
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        // Step 2: When complete, parse and respond
        req.on('end', () => {
            try {
                const data = JSON.parse(body); // Convert JSON string to object
                const { name, role } = data;

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'User created',
                    user: { name, role }
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

server.listen(9000, () => {
    console.log('Server running at http://localhost:9000');
});
