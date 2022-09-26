var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async(req, res, next) =>{

  console.log(req.body)
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;
  var obj ={
    to: 'melisa.zvala@gmail.com'
    subject: 'CONTACTO WEB'
    html: nombre + "se contacto a traves de la web y necesita mas info a este correo : " + email + ".<br> ademas hizo este comentario: "+ mensaje }
   
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
var info = await transport.sendMail(obj);

res.render('contacto', {
  message: ' mensaje enviado con exito'

});
});

module.exports = router;
