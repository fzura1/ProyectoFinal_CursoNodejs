module.exports={
    getUsuario:function(conexion,datos,funcion){
        conexion.query("SELECT * FROM USUARIOS where nombre=? and password=?",[datos.nombre,datos.password],funcion);
    },
    
}