var express = require('express');
var router = express.Router();
var novedadesModel = require ('./../../models/novedadesModels')

router.get('/', function (req, res, next){
    res.render('/admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
    });
});

router.get('/', async function(req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('views/admin/novedades', {
      layout: "admin/layout",
        usuario: req.session.nombre,
        novedades
    });
  });

router.get('./../views/admin/novedades')

  router.get("/eliminar/:id", async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadBId(id);
    res.redirect("/admin/novedades")
  });



  async function deleteNobedadById(id) {
    var query = 'delete from novedades where id = ?';
        var row = await pool.query(query, [id]);
        return rows;

  }
 

module.exports = router
