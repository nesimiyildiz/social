const { PubSub, UserInputError } = require('apollo-server');
const Status=require('../../models/Status')
const check=require('../../utils/check-auth')

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
                    context.pubsub.publish('GET_STATUS',{
                        getStatus:sta
                    })
                    return sta;
                }else{
                    const newStatus={
                        username:user.username,
                        lastLogindate:new Date().toISOString(),
                        statu:true,
                        user:user.id
                    }
                    await status.updateOne(newStatus);
                    context.pubsub.publish('GET_STATUS',{
                        getStatus:status
                    })
                    return status;
                }
            }
        },
        changeStatus:async(_,{userId},context)=>{
            const user=check(context);
            
        }
        
    },
    Subscription:{
        getStatus:{
            subscribe:(_,__,{pubsub})=>    pubsub.asyncIterator('GET_STATUS')
        },
    
    }
    

}