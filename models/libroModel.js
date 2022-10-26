module.exports={
    getLibro:async function (conexion, funcion) {
        conexion.query("SELECT * FROM LIBROS ", funcion);
    },
    setLibro:async function(conexion,datos,archivos,funcion){
        conexion.query("INSERT INTO LIBROS (titulo,autor,descripcion,imagen) values(?,?,?,?)",[datos.titulo,datos.autor,datos.descripcion,archivos.filename],funcion);
    },
    getByIdLibro: async function(conexion,id,funcion){
        conexion.query("SELECT * FROM LIBROS  where id=?",[id],funcion);
    },
    deleteByIdLibro:async function(conexion,id,funcion){
        conexion.query("DELETE FROM LIBROS  where id=?",[id],funcion);
    },
    updateLibro:async function(conexion,datos,archivos,funcion){
        conexion.query("UPDATE LIBROS SET titulo=?, autor=?,descripcion=?,imagen=? WHERE id=?",[datos.titulo,datos.autor,datos.descripcion,archivos.filename,datos.id],funcion);
    },
}