const { UserInputError, AuthenticationError } = require('apollo-server');
const SavedPost=require('../../models/SavedPost')
const check=require('../../utils/check-auth')
module.exports={
    Query:{
        getUserSavedPost:async(_,{userId},context)=>{
            const user=check(context)
            if(user.id===userId){
                if(user){
                    const savedPost=await SavedPost.find({user:userId});
                    return savedPost
                }else{
                    throw new UserInputError("Kayıtlı veri bulunamadı")
                }
               
            }else{
                throw new AuthenticationError("izinsiz kullanım")
            }
        }
    },
    Mutation:{
        savePost:async(_,{userId,mediaId},context)=>{
            const user=check(context)
            const sp=await SavedPost.findOne({mediaId});
            if (user.id===userId) {
                
               if (!sp) {
                const savepost=new SavedPost({
                    createdDate:new Date().toISOString(),
                    username:user.username,
                    user:user.id,
                    media:mediaId,
                    mediaId
                });
                await savepost.save()
                return savepost
                
               } else {

                  throw new UserInputError('Daha Önce Kaydedilmiş')
               }
              

            } else {
                throw new AuthenticationError("Yetkisiz Kullanıcı")
            }
        },
        deleteSavedPost:async(_,{userId,mediaId},context)=>{
            const user=check(context);
            if(user.id===userId){
                const savingPost=await SavedPost.findOne({media:mediaId});
                
                if(savingPost){
                    await savingPost.delete();
                    return "Kaydedilen Gönderi silindi"
                }else{
                    throw new UserInputError('kaydedilen gönderi bulunamadı')
                }
            }else{
                throw new AuthenticationError("İzinsiz Kullanıcı")
            }

        },

    }
}