const {model,Schema}=require('mongoose');

const albumSchema=new Schema({
    albumName:String,
    createdDate:String,
    username:String,
    medias:[
        {mediaId:String,createdDate:String}
    ],

    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model('album',albumSchema);