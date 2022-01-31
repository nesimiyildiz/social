const UserProfile=require('../../models/UserProfile');
const checkAuth=require('../../utils/check-auth');
const {UserInputError,AuthenticationError}=require('apollo-server');



module.exports={
    Query:{
        getUserProfile:async(_,{userId})=>{
            try {
                const userProfile=await UserProfile.findOne({user:userId});
                if(userProfile){
                    return userProfile
                }else{
                    throw new Error("Kullanıcı Profili Bulunamadı")
                }
            } catch (error) {
                throw new Error(error)
            }
            
            
        }
    },
    Mutation:{
         createUserProfile:async(_,{userId,userProfileInput:{name,surname,phoneNumber,birthDate}},context)=>{
            const user=checkAuth(context);
            const userProfle=await UserProfile.findOne({user:userId})
            if(user.id===userId){
              if(!userProfle){
                const newuserProfile=new UserProfile({
                    name,
                    surname,
                    phoneNumber,
                    birthDate,
                    isVisible:true,
                    user:user.id,
                    username:user.username,
                    isLocked:false,
                    createdDate:new Date().toISOString()
                })
              
                
                    await newuserProfile.save()
                    return newuserProfile;
              }else{
                  throw new UserInputError("Profiliniz Kayıtlı")
              }
                

            }else{
                throw new AuthenticationError("Yetkisiz Kayıt")
            }

        },
        updateUserProfile:async (_,{userId,userProfileInput:{name,surname,phoneNumber,birthDate}},context)=>{
            const user=checkAuth(context);
            const userProfile=await UserProfile.findOne({user:userId});
            if(user.id===userId){
               
                const newUser={
                    name,
                    surname,
                    phoneNumber,
                    username:user.username,
                    user:user.id,
                    birthDate,
                    createdDate:new Date().toISOString(),
                    isLocked:false,
                    isVisible:true
                };
        
                await userProfile.update(newUser) 
                return newUser; 
            }else{
                throw new AuthenticationError("Kullanıcı Bulunamadı")
            }
            
        },
         deleteUserProfile:async(_,{userId},context)=>{
            const {username}=checkAuth(context);
            const userProfile=await UserProfile.findOne({user:userId});
            if(userProfile){
            if(userProfile.username==username){
                await userProfile.delete();
                return "Kullanıcı Profili Silindi"
            }else{
                throw new AuthenticationError('Kullanıcı Silmeye Yetkiniz Yok')
            }
            }
        }
    }
}

