var con=require('../config/conexion');
var libro=require('../models/libroModel');
var logs=require('../models/logsModel');
var borrarImg=require('fs');
module.exports ={
    // metodo index de libro
    index:async function(req,res){
        if(!req.session.identificador){
            res.render("index", {title: "Bienvenido",mjs:'Sesión caducada'});
        }else{
            //usa modelo libro
           await libro.getLibro(con,function(err,datos){
                // renderiza vista index libros
                res.render('libro/index', { 
                    title: 'Inventario de Libros',
                    libro:datos, 
                    identificadorsession:req.session.identificador,
                    nombresession:req.session.nombre
                });
            });            
        }
    },    
    // metodo agregar libro (carga vista)
    agregar:function(req,res){
        if(!req.session.identificador){
            res.render("index", {title: "Bienvenido",mjs:'Sesión caducada'});
        }else{
            res.render('libro/agregar', { 
                title: 'Agregar libro',
                identificadorsession:req.session.identificador,
                nombresession:req.session.nombre
            });
        }
    },
    // metodo guardar libro
    guardar_libro:async function(req,res){
        if(!req.session.identificador){
            res.render("index", {title: "Bienvenido",mjs:'Sesión caducada'});
        }else{
            var titulo=req.body.titulo;
            var autor=req.body.autor;        
            var descripcion=req.body.descripcion;        
            if(! /^([A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]{1,50})$/.test(titulo) || ! /^([A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]{1,50})$/.test(autor) || ! /^([A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]{1,250})$/.test(descripcion) ){
                console.log("llego a error 400");
                var nombreImg="public/images/"+(req.file.filename); //ruta imagen
                borrarImg.unlinkSync(nombreImg); //elimina debido a error
                res.writeHead(400, { 'Content-Type': 'text/html' })
                res.end()
                
            }else{
                await libro.setLibro(con, req.body, req.file,async function (err) {
                await logs.setLog(con, req.session.identificador, 'libro agregado: ' + req.body.titulo, function (err) {
                        console.log("almacena log agregar libro");
                    });
                    res.redirect('/biblioteca/libro');
                });
                console.log("almacena libro");
            }
        }
    },
    // metodo eliminar libro
    eliminar_libro:async function(req,res){
        if(!req.session.identificador){
            res.render("index", {title: "Bienvenido",mjs:'Sesión caducada'});
        }else{
            await libro.getByIdLibro(con,req.params.id,async function(err,datos){
            var nombreImg="public/images/"+(datos[0].imagen);
            if(borrarImg.existsSync(nombreImg)){
                    borrarImg.unlinkSync(nombreImg);
            }
            await libro.deleteByIdLibro(con,req.params.id,async function(err){
                await logs.setLog(con,req.session.identificador,'libro eliminado id: '+req.params.id,function(err){
                    console.log("almacena log eliminado");
                });    
                res.redirect('/biblioteca/libro');
            });
            });
        }
    },
    // metodo editar libro
    editar_libro:function(req,res){
        if(!req.session.identificador){
            res.render("index", {title: "Bienvenido",mjs:'Sesión caducada'});
        }else{
            libro.getByIdLibro(con,req.params.id,function(err,datos){
                res.render('libro/editar', { 
                    title: 'Editar libro',
                    libro:datos[0],
                    identificadorsession:req.session.identificador,
                    nombresession:req.session.nombre
                });
            });
        }
    },
    // metodo actualizar libro
    actualizar_libro:async function(req,res){
        if(!req.session.identificador){
            res.render("index", {title: "Bienvenido",mjs:'Sesión caducada'});
        }else{
            var titulo=req.body.titulo;
            var autor=req.body.autor;        
            var descripcion=req.body.descripcion;        
            if(! /^([A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]{1,50})$/.test(titulo) || ! /^([A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]{1,50})$/.test(autor) || ! /^([A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]{1,250})$/.test(descripcion) ){
                console.log("llego a error 400");
                var nombreImg="public/images/"+(req.file.filename); //ruta imagen
                borrarImg.unlinkSync(nombreImg); //elimina debido a error
                res.writeHead(400, { 'Content-Type': 'text/html' })
                res.end()
                
            }else{
             await libro.updateLibro(con,req.body,req.file,async function(err){
                    var nombreImg_old="public/images/"+(req.body.imagen_old); //ruta imagen
                    borrarImg.unlinkSync(nombreImg_old); //elimina imagen antigua
                    await logs.setLog(con,req.session.identificador,'libro modificado id: '+req.body.id,function(err){
                        console.log("almacena log modificado");
                    });  
                    res.redirect('/biblioteca/libro');
                });
                console.log("actualiza libro");
            }
        }    
    },

}