const {model,Schema}=require('mongoose')

const productSchema=new Schema({
    productName:String,
    description:String,
    productPhoto:String,
    price:Float64Array,
    createdDate:String,
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    productCategory:{
        type:Schema.Types.ObjectId,ref:'productcategories'
    }
});

module.exports=model('product',productSchema);