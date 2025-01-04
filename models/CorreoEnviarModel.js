require('dotenv').config();

class CorreoEnviarModel{
  
  constructor(){
    this.nodemailer=require('nodemailer');
    this.transporter= this.nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

    

  CrearCorreo(email,nombre,comentario,ip,fechaYhora){

    const destinatarios = [
      email,
      'hurtadoeduardo227@gmail.com',
      'testprogramnode20@gmail.com',
    ];
    

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: destinatarios.join(','), 
      subject: 'Gracias por completar el formulario',
      text: `${email}, \n${nombre}, \n${comentario}, \n${ip}, \n${fechaYhora}\n\nGracias por completar nuestro formulario. ¡Estamos en contacto!\n\nSaludos`,
    };
    return mailOptions;
  }

  EnviarCorreo(maildOption){
  this.transporter.sendMail(maildOption,(error,info)=>{
    if(error){
      console.log(error)
    }else{
      console.log("correo enviado con exito")
    }

  })
  }  

}
const EnviarCorreo=new CorreoEnviarModel();

module.exports={
  EnviarCorreo
};