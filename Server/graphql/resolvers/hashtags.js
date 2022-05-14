const { UserInputError,AuthenticationError}=require('apollo-server');
const HashTag=require('../../models/Hashtag');
const Media=require('../../models/Media')
const check=require('../../utils/check-auth'); 

module.exports={
    Query:{
        getHashTagByName:async(_,{title})=>{
            if(title){
                try {
                    const hashtag=await HashTag.findOne({title});
                    return hashtag
                } catch (error) {
                    throw new Error(error)
                }
                
            }
        },
        getAllHashTag:async()=>{
            try {
                const hashtag=await HashTag.find();
                return hashtag
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation:{
        createHashtag:async(_,{userId,title,mediasId},context)=>{
            const user=check(context)
            const hashtag=await HashTag.findOne({title});
            const m=await Media.findById(mediasId)
           
            if (user.id===userId) {

                    if (hashtag) { 
                        hashtag.media.push({
                            mediaId:m.id,
                                url:m.url,
                                createdDate:m.createdDate,
                                types:m.type,
                                username:m.username,
                                user:m.user
                        })
                        await hashtag.save();
                        return hashtag
                    } else {
                       
                        const newHashtag=new HashTag({
                            title,
                            media:{
                                mediaId:m.id,
                                url:m.url,
                                createdDate:m.createdDate,
                                types:m.type,
                                username:m.username,
                                user:m.user
                            }

                    })
                    await newHashtag.save();
                    return newHashtag; 
                    }
                
                        

                
            } else {
                throw new AuthenticationError("Kullanıcı Bulunamadı")
            }

        }
       
    }
}