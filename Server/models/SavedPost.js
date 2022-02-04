const {model,Schema}=require('mongoose')

const savedPost=new Schema({
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

module.exports=model('savedPost',savedPost)