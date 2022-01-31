const postResolvers=require('./posts');
const userResolvers=require('./users');
const commentResolvers=require('./comments');
const userProfileResolvers = require('./userProfile');
const mediaResolvers=require('./medias');
const locationResolvers=require('./locations');
const friendResolvers=require('./friends');
const albumResolvers=require('./albums');
const ipResolvers=require('./ipAdresses');
module.exports={
    Post:{
        likesCount(parent){
            console.log(parent);
            return parent.likes.length
        },
        
    },
  
    Query:{
        ...postResolvers.Query,
        ...commentResolvers.Query,
        ...userProfileResolvers.Query,
        ...mediaResolvers.Query,
        ...locationResolvers.Query,
        ...friendResolvers.Query,
        ...albumResolvers.Query,
        ...ipResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...userProfileResolvers.Mutation,
        ...mediaResolvers.Mutation,
        ...locationResolvers.Mutation,
        ...friendResolvers.Mutation,
        ...albumResolvers.Mutation,
        ...ipResolvers.Mutation
    },
    Subscription:{
        ...postResolvers.Subscription,
    }
}