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


app.get('/login',(req,res) =>{

  res.render('login');
});

app.post('/signup',(req,ress) =>{

  Signup.findOne({email:req.body.email},(err,res,)=>
  {
    if(err) return ress.send("USer already exist form error", err);
    console.log('***********');
    console.log(res);
    console.log('**************');
    

    if(res) return ress.send("USer already exist from res");

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


});
ress.render('login');
});

app.post('/home',(req,ress) =>{
  Signup.findOne({email:req.body.email},'username email psw',(err,res,)=>
  {
if(err) return console.log("Error getting data mate");
if(!res){ 
  
  var x =1;
  return ress.render('signup',{message:"You are not registerd user signup here"});
}
  console.log(res.username);
console.log(res.email);
console.log(res.psw);
 var user = res.username;
  
 bcrypt.compare(req.body.psw, res.psw).then(function(res) {
   if(res){
     console.log("You are a registered user");
    return ress.send("Welcome to ndgames player");
   }
});
},console.log("Done processing "));
});
app.get('/home',(req,res)=>{

res.end("Welcome to Ndgames players");
});

app.listen(8000,()=>{

  console.log("Server running on port 8000");
});
