const http = require('http');
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const hostname = 'localhost';
const port = 3000;

app.use(cors());

mongoose.connect('mongodb://localhost/signup',{useNewUrlParser:true},{useUnifiedTopology:true});
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.post('/signup',function(req,res){
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var password=req.body.password;
  var email=req.body.email;
  var mobile=req.body.mobile;

    var SignUpSchema=mongoose.Schema({
      firstname:String,
      lastname:String,
      password:String,
      email:String,
      mobile:String
    });

    var User=mongoose.model('User',SignUpSchema,'users');

    var User1=new User({firstname:firstname,lastname:lastname,password:password,email:email,mobile:mobile});
    User1.save(function(err,data){
      if(err){
        res.send({status:0,result:err})
      }else{
        res.send({status:1,result:data})
      }
    })
  
  
    

})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});