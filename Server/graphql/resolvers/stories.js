const { UserInputError, AuthenticationError } = require('apollo-server')
const Story = require('../../models/Story')
const Check = require('../../utils/check-auth')


module.exports={
    Query:{
        getAllStories:async(_,{userId},context)=>{
            const user=Check(context);
            if(user.id===userId){
                const stories=await Story.find({user:userId});
                return stories;
            }else{
                throw new AuthenticationError("Yetkisiz Kullanım")
            }
        },
        
    },
    Mutation:{
        addStroy:async(_,{userId,storyPath,storyDesc},context)=>{
            const user=Check(context);
            if(userId===user.id){
                const newStory=new Story({
                    user:user.id,
                    username:user.username,
                    stories:{
                        storyDesc,
                        storyPath,
                        createdDate:new Date().toISOString()
                    },
                    createdDate:new Date().toISOString()
                })
                const story=newStory.save();
                return story;
            }
            
        },
        addStories:async(_,{userId,storyPath,storyDesc,storyId},context)=>{
            const user=Check(context);
            const story=await Story.findById(storyId);
            if (user.id===userId) {
                if (story) {
                    story.stories.push({
                        storyPath,
                        storyDesc,
                        createdDate:new Date().toISOString()
                    })
                    await story.save()
                    return story;

                } else {
                    throw new UserInputError("Hikaye Bulunamadı")
                }
            } else {
                throw new AuthenticationError("Yetkisiz Kullanım")
            }

        },
        deleteStory:async(_,{userId},context)=>{
            const user=Check(context);
            if(user.id===userId){
                
                try {
                    const story=await Story.findOne({user:userId});
               
                    if (story) {
                        await story.delete();
                        return "Hikaye Silindi"
                    } else {
                        return "Hikaye Bulunamadı"
                    }
                    
                } catch (error) {
                    throw new UserInputError("Bir Hata oluştu")
                }

            }else{
                throw new AuthenticationError("Yetkisiz Kullanım")
            }
        
        },
        deleteOneStory:async(_,{userId,storyId,storiesId},context)=>{
            const user=Check(context);
            const story=await Story.findById(storyId);
            if(user.id===userId){
               if (story) {
                   const storyIndex=story.stories.findIndex(s=>s.id===storiesId);
                   if(story.stories[storyIndex].id===storiesId){
                       story.stories.splice(storyIndex,1);
                       await story.save();
                       return story
                   }else{
                       throw new UserInputError("Hikaye Bulunamadı")
                   }
                   
               } else {
                   throw new AuthenticationError("Yetkisiz İşlem")
               }
            }

        }

    }
}