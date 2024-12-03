<?php
    $host = 'localhost';
    $port = 8081;
    
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    socket_bind($socket, $host, $port);
    socket_listen($socket);
    
    while ($client = socket_accept($socket)) {
        while ($msg = socket_read($client, 1024)) {
            // メッセージを他のクライアントに送信する処理
            socket_write($client, $msg);
        }
        socket_close($client);
    }
    socket_close($socket);
?>