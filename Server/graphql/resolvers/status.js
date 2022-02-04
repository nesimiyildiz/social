const { PubSub, UserInputError } = require('apollo-server');
const Status=require('../../models/Status')
const check=require('../../utils/check-auth')
const pubsub=new PubSub;
module.exports={
    Mutation:{
        setStatus:async(_,{userId},context)=>{
            const user=check(context)
            if(user.id===userId){
                const status=await Status.findOne({user:userId});
                if(!status){
                    const newStatus=new Status({
                        username:user.username,
                        createdDate:new Date().toISOString(),
                        lastLogindate:new Date().toISOString(),
                        statu:true,
                        user:user.id
                    })
                    
                   const sta=await newStatus.save();
                    pubsub.publish('GET_STATUS',{
                        getStatus:sta
                    })
                    return sta;
                }else{
                    await Status.findOneAndUpdate({user:userId},{statu:true})
                    const d=await Status.findOneAndUpdate({user:userId},{statu:true})
                    pubsub.publish('GET_STATUS',{
                        getStatus:d
                    })
                    return d;
                    
                }
            }
        },
        logout:async(_,{userId},context)=>{
            const user=check(context);
            if(user.id===userId){
     
                await Status.findOneAndUpdate({user:userId},{statu:false})
                const d=await Status.findOneAndUpdate({user:userId},{statu:false})
                pubsub.publish('GET_STATUS',{
                    getStatus:d
                })
                return d;
            }

        }
        
    },
    Subscription:{
        getStatus:{
            subscribe:()=>    pubsub.asyncIterator('GET_STATUS')
        },
    
    }
    

}