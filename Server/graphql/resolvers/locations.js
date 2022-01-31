const Location=require('../../models/Location')
const checkAuth=require('../../utils/check-auth');
const {UserInputError, AuthenticationError}=require('apollo-server')

module.exports={
    Query:{
        getLocations:async(_,{userId})=>{
           try {
                const locations=await Location.find({user:userId}).sort({createdDate:-1})
                console.log(locations);
                if(locations){
                    return locations
                }else{
                    return new UserInputError('Lokasyon Bulunamadı')
                }
           } catch (error) {
               throw new UserInputError("Bulunamadı")
           }
        }
    },
    Mutation:{
        setLocation:async(_,{userId,latitude,longitude},context)=>{
            const user=checkAuth(context);
            if(user.id===userId){
                const location=new Location({
                    latitude,
                    longitude,
                    createdDate:new Date().toISOString(),
                    username:user.username,
                    user:user.id
                })

                await location.save();
                return location;
            }else{
                throw new AuthenticationError('Yetkisiz Kullanıcı')
            }
        }
    }
}