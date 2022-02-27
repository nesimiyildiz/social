const {model,Schema}=require('mongoose')

const hashtagSchema=new Schema({
    title:String,
    media:[{
        mediaId:{
            type:Schema.Types.ObjectId,ref:'medias'
        },
        url:String,
        createdDate:String,
        types:String,
        username:String,
        user:String
    }],

    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    username:String,
    createdDate:String
})

module.exports=model('hashtag',hashtagSchema)