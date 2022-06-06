
const express = require("express"); // importing express module
const path =require("path"); // importing path module
const fs =require("fs"); // importing fs module
const mongoose=require('mongoose');
const bodyParser=require('body-parser');  // it is middleware
const app= express(); // creating express app
const port=8000;

mongoose.connect("mongodb://localhost/contactDance");
const contactSchema=new mongoose.Schema({
      name:String,
      phone:String,
      email:String,
      address:String,
      desc:String,
});

var Contact = mongoose.model('Contact',contactSchema);

// Express Specific stuff
app.use('/static',express.static('static')); // here '/static' is folder name
// To extract the data from the website to the app.js file, we have to write-
// app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: true }))
// or
app.use(bodyParser.urlencoded({ extended: true }));



// Pug Specific stuff
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views',path.join(__dirname,'views')); //set the views directory

// Endpoints
app.get('/',(req,res)=>{ // here as user (i.e client) we are working
   
    const params={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{ // here as user (i.e client) we are working
   
    const params={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{ // here as user (i.e client) we are working
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    })
})


//  Starting the Server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port} `);
})
