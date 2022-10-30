var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer')
var novedadesModel = require('../models/novedadesModels');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/', async function(req, res, next) {
  novedades = await novedadesModel.getNovedades();
  novedades = novedades.splice(0,5);
  res.render('index', { novedades });
});



router.post("/", async (req, res, next) => {
  var usuario = req.body.usuario;
  var email = req.body.email;
  var mensaje = req.body.mensaje;
  
  var obj = {
    to: "melisa.zvala@gmail.com",
    subject: "MENSAJE RECIBIDO",
    html: usuario + "" + " se contacto a traves y quiere mas informacion a este correo:" + email + ". <br> Ademas, hizo el siguiente comentario: " + mensaje + "." 
  }
console.log(req.body);

var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

var info = await transporter.sendMail(obj);
res.render("index", {
  message: "Mensaje enviado correctamente"
});

})

module.exports = router;
