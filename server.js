
const express= require('express');
const cors= require('cors');
const app= express();

var corsOptions={
    origin:"http://localhost:8080"
};
app.use(cors(corsOptions));
app.use(express.json())

app.use(express.urlencoded({extended:true}))


const db= require('./models');
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to the database!");
}).catch(err=>{
    console.log("Cannot connect to the database!",err);
    process.exit();
});


app.get('/',(req,res)=>{
    console.log('testing first app')
  res.json({message:"Welcome to first api application."})
})

require('./routes/turorial.routes')(app);

const PORT= process.env.PORT || 8080;
 app.listen(PORT,()=>{
     console.log("Server is running on port" + PORT);
 })

 