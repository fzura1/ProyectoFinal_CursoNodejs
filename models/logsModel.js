module.exports={
    setLog:async (conexion, usuario, descripcion, funcion) => {
        conexion.query("INSERT INTO LOGS(fechaHora,usuario,descripcion) values(now(),?,?)", [usuario, descripcion], funcion);
    }
}