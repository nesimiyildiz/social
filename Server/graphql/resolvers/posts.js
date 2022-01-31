const { UserInputError, PubSub } = require('apollo-server');
const Post=require('../../models/Post');
const AuthControl=require('../../utils/check-auth');
module.exports={
    Query:{
        async getPosts(){
            try{
                const posts=await Post.find().sort({createdDate:-1});
                if(posts){
                    return posts;
                }else{
                    throw new Error("Post")
                }
                
            }catch(error){
                throw new Error(error)
            }
        },
        async getPostsMedia(_,{mediaId}){
            const post=await Post.find({media:mediaId});
            if(post){
                return post
            }else{
                throw new Error("Gönderi Bulunamadı")
            }
        },
        async getPost(_,{postId}){
            try {
                const post=await Post.findById(postId);
       
                if(post){
                    return post
                }else{
                    throw new Error("Gönderi Bulunamadı")
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation:{
        async createPost(_,{description},context){
            const user=AuthControl(context);
           
            const newPost=new Post({
                description,
                user:user.id,
                username:user.username,
                createdDate:new Date().toISOString(),
            })
           
            const post=await newPost.save();
            context.pubsub.publish('NEW_POST',{
                newPost:post
            })
            return post;
        },
        async deletePost(_,{postId},context){
            const user=AuthControl(context);
            try {
                const post=await Post.findById(postId);
                if(user.username==post.username){
                    await post.delete();
                    return 'Gönderi Silindi'
                }else{
                    throw new Error("Gönderi Bulunamadı")
                }

            } catch (error) {
                throw new Error(error)
            }
        },
        async likePost(_,{postId},context){

            const {username}=AuthControl(context);

            const post=await Post.findById(postId);

            if(post){
                if(post.likes.find(b=>b.username===username)){

                    post.likes=post.likes.filter(b=>b.username !==username);
                }else{
                    post.likes.push({
                        username,
                        createdDate:new Date().toISOString()
                    })
                }

                await post.save();
                return post;
            }else{
                throw new UserInputError('Post Bulunamadı')
            }
        }
        

    },
    Subscription:{
        newPost:{
            subscribe:(_,__,{pubsub})=>    pubsub.asyncIterator('NEW_POST')
        }
    }
}