const {ContactosModel}=require("../models/ContactosModel");
const {EnviarCorreo}=require('../models/CorreoEnviarModel');
require("dotenv").config();
const axios = require('axios');

class ContactosController {
  
  static add(req, res) {

    const { email, nombre, comentario,'g-recaptcha-response': token} = req.body;
    if (!token || !email || !nombre || !comentario) {
  return res.status(400).send('Todos los campos son obligatorios');
}

  const ip = req.ip;
  console.log(ip)
  const fechaHora = new Date().toISOString();
  
    const secretKey = process.env.SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    
    const ipapURL=`http://ip-api.com/json/${ip}`;
    
    axios
    .get(ipapURL)
    .then((response) => {
      const data = response.data;
      console.log(data)

    const pais=data.country;
    console.log(pais)
    const nuevoContacto = { email, nombre, comentario, ip, fechaHora, pais };
    const correo= EnviarCorreo.CrearCorreo(email, nombre,comentario,ip,fechaHora,pais);
      console.log(correo)
    
    ContactosModel.guardarContacto(nuevoContacto, (err) => {
      if (err) {
      console.error('Error al guardar el contacto:', err);
        return res.status(500).send('Error al guardar los datos');
      }

        EnviarCorreo.EnviarCorreo(correo);
        res.send('¡Formulario enviado con éxito!');
        
      });

    })
}
}

module.exports={
  ContactosController
}