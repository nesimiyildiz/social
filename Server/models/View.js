const {model,Schema}=require('mongoose')

const viewSchema=new Schema({
    media:{
        type:Schema.Types.ObjectId,ref:'medias'
    }, 
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    createdDate:String
})

module.exports=model("view",viewSchema)