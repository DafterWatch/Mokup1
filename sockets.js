module.exports = function (io){
    /*Lógica de los sockets */

    let usuarios = {

    }

    io.on('connection',socket=>{
        console.log('Nueva conexión');
        socket.on('e_login',(data,callBack)=>{
            console.log(data);
            if(data.id in usuarios){
                callBack(true);
            }else{
                callBack(false);
                socket.id = data.id;
                socket.nombre = data.nombre;
                usuarios[socket.id] = socket;
            }
        });

    });
}