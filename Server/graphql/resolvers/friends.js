const Friend=require('../../models/Friend')
const checkAuth=require('../../utils/check-auth');
const {UserInputError, AuthenticationError}=require('apollo-server')

module.exports={
    Query:{
        getFriends:async(_,{userId},context)=>{
            const user=checkAuth(context)
            if(user.id===userId){
                const friends=await Friend.find({user:userId});
                if(friends){
                    return friends
                }else{
                    throw new UserInputError('Henüz Arkadaşınız Yok')
                }
            }

        }
    },
    Mutation:{
        setFriend:async(_,{userId,friendsId},context)=>{
            const user=checkAuth(context);
            if(user.id==userId){
                const userFriends=await Friend.findOne({friendsId})
                if(!userFriends){
                    const friend=new Friend({
                        username:user.username,
                        user:user.id,
                        friendsId,
                        createdDate:new Date().toISOString()
                    });

                    await friend.save();
                    return friend
                }else{
                    throw new UserInputError("Zaten Arkadaşsınız")
                }   
            }
        },
        deleteFriend:async(_,{userId,friendsId},context)=>{
            const user=checkAuth(context);
            
            if(userId===user.id){
                const friend=await Friend.findOne({friendsId});
                if(friend){
                    await friend.delete();
                    return "Arkadaşlıktan Çıkarıldı"
                }else{
                    throw new UserInputError("Arkadaşlıktan Çıkaramazsınız, Arkadaş Değilsiniz")
                }
               
            }else{
                throw new AuthenticationError("Yetkisiz Kullanıcı")
            }
        }
       
    }
}