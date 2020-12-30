const express = require('express');
const router = express.Router();
const userModule=require('../modules/user');
const bcrypt=require('bcryptjs')

//Middleware for duplicate emails
function checkEmail(req,res,next){
  let email=req.body.email;
  let existemail=userModule.findOne({email:email});
  existemail.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('signup', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'Email Already Exist' });

    }
    next();
  })
}
//Middleware to check for duplicate names
function checkname(req,res,next){
  let name=req.body.uname;
  let existuname=userModule.findOne({username:name});
  existuname.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('signup', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'Username Already Exist' });

    }
    next();
  })
}

/* GET login page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'' });
});

//GET Signup page 
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'' });
});
//GET Home page 
router.get('/passwordCategory', function(req, res, next) {
  res.render('password_category', { title: 'PASSWORD MANAGEMENT SYSTEM' });
});
//Add new category
router.get('/add-new-category', function(req, res, next) {
  res.render('addNewCategory', { title: 'PASSWORD MANAGEMENT SYSTEM' });
});
//Add new password
router.get('/add-new-password', function(req, res, next) {
  res.render('add-new-password', { title: 'PASSWORD MANAGEMENT SYSTEM' });
});

//view all password
router.get('/view-all-password', function(req, res, next) {
  res.render('view-all-password', { title: 'PASSWORD MANAGEMENT SYSTEM' });
});

//POST Signup page 
router.post('/signup',checkname,checkEmail, function(req, res) {
let username=req.body.uname;
let email=req.body.email;
let password=req.body.password;
// console.log(username,email,password);

let confpassword=req.body.confpassword;

//Condition to check confpassword matches password

if(password!=confpassword){
  res.render('signup', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'Password does not match!!' });

}
else{
  password=bcrypt.hashSync(password,10)
let userDetails=new userModule({
  username:username,
  email:email,
  password:password
});
// console.log(userDetails);

userDetails.save((err,doc)=>{
  if (err) throw err;
  res.render('signup', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'User Registered Successfully' });
  
});
}
});

/* POST login page. */
router.post('/', function(req, res) {
  // let username=req.body.uname;
  let username='vaibhav';
  // console.log(req.body.uname);
  console.log(username);
  
  // let password=req.body.password;
  let password='123';
  console.log(password);
  
  let checkUser=userModule.findOne({username:username});
  console.log(checkUser.username);
  
  checkUser.exec((err,data)=>{
    if(err) throw err;
    let getPassword=data.password;
    if(bcrypt.compareSync(password,getPassword)){
      res.render('index', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'User Login Success' });

    }
    else{
      res.render('index', { title: 'PASSWORD MANAGEMENT SYSTEM',msg:'Invalid Username or Password ' });

    }
  })

});



module.exports = router;
