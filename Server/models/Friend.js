const {model,Schema}=require('mongoose');
const friendSchema=new Schema({
    username:String,
    friendsId:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    createdDate:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model('friend',friendSchema);