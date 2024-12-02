const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost",  // XAMPPのデフォルトURL
		methods: ["GET", "POST"]
	}
});

io.on('connect', socket => {
	console.log('新しいクライアントが接続しました');
  
	socket.on('disconnect', () => {
	  console.log('クライアントが切断しました');
	});
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});