
module.exports = app =>{
  const tutorials= require('../controllers/tutorial.controller.js');

  var router= require('express').Router();
  // route of create 
   router.post('/',tutorials.create);

  //retrive all
   router.get('/',tutorials.findAll);

   // retrive sing by id
   router.get('/findone/:id',tutorials.findOne)
  // update Tutorial with id 
   router.put('/:id',tutorials.update);

    // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished)


  // delete all 
  router.delete("/:id", tutorials.delete);

    app.use('/test/tutorials',router)

 }