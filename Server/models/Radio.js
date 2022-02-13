const {model,Schema}=require('mongoose')


const radiosSchema=new Schema({
    radioName:String,
    radioPath:String,
    radioLogoPath:String,
    createdDate:String,
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model('radio',radiosSchema);