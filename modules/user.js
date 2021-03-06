const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms',{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.Collection;
let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true,
        }},
    email:{type:String,
        required:true,
        index:{
            unique:true
        }},
    password:{type:String,
        required:true       
    },
    date:{
        type:Date,
        default:Date.now
    }
});
let userModel=mongoose.model('users',userSchema);
module.exports=userModel