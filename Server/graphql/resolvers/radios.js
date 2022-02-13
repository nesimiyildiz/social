const { UserInputError,AuthenticationError}=require('apollo-server');
const Radio=require('../../models/Radio');
const checkAuth=require('../../utils/check-auth'); 

module.exports={
    Mutation:{
        addRadio:async(_,{userId,radioName,radioPath,radioLogoPath},context)=>{
            const user=checkAuth(context);
            const radios=await Radio.findOne({radioName:radioName})
            if(user.id===userId){
              if(!radios){
                const newRadio=new Radio({
                            radioName,
                            radioLogoPath,
                            radioPath,
                            createdDate:new Date().toISOString(),
                            username:user.username,
                            user:user.id
                        })
                            await newRadio.save();
                            return newRadio;
                        
              }else{
                  throw new UserInputError("Radyo Kayıtlı")
              }
                

            }else{
                throw new AuthenticationError("Yetkisiz Kayıt")
            }
        },
        updateRadio:async (_,{userId,radioID,radioName,radioPath,radioLogoPath},context)=>{
            const user=checkAuth(context);
            const radios=await Radio.findById(radioID);
            console.log(radios);
            if(user.id===userId){
               
                const newRadio={
                    radioName,
                    radioLogoPath,
                    radioPath
                };
        
                await radios.updateOne(newRadio) 
                return radios; 
            }else{
                throw new AuthenticationError("Kullanıcı Bulunamadı")
            }
            
        },
    }
}