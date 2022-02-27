const {model,Schema}=require('mongoose')

const storySchema=new Schema({
    stories:[
        {storyPath:String,createdDate:String,storyDesc:String,}
    ],
    username:String,
    createdDate:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    }
})

module.exports=model('story',storySchema)