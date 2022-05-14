const { UserInputError } = require('apollo-server');
const View=require('../../models/View')
const check=require('../../utils/check-auth')


module.exports={
    Query:{
        getViewsCount:async(_,{mediaId})=>{
               const view= await View.find({media:mediaId}).countDocuments({},(err,count)=>{return count});
                return view
        },
        getViews:async(_,{mediaId})=>{
            const view= await View.find({media:mediaId});
         
            if(view){
                return view;
            }else{
                return new UserInputError('Gönderi Bulunamadı')
            }
        }
    },
    Mutation:{
        createView:async(_,{mediaId,userId},context)=>{
            const user=check(context)
            if(user.id===userId){
            const newview=new View({
               username:user.username,
               media:mediaId,
               user:user.id,
               createdDate:new Date().toISOString(),
             })
             const view=await View.find({user:userId});
             if(!view){
             await newview.save();
             return newview;
            }else{
                throw new UserInputError("Daha önceden görüldü")
            }
            }
        }
    }
}