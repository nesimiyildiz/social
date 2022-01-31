const Comment=require('../../models/Comment')
const checkAuth=require('../../utils/check-auth');
const {UserInputError, AuthenticationError}=require('apollo-server')
module.exports={
    Query:{
         getComments:async(_,{postId})=>{
             const post=postId;
            try {
                const comment=await Comment.find({post:postId}).sort({createdDate:-1});
                if(comment){
                    return comment
                }else{
                    throw new Error("Gönderi Bulunamadı")
                }
            } catch (error) {
                throw new Error(error)
            }
        },
       
    },


    Mutation:{
        createComment:async(_,{postId,body},context)=>{
            const user=checkAuth(context);
            if(body.trim()===""){
                throw new UserInputError('Yorum Boş Geçilemez',{hatalar:{body:"Yorum Boş Geçilemez"}})   
            }

            if(postId){ 
                const comment=new Comment({
                    body,
                    username:user.username,
                    post:postId,
                    createdDate:new Date().toISOString()
                })

                await comment.save();
                return comment;
            }else{
                throw new UserInputError('Post Bulunamadı')
            }
        },
        deleteComment:async(_,{commentId},context)=>{
            const {username}=checkAuth(context);
            const comment=await Comment.findById(commentId);
            if(comment){
            if(comment.username==username){
                await comment.delete();
                return "Yorum Silindi"
            }else{
                throw new AuthenticationError('Yorum Silmeye Yetkiniz Yok')
            }
        }else{
            throw new UserInputError("Gönderi Bulunamadı")
        }
            
        }
    }
}


