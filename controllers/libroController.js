var con=require('../config/conexion');
var programador=require('../models/programadorModel');
var borrarImg=require('fs');
module.exports ={
    // metodo index de programador
    index:function(req,res){
        if(!req.session.nombre){
            res.end("No tienes permiso de acceso");
        }else{
            //usa modelo programador
            programador.getProgramador(con,function(err,datos){
                console.log(datos)
                // renderiza vista index programador
                res.render('programador/index', { title: 'Lista programadores',programador:datos });
            });
            res.cookie('programador', 'true', {
                maxAge: 60 * 60 * 1000, // Duración de una hora
                httpOnly: true, // Protocolo http
                secure: false, // Conexión segura https
                sameSite: true, // No se enviará en peticiones cross-site
            });
            
        }
    },    
    // metodo agregar programador (carga vista)
    agregar:function(req,res){
            res.render('programador/agregar', { title: 'Agregar programador'});
    },
    // metodo guardar programador
    guardar_programador:function(req,res){
        console.log(req.body);
        console.log(req.file.filename);
        var nombre_apellido=req.body.nombre_apellido;
        var agnos_programando=req.body.agnos_programando;        
        if(! /^([A-Za-z0-9\s]{1,50})$/.test(nombre_apellido) || ! /^([0-9\s]{1,50})$/.test(agnos_programando) ){
            console.log("llego a error 400");
            var nombreImg="public/images/"+(req.file.filename); //ruta imagen
            borrarImg.unlinkSync(nombreImg); //elimina debido a error
            res.writeHead(400, { 'Content-Type': 'text/html' })
            res.end()
            
        }else{
            programador.setProgramador(con,req.body,req.file,function(err){
                res.redirect('/programador');
            });
            console.log("almacena programador");
        }
    },
    // metodo eliminar programador
    eliminar_programador:function(req,res){
        console.log(req.params.id);
        programador.getByIdProgramador(con,req.params.id,function(err,datos){
           var nombreImg="public/images/"+(datos[0].img_avatar);
           if(borrarImg.existsSync(nombreImg)){
                borrarImg.unlinkSync(nombreImg);
           }
           programador.deleteByIdProgramador(con,req.params.id,function(err){
                res.redirect('/programador');
           });
        });
    }

}