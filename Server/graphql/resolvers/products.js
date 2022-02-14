const { UserInputError, AuthenticationError } = require('apollo-server')
const Product = require('../../models/Product')
const check = require('../../utils/check-auth')

module.exports = {
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
        await newProduct.save()
        return newProduct
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
        const product = await Product.findById(productID)
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
    addStockProduct:async(_,{userId,productID,addst})=>{
       try {
        const product = await Product.findById(productID)
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
           
       }
    }   
  },
}




