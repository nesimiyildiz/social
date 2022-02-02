const {model,Schema}=require('mongoose')

const savePost=new Schema({
    createdDate:String,
    media:{
        type:Schema.Types.ObjectId,ref:'medias'
    }, 
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    mediaId:String

})