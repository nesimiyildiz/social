const {model,Schema}=require('mongoose');

const locationSchema=new Schema({
    latitude:String,
    longitude:String,
    createdDate:String,
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model("location",locationSchema);