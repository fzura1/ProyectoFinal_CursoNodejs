var con=require('../config/conexion');
var libro=require('../models/libroModel');
var borrarImg=require('fs');
module.exports ={
    // metodo index de libro
    index:function(req,res){
        // if(!req.session.nombre){
        //     res.end("No tienes permiso de acceso");
        // }else{
            //usa modelo libro
            libro.getLibro(con,function(err,datos){
                console.log(datos)
                // renderiza vista index libros
                res.render('libro/index', { title: 'Inventario de Libros',libro:datos });
            });            
        // }
    },    
    // metodo agregar libro (carga vista)
    agregar:function(req,res){
            res.render('libro/agregar', { title: 'Agregar libro'});
    },
    // metodo guardar libro
    guardar_libro:function(req,res){
        console.log(req.body);
        console.log(req.file.filename);
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
            libro.setLibro(con,req.body,req.file,function(err){
                res.redirect('/libro');
            });
            console.log("almacena libro");
        }
    },
    // metodo eliminar libro
    eliminar_libro:function(req,res){
        console.log(req.params.id);
        libro.getByIdLibro(con,req.params.id,function(err,datos){
           var nombreImg="public/images/"+(datos[0].imagen);
           if(borrarImg.existsSync(nombreImg)){
                borrarImg.unlinkSync(nombreImg);
           }
           libro.deleteByIdLibro(con,req.params.id,function(err){
                res.redirect('/libro');
           });
        });
    },
    // metodo editar libro
    editar_libro:function(req,res){
        console.log(req.params.id);
        res.render('libro/editar', { title: 'Editar libro'});
    }

}