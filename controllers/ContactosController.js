const {ContactosModel}=require("../models/ContactosModel");
const {EnviarCorreo}=require('../models/CorreoEnviarModel');
require("dotenv").config();
const axios = require('axios');

class ContactosController {
  
  static add(req, res) {

    const { email, nombre, comentario,'g-recaptcha-response': token} = req.body;
    if (!token || !email || !nombre || !comentario) {
  return res.status(400).render("../views/confirmacion.ejs",{
    message:"Todos los campos son obligatorios",
  })
}

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;  
  console.log(ip);
  const ipList = ip.split(',');
  const clientIp = ipList[0].trim();

  const fechaHora = new Date().toISOString();
  const secretKey = process.env.SECRET_KEY;

    axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
          secret: secretKey,
          response: token
      }
  })
  .then((response) => {
      const data = response.data;
      console.log(data)
    })

    const ipapURL=`http://ip-api.com/json/?fields=61439`;
    axios
    .get(ipapURL)
    .then((response) => {
      const data = response.data;
      console.log(data)

    const pais=data.country;

    const nuevoContacto = { email, nombre, comentario, clientIp, fechaHora, pais };
    const correo= EnviarCorreo.CrearCorreo(email, nombre,comentario,clientIp,fechaHora,pais);
      console.log(correo)

    ContactosModel.guardarContacto(nuevoContacto, (err) => {
      if (err) {
      console.error('Error al guardar el contacto:', err);
      
        return res.status(500).render("../views/error.ejs",{
          message:"Error al guadar los datos",
        })
      }

        EnviarCorreo.EnviarCorreo(correo);
        res.render("../views/confirmacion.ejs",{
          message:"formulario hecho con exito!",
        });
        
      });
    })
}
}

module.exports={
  ContactosController
}