//MONGODB PW: D8k0qejB29hfFM3f
//MONGODB CONNECTION:mongodb+srv://osas:<password>@cluster0-f01xu.mongodb.net/test?retryWrites=true&w=majority

const express=require('express');

const app= express();

const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://osas:D8k0qejB29hfFM3f@cluster0-f01xu.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{

    console.log('Successfuly connected to mongoDb atlas!');
})
.catch((error)=>{
console.log('Unable to connect to mongoDB atlas!');
console.log(error);
})


app.get('/api/stuff/:id', (req, res, next) => {
 // console.log(id)
// console.log(req.params.id)
 const id=req.params.id
console.log(id)
  Thing.findOne({
    
    _id: req.params.id
    
  }).then( 
    (thing) => {
      res.status(200).json(thing);
      
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  //console.log(id)
});



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());

  app.post('/api/stuff',(req,res,next)=>{
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
     })
   thing.save().then(()=>{
    res.status(201).json({
        message: 'Post saved successfully!'
   })
  }).catch((error)=>{
   res.status(400).json({
       error: error
   })
  })
})

app.use('/api/stuff',(req,res,next)=>{

  Thing.find().then(
    (things) => {
      res.status(200).json(things)   
     }
  ).catch(
    (error)=>{
      res.status(400).json({
        errpr:error
      })
    }
  )  

  
});





module.exports=app;