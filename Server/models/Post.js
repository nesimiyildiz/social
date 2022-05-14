const {model,Schema}=require('mongoose');


const postSchema=new Schema({
    description:String,
    username:String,
    createdDate:String,
    likes:[
        {username:String,createdDate:String}
    ],
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    media:{
        type:Schema.Types.ObjectId,ref:'medias'
    },  
})

module.exports=model('post',postSchema);