var con=require('../config/conexion');
var usuario=require('../models/usuarioModel');
module.exports ={
    // metodo index de programador
    index:function(req,res){
        if(!req.session.nombre){
            res.end("No tienes permiso de acceso");
        }else{
            //usa modelo usuario
            usuario.getByIdUsuario(con,function(err,datos){
                console.log(datos)
                // renderiza vista index usuario
                res.render('programador/index', { title: 'Login',usuario:datos });
            });            
        }
    }
}