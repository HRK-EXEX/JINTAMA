let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io').listen(server);

const absolutePath = '/kansho/JINTAMA';

app.use(absolutePath + '/src/css',express.static(absolutePath + '/css'));
app.use(absolutePath + '/src/js',express.static(absolutePath + '/js'));
app.use(absolutePath + '/assets',express.static(absolutePath + '/assets'));

app.get('/',function(req,res){
    res.sendFile(absolutePath +'/src/php/G-3/G3-1/index.php');
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});