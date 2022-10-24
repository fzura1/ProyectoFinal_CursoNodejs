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
    },
    login:function(req,res){
        usuario.getUsuario(con,req.body,function(err,datos){
            console.log(datos)
            // res.redirect('/libro');
        });
        // usuario.getUsuario(con,function(err,datos){
        //     console.log(datos)
        //     // renderiza vista index libros
        //     res.render('libro/index', { title: 'Inventario de Libros',libro:datos });
        // });            
    },    
}