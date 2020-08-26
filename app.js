//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ejs = require("ejs");

app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true, useUnifiedTopology: true
});

const userSchema = {
  email: String,
  password: String
};

const User = mongoose.model("User",userSchema);

app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const email = req.body.username;
  const password = req.body.password;
  const newUser = new User({
    email : email,
    password:password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});


app.post("/login",function(req,res){
  const email = req.body.username;
  const password = req.body.password;
  User.findOne({email:email},function(err,userFound){
    if(err){
      console.log(err);
    } else {
      if(userFound.password === password){
        res.render("secrets");
      } else {
        res.send("<h3>sorry!!! your Email and password are not matching</h3>");
      }
    }
  });
});

app.listen(3000,function(){
  console.log("server started at port 3000");
});
