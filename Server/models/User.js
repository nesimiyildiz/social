const {model,Schema}=require('mongoose');


const userSchema=new Schema({
    username:String,
    password:String,
    email:String,
    createdDate:String
});

module.exports=model('Users',userSchema);