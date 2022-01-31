const {model,Schema}=require('mongoose')

const ipSchema=new Schema({
    username:String,
    ipAdress:String,
    createdDate:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model('ipAdress',ipSchema)