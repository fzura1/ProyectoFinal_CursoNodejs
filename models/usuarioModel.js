module.exports={
    getByIdUsuario:function(conexion,nombre,funcion){
        conexion.query("SELECT * FROM USUARIOS where nombre=?",[nombre],funcion);
    },
}