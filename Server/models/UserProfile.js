const {model,Schema}=require('mongoose');

const userProfileSchema=new Schema({
    name:String,
    surname:String,
    phoneNumber:String,
    birthDate:String,
    isVisible:Boolean,
    isLocked:Boolean,
    createdDate:String,
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }   
})

module.exports=model('userprofile',userProfileSchema);