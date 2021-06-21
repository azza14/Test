//const { title } = require('process');
const db= require('../models');
const Tutorial = db.tutorials

// Create 
exports.create= (req,res)=>{
     if(!req.body.title){
         res.status(404).send({message:"Content can not be empty! "});
         return;
     }

      const tutorial= new Tutorial({
          title:req.body.title,
          description: req.body.description,
          published: req.body.published ?req.body.published  : false 
      });

      tutorial
         .save(tutorial)
         .then(data=>{
             res.send(data);
         })
         .catch(er=> {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Tutorial."
             });
         });
};

//GetAll
exports.findAll= (req,res)=>{
     const title = req.body.title;
     var condition= title? { title :{ $regex: new RegExp(title), $options: "i" } } : {};
 Tutorial.find(condition)
 .then(data =>{
     res.send(data)
     .catch(err=>{
         res.status(500).send({
             message:err.message || "Some error occurred while retrieving tutorials"
      })
     })
 })
};

//get single
exports.findOne=(req,res)=>{
  const id= req.params.id;
   Tutorial.findById(id).then( data=>{
     if(!data)
        res.status(404).send({message:"Not found Tutorial with id " +id});
        else
        res.send(data);
   })
   .catch(error=>{
       res.status(500).send({message:"Error retrieving Tutorial with id=" + id })
   })
    
};

//update by id
exports.update = (req, res) => {
  if(!req.body){
      return res.status(400).send({
          message:" Data to update can not be em[ty"
        });
  }
  const id= req.params.id;
  Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data)
        res.status(404).send({
            message:"Cannot update Tutorial with id=" + id +". Maybe Tutorial was not found!" 
        });
    })
    .catch(error=>{
        res.status(500).send({
            message:`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        })
    })
};

// Delete 
exports.delete = (req, res) => {
   const id= req.params.id;
   Tutorial.findByUpdateAndRemove(id)   
    .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    } else {
      res.send({
        message: "Tutorial was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  });
};

// Delete all 
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published 
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: 'true' })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };