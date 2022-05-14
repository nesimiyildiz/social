const IpAdress=require("../../models/IpAdresses");
const {UserInputError,AuthenticationError}=require('apollo-server')
const checkAuth=require('../../utils/check-auth')

module.exports={
    Query:{
        getAllIp:async()=>{
            const ip=await IpAdress.find().sort({createdDate:-1})
            if(ip){
                return ip;
            }else{
                throw new UserInputError('Hiç Bir İp Adresi Bulunamadı')
            }
        },
        getUserAllIp:async(_,{userId})=>{
            const ip=await IpAdress.find({user:userId}).sort({createdDate:-1})
            if(ip){
                return ip;
            }else{
                throw new UserInputError('Hiç Bir İp Adresi Bulunamadı')
            }
        }
    },
    Mutation:{
        saveIp:async(_,{userId,ipAdress},context)=>{
            const user=checkAuth(context);
            if(user.id==userId){
                const ipAdresses=new IpAdress({
                    username:user.username,
                    ipAdress,
                    createdDate:new Date().toISOString(),
                    user:user.id
                });
                if(ipAdresses){
                    await ipAdresses.save()
                    return ipAdresses;
                }else{
                    throw new UserInputError('Bir Hata Oluştu')
                }
            }else{
                throw new AuthenticationError("Kullanıcı Bulunamadı")
            }
        }
    }
}