const Media=require('../../models/Media');
const checkAuth=require('../../utils/check-auth');
const {UserInputError, AuthenticationError}=require('apollo-server')

module.exports={
    Query:{
        getMedias:async()=>{
            try {
                const media=await Media.find().sort({createdDate:-1});
                if (media) {
                    return media;
                } else {
                    throw new Error("Gönderi Bulunamadı")
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation:{
        createMedia:async(_,{userId,url,type,postId},context)=>{
            const user=checkAuth(context);
            if(userId===user.id){
                const media=new Media({
                    url,
                    type,
                    isVisible:true,
                    user:user.id,
                    createdDate:new Date().toISOString(),
                    username:user.username,
                    user:userId
                })
                await media.save();
                return media;
            }else{
                new AuthenticationError("Kullanıcı Bulunamadı")
            }
        },
        deleteMedia:async(_,{userId,mediaId},context)=>{
            const user=checkAuth(context);
            if(userId===user.id){
                const media=await Media.findById(mediaId);
                if(media.username===user.username){
                    await media.delete();
                    return "Gönderiniz Silindi"
                }else{
                    throw new UserInputError("Gönderi Bulunamadı")
                }
            }else{
                throw new AuthenticationError("Yetkisiz Silme işlemi")
            }
        }
    }
}