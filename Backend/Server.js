

import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import {marked} from 'marked'; 

const app = express();
const server = http.createServer(app);

//  CORS for Express
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:3000', 
}));

// CORS for Socket.IO
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST']
    }
});

// Event listeners
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('markdown', (markdown) => {
        console.log(markdown);
        const html = marked(markdown); 
        io.emit('html', html); 
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Error handling
io.on('error', (err) => {
    console.error('Socket.IO Error:', err);
});
