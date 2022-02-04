const {model,Schema}=require('mongoose');

const statusSchema=new Schema({
    username:String,
    createdDate:String,
    lastLogindate:String,
    statu:Boolean,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }

})

module.exports=model('statu',statusSchema)