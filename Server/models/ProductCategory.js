const {model,Schema}=require('mongoose')

const productCategorySchema=new Schema({
    categoryName:String,
    categorySubs:String,
    createdDate:String,
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    } 
});

module.exports=model('productCategory',productCategorySchema);