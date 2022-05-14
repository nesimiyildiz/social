const {model,Schema}=require('mongoose');

const mediaSchema=new Schema({
    url:String,
    isVisible:Boolean,
    createdDate:String,
    type:String,
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model('medias',mediaSchema);