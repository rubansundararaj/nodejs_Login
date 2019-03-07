var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressLayout = require('express-ejs-layouts');
var {Signup} = require('./models/usermodel');

var {mongoose} = require('./db/mongoose');

var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;



app.use(bodyparser());
app.use(cors());
app.use(expressLayout);
app.use(express.static('public'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get('/',(req,res) =>{
res.render('signup');
});


app.get('/signup',(req,res) =>{

  res.render('login');
});

app.post('/signup',(req,res) =>{

  bcrypt.hash(req.body.psw, saltRounds, function(err, hash) {
    if(err)
    {
      return console.log("Error hasing your password");
    }
    var hasp = hash;
    console.log(hasp);
    var sp = new Signup({
    
      username:req.body.username,
      email:req.body.email,
      psw:hasp,
  
    });

    sp.save(function(err,res){
      if(err){
          console("There is err babe");
          return console.log(err);
          
      }
      console.log("Success in saving");
      console.log(res);

  });

 
 
     
  });

res.render('login');
});


app.post('/home',(req,res) =>{
  Signup.findOne({email:req.body.email},'username email psw',(err,res,)=>
  {
if(err) console.log("Error getting user");

console.log(res.username);
console.log(res.email);
console.log(res.psw);
 
  
 bcrypt.compare(req.body.psw, res.psw).then(function(res) {
   if(res){
     console.log("You are a registered user");
    
   }
});
},res.end("Welcome to Ndgames players"));
});
app.get('/home',(req,res)=>{

res.end("Welcome to Ndgames players");
});

app.listen(8000,()=>{

  console.log("Server running on port 8000");
});
