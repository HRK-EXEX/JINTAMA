const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');
    socket.on('message', (msg) => {
        console.log('メッセージ:', msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('ユーザーが切断しました');
    });
});

server.listen(3000, () => {
    console.log('サーバーが http://localhost:3000 で起動しました');
});
