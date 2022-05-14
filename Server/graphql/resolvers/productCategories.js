const { UserInputError,AuthenticationError}=require('apollo-server');
const ProductCategory=require('../../models/ProductCategory');
const checkAuth=require('../../utils/check-auth'); 

module.exports={
    Query:{
        getProductCategories:async()=>{
            
            try {
                const prcat=await ProductCategory.find().sort({categoryName:1});
                if (prcat) {
                    return prcat
                } else {
                    throw new UserInputError("Kategori Bulunamadı")
                }
            } catch (error) {
                
            }
        }
    },
    Mutation:{
        addProductCategory:async(_,{userId,categoryName,categorySubs},context)=>{
            const user=checkAuth(context);
            if(user.id===userId){
                const newProductCategory=new ProductCategory({
                    categoryName,
                    categorySubs,
                    createdDate:new Date().toDateString(),
                    user:user.id,
                    username:user.username
                })

                
                const product=await ProductCategory.findOne({categoryName:newProductCategory.categoryName})
                if(!product){
                    await newProductCategory.save();
                    return newProductCategory;
                }else{
                    throw new UserInputError('Kategori Daha Önceden Kaydedilmiş')
                }
            }else{
                new AuthenticationError('Yetkisiz Giriş')
            }
        },
        updateProductCategory:async(_,{userId,categoryID,categoryName,categorySubs},context)=>{
            const user=checkAuth(context);
            if (user.id===userId) {
                const productCat=await ProductCategory.findById(categoryID);
                if (productCat) {
                    const newcat={
                        categoryName,
                        categorySubs
                    }
                  await productCat.updateOne(newcat)
                  return newcat
                } else {
                    
                }
               
            } else {
                throw new AuthenticationError("Yetkisiz Güncelleme")
            }
        },
        deleteProductCategory:async(_,{userId,categoryID},context)=>{
            const user=checkAuth(context);
            if(user.id===userId){
                try {
                    const productCategory=await ProductCategory.findById(categoryID);
                    if (productCategory) {
                        await productCategory.delete();
                        return "Kategori Silindi"
                    } else {
                        return "Kategori Bulunamadı"
                    }
                } catch (error) {
                    
                }

               
            }
        }
    }
}