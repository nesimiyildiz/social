const {model,Schema}=require('mongoose');

const basketSchema=new Schema({
    username:String,
    user:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    products:[{
        productId:{type:Schema.Types.ObjectId,ref:'products'},
        productName:String,
        howmany:Number,
        price:Number,
        productTotalPrice:Number
    }],
   
})

module.exports=model('basket',basketSchema);
