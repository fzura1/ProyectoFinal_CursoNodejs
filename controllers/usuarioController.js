var con=require('../config/conexion');
var usuario=require('../models/usuarioModel');
var logs=require('../models/logsModel');
module.exports ={
    login:function(req,res){
        var usuarios=req.body.nombre;
        var claves=req.body.password;   
        var validaEmail=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        var validaClave=/^([A-Za-zÑñÁáÉéÍíÓóÚúÜü@$!?:.,;¿0-9\s]{1,50})$/;
        if(!validaEmail.test(usuarios) || !validaClave.test(claves) ){
            req.session.destroy();
            res.render('index', { title: 'Bienvenido',mjs:"Usuario y/o clave con formato invalido" });
        }else{
            usuario.getUsuario(con,req.body,function(err,datos){
                if(datos.length === 0){
                    console.log("no existe");
                    req.session.destroy();
                    res.render('index', { title: 'Bienvenido',mjs:"Usuario y/o clave incorrecta" });
                }else{
                    console.log("existe");
                    req.session.identificador = datos[0].id;
                    req.session.nombre = datos[0].nombre;
                    logs.setLog(con,req.session.identificador,'Sesión iniciada: '+req.session.nombre,function(err){
                        console.log("almacena log modificado");
                    });  
                    res.redirect('/libro');
                }  
            });
        }
          
    }, 
    cerrar_sesion:function(req,res){
        req.session.destroy();
        res.render('index', { title: 'Bienvenido',mjs:"Sesión cerrada correctamente" });
    }   
}