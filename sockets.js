module.exports = function (io){
    /*Lógica de los sockets */

    let usuarios = {

    }
    let grupos = {

    }

    io.on('connection',socket=>{
        console.log('Nueva conexión');
        socket.on('login',(data,callBack)=>{      
            if(data.id in usuarios){
                callBack(true);
            }else{
                callBack(false);
                socket.id = data.id;
                socket.nombre = data.nombre;
                socket.grupos = [];
                usuarios[socket.id] = socket;
            }
        });

        socket.on('nuevoGrupo',(data,callBack)=>{
            console.log(data);
            if(data.id in grupos){
                callBack(true,'El id del grupo ya existe');
                return;
            }
            let existen_usuarios = data.usuarios.every((item)=>item in usuarios);
            if(!existen_usuarios){
                callBack(true,'Uno de los id de usuarios no existe')
                return;
            }                        
            grupos[data.id]=data;
            socket.grupos.push(data.id);
            callBack(false,'');                        
            /*REDUCIR A UNA SOLA LINEA(? */
            for(let usuario in usuarios){
                if(data.usuarios.indexOf(usuario)!==-1){
                    usuarios[usuario].emit('nuevoGrupo',`<div> <i>Nuevo grupo creado:</i> <b> ${data.nombre} </b> </div> <br/>`)
                }
            }            
            //socket.broadcast.emit('chat:typing',data);
        });

        socket.on('mensajeGrupo',(data,callBack)=>{
            if(!data.id in grupos){
                callBack(true,'El grupo no existe');
                return;
            }
            let usuarios_en_grupo = grupos[data.id].usuarios;
            for(let usuario in usuarios){
                if(usuarios_en_grupo.indexOf(usuario)!==-1){
                    usuarios[usuario].emit('mensajeGrupo',`<div> <i>${data.nombre}</i> <b> ${data.mensaje} </b> </div> <br/>`);
                }
            } 
        });
    });
}