
  
const { UserInputError, AuthenticationError } = require('apollo-server')
const Product = require('../../models/Product')
const check = require('../../utils/check-auth')

module.exports = {
  Query:{
    getAllProduct:async()=>{
     try {
      const products=await Product.find();
      return products
     } catch (error) {
       throw new Error(error)
     }
    },
    getProductByCategory:async(_,{categoryID},context)=>{
      const user=check(context)
    if(user)
      { 
         try {
        const products=await Product.find({productCategory:categoryID});
        
        
        if(products){
          
          return products
          
        }else{
          throw new UserInputError("Bu Kategoride Ürün Bulunamadı")
        }
      } catch (error) {
        throw new UserInputError("Ürün Bulunamadı")
      }
    }else{
      throw new AuthenticationError("Giriş Yapınız")
    }
    },
    getProductByName:async(_,{productName},context)=>{
      const user=check(context)
      if(user)
        { 
           try {
          const products=await Product.find({productName});
          if(products){
            return products
          }else{
            throw new UserInputError("Bu İsimde Ürün Bulunamadı")
          }
        } catch (error) {
          throw new UserInputError("Ürün Bulunamadı")
        }
      }else{
        throw new AuthenticationError("Giriş Yapınız")
      }
    }
  },
  Mutation: {
    addProduct: async (
      _,
      {
        userId,
        productInput: {
          productName,
          description,
          productCategory,
          productPhoto,
          price,
          stock,
        },
      },
      context,
    ) => {
      const user = check(context)
      if (user.id === userId) {
        const newProduct = new Product({
          productName,
          description,
          productCategory,
          productPhoto,
          price,
          stock,
          createdDate: new Date().toISOString(),
          username: user.username,
          user: user.id,
        })
        await newProduct.save();
        return newProduct;
      } else {
        throw new AuthenticationError('Yetkisiz Kullanıcı')
      }
      
    },
    updateProduct: async (
      _,
      {
        userId,
        productID,
        productInput: {
          productName,
          description,
          productCategory,
          productPhoto,
          price,
          stock,
        },
      },
      context,
    ) => {
      const user = check(context)

      if (user.id === userId) {
        const product = await Product.findById(productID).findOne({user:userId})
        if (product) {
          if(product){
            const updated = {
                productName,
                description,
                productCategory,
                productPhoto,
                price,
                stock,
              }
            await product.updateOne(updated)
            return await Product.findById(productID)
          }else {
            throw new UserInputError("Güncelleme Başarısız")
          }
         
        } else {
          throw new UserInputError('Ürün Bulunamadı')
        }
      }
      
    },
     //! Stoka ekleme
    addStockProduct:async(_,{userId,productID,addst},context)=>{
      const user=check(context);
      if(user.id===userId)
      { try {
        const product = await Product.findById(productID).findOne({user:userId})
        if (product) {
            const stock=product.stock;
            const totalStock=stock+addst
            await product.updateOne({stock:totalStock})
            const pro = await Product.findById(productID)
            return pro;
        } else {
            throw new UserInputError("Ürün Bulunamadı")
        }
       
       } catch (error) {
           throw new UserInputError(error)
       }
      }else{
        throw new AuthenticationError("Yetkisiz Kullanıcı")
      }
    },
    //! Stoktan Çıkarma
    extractStockProduct:async(_,{userId,productID,addst})=>{
      const user=check(context);
      if(user.id===userId)
      {try {
       const product = await Product.findById(productID).findOne({user:userId})
       if (product) {
           const stock=product.stock;
           const totalStock=stock-addst;
           await product.updateOne({stock:totalStock})
           const pro = await Product.findById(productID)
           return pro;
       } else {
           throw new UserInputError("Ürün Bulunamadı")
       }
      
      } catch (error) {
          throw new UserInputError(error)
      }
    }else{
      throw new AuthenticationError("Yetkisiz Kullanıcı")
    }
    },
    deleteProduct:async(_,{userId,productID},context)=>{
      const user=check(context);
      if(user.id===userId){
        try {
          const product=await Product.findById(productID).findOne({user:userId});
          console.log(product);
          if(product){
            await product.deleteOne();
            return "Ürün Başarılı Bir Şekilde Silindi"
          }else{
            return "Ürün Bulunamadı"
          }
        } catch (error) {
          throw new Error(error)
        }
        
      }else{
        throw new AuthenticationError("yetkisiz Kullanıcı")
      }
    }

  },
}