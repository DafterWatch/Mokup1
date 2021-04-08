$(function(){

    const socket = io();
    /*DOM*/
    const btn_login = $('#btnLogin');
    const txt_nombre =$('#txtNombre');
    const txt_id=$('#txtId');

    btn_login.click(()=>{
        socket.emit('e_login',{
            nombre:txt_nombre.val(),
            id:txt_id.val()
        },(error)=>{
            if(error){
                /*TODO:Adjuntar mensaje de error */
                console.log('ERROR, EL ID DE USUARIO YA EXISTE');
            }else{
                /*TODO:Pasar a la siguiente página de alguna forma */
                console.log('LOGEADO');
            }
        });
    });
});
