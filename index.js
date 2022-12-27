const express=require('express');
//const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const url ="mongodb://localhost:27017/crudDb"

const app=express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(url,{useNewUrlParser:true});

const con=mongoose.connection
//arrow function
con.on('open', ()=>{
    console.log('Connected...')
});


app.use(express.json())

const cdRouter=require('./routes/crud')
app.use('/crud',cdRouter)




// callback function
app.listen(3000,function(){
    console.log('Server is running');
})
