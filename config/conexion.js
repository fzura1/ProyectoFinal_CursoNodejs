var mysql= require('mysql');
// almacena datos de conexión a BD mysql
var con = mysql.createPool({
    connectionLimit: 100,
    host: "felipezura.me",
    user: "bituserexterno",
    password: "Zxcv0987",
    database: "TareaFinal",
    debug:  false
});
con.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Base de datos conectada con éxito');
    connection.release();
  });
module.exports=con;