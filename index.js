/*Imports*/
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//configuración
app.set('port',process.env.PORT||3000);

//llamada al archivo con el script de sockets
require('./sockets')(io);

app.use(express.static(path.join(__dirname,'public')));
//inicia servidor
http.listen(app.get('port'),()=>{
    console.log('Server corriendo en puerto: ',app.get('port'));
});