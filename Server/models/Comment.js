const {model,Schema}=require('mongoose');


const commentSchema=new Schema({
    body:String,
    username:String,
    createdDate:String,
    commentCount:Number,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    post:{
        type:Schema.Types.ObjectId,ref:'posts'
    }       
})

module.exports=model('comment',commentSchema);