const { UserInputError, AuthenticationError } = require('apollo-server');
const Product=require('../../models/Product')
const check=require('../../utils/check-auth')
//TODO: Price float, double ya da int olacak şekilde düzenlenecek
module.exports={
    Mutation:{
        addProduct:async(_,{userId,productInput:{productName,description,productCategory,productPhoto,price}},context)=>{
            const user=check(context)
            const newProduct=new Product({
                productName,
                description,
                productCategory,
                productPhoto,
                price,
                createdDate:new Date().toISOString(),
                username:user.username,
                user:user.id
            })
            console.log(newProduct);
            
        } 
    }
}