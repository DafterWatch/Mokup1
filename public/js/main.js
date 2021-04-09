$(function(){

    const socket = io();
    /*DOM*/
    const btn_login = $('#btnLogin');
    const txt_nombre =$('#txtNombre');
    const txt_id=$('#txtId');
    const chat_container = $('#chatContainer');
    const login_container = $('#main');
    const errores_login = $('#errores');
    const btn_crear_grupo = $('#btnCrearGrupo');
    const notificaciones = $('#notificaciones');
    const txt_nombre_grupo = $('#txtNombreGrupo');
    const txt_id_grupo = $('#txtIdGrupo');
    const txt_id_usuarios = $('#txtIdUsuarios');
    const txt_mensaje_grupo = $('#txtMensajeGrupo');
    const txt_id_mensaje_grupo = $('#txtIDMensajeGrupo');
    const btn_mensaje_grupo = $('#btnMensaje');

    /*Eventos de los elementos */
    btn_login.click(()=>{
        socket.emit('login',{
            nombre:txt_nombre.val(),
            id:txt_id.val()
        },(error)=>{
            if(error){
                /*TODO:Adjuntar mensaje de error */
                console.log('ERROR, EL ID DE USUARIO YA EXISTE');
                errores_login.html('ERROR, EL ID DE USUARIO YA EXISTE');
            }else{
                /*TODO:Pasar a la siguiente página de alguna forma */
                console.log('LOGEADO');
                login_container.hide();
                chat_container.show();
            }
        });
    });

    btn_crear_grupo.click(()=>{
        let id_usuarios = txt_id_usuarios.val().split(',');
        if(id_usuarios[0]==='') id_usuarios[0]=txt_id.val();
        else id_usuarios.push(txt_id.val());
        let nuevo_grupo={
            nombre:txt_nombre_grupo.val(),
            id:txt_id_grupo.val(),
            usuarios:id_usuarios
        }        
        console.log(nuevo_grupo);

        socket.emit('nuevoGrupo',(nuevo_grupo),(error,msj)=>{
            if (error) {
                console.log('ERROR AL CREAR EL GRUPO ',msj);
            } 
        });        
    });
    
    btn_mensaje_grupo.click(()=>{
        let data = {
            nombre:txt_nombre.val(),
            id:txt_id_mensaje_grupo.val(),
            mensaje:txt_mensaje_grupo.val()            
        }
        socket.emit('mensajeGrupo',(data),(error,msj)=>{
           if(error) console.log(msj);
        });

    });

    /*Eventos recibidos de los sockets*/
    socket.on('nuevoGrupo',data=>{
        notificaciones.append(data);
    });

    socket.on('mensajeGrupo',data=>{
        notificaciones.append(data);
    });

});
