const postResolvers=require('./posts');
const userResolvers=require('./users');
const commentResolvers=require('./comments');
const userProfileResolvers = require('./userProfile');
const mediaResolvers=require('./medias');
const locationResolvers=require('./locations');
const friendResolvers=require('./friends');
const albumResolvers=require('./albums');
const ipResolvers=require('./ipAdresses');
const viewResolvers=require('./views');
const savedPostResolvers=require('./saveposts')
const statusResolvers=require('./status')
const radiosResolvers=require('./radios')
module.exports={
    Post:{
        likesCount(parent){
         
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
        ...ipResolvers.Query,
        ...viewResolvers.Query,
        ...savedPostResolvers.Query,
        ...radiosResolvers.Query
        
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
        ...ipResolvers.Mutation,
        ...viewResolvers.Mutation,
        ...savedPostResolvers.Mutation,
        ...statusResolvers.Mutation,
        ...radiosResolvers.Mutation,
    },
    Subscription:{
        ...postResolvers.Subscription,
        ...statusResolvers.Subscription,
    }
}