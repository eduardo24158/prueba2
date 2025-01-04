const sqlite3 = require('sqlite3');

    class ContactosModel {
    
      static db=new sqlite3.Database('./contactos.db', (err) => {
        if (err) {
          console.error('Error al conectar con la base de datos:', err);
        } else {
          console.log('Conectado a la base de datos SQLite')}})
    
      static guardarContacto(contacto, callback) {
    const query = `INSERT INTO contactos (email, nombre, comentario, ip, fecha_hora,pais) VALUES (?, ?, ?, ?, ?,?)`;
    this.db.run(query, [
      contacto.email,
      contacto.nombre,
      contacto.comentario,
      contacto.clientIp,
      contacto.fechaHora,
      contacto.pais
    ], callback);
  }

  static obtenerContactos(callback) {
    const query = `SELECT * FROM contactos`;
    this.db.all(query, [], callback);
  }



}

module.exports={
  ContactosModel
};