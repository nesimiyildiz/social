const { UserInputError, AuthenticationError } = require('apollo-server')
const Basket = require('../../models/Basket')
const Product = require('../../models/Product')
const Check = require('../../utils/check-auth')
//! Burası en son e-commerce de devreye girecek şimdilik bir şey yapılmayacak
module.exports = {
  Query:{
    getBasket:async(_,{userId,basketId},context)=>{
        const user = Check(context);
        if (user.id===userId) {
            const basket=await Basket.findById(basketId);
            return basket;
        }
    },
    getBasketcount:async(_,{userId,basketId,productsId},context)=>{
       const user = Check(context);
       let product=[]
       let total=0
       if (user.id===userId) {
        const basket=await Basket.findById(basketId);

        
        basket.products.map(e=>{
                    product.push(e.howmany)
        })
        for (let i = 0; i < product.length; i++) {
            if(!product[0]){
                continue
            }
            total+=Number(product[i])

        }
        return total
        

    }
    }
    
  },
  Mutation: {
    addBasket: async (_, { userId, productId, howmany }, context) => {
      const user = Check(context)
      if (user.id === userId) {
        const { id, productName, price } = await Product.findById(productId)
        const newBasket = new Basket({
          username: user.username,
          user: user.id,
          products: {
            productId: id,
            productName,
            price,
            howmany,
            productTotalPrice: howmany * price,
          },
        })
        const bask = await Basket.findOne({ user: userId })
        if (!bask) {
          await newBasket.save()
          return newBasket
        } else {
          throw new UserInputError('Sepetiniz Var')
        }
      }
    },
    putBasket: async (
      _,
      { userId, productsId, basketId, howsmany },
      context,
    ) => {
      const user = Check(context)
      if (user.id === userId) {
        const { id, price } = await Product.findById(productsId)

        const basket = await Basket.findById(basketId)
        if (basket) {
          const [{ productId, productName, howmany }] = basket.products

          if (productId) {
            basket.products.push({
              productId: id,
              productName,
              howmany: howsmany,
              price,
              productTotalPrice: (howmany + howsmany) * price,
            })

            await basket.save()
            return basket
          }
        }
      }
    },
  },
}
