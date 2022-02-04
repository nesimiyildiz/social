const {gql} = require('apollo-server');

module.exports=gql`

#Types
type User{
    id:ID!
    email:String!
    password:String!
    token:String!
    createdDate:String!
    username:String!
}

type UserProfile{
    id:ID!,
    name:String!,
    surname:String!,
    phoneNumber:String!,
    birthDate:String!,
    isVisible:Boolean!,
    isLocked:Boolean!,
    createdDate:String!,
}

type Comment {
    id:ID!,
    username:String!,
    body:String!,
    createdDate:String!,
}

type Media{
    id:ID!,
    url:String!,
    type:String!,
    createdDate:String!,
}

type Post {
    id:ID!,
    description:String!,
    createdDate:String!,
    username:String!,
    likes:[Likes],
    likesCount:Int!,
}

type Likes{
   id:ID!,
   createdDate:String!,
   username:String!
}
type Medias {
    id:ID!,
    mediaId:String,
    createdDate:String
}


type Friend{
    id:ID!,
    createdDate:String!,
    friendsId:String!
}

type Location{
    id:ID!,
    username:String!,
    latitude:String!,
    longitude:String!,
    createdDate:String!
}

type Album{
    id:ID
    albumName:String!
    createdDate:String!
    username:String!,
    medias:[Medias]
}

type IpAdress{
    id:ID!,
    username:String!,
    createdDate:String!,
    ipAdress:String!
}

type View {
    id:ID!,
    username:String!,
    createdDate:String!
}

type SavedPost{
    id:ID!,
    createdDate:String!
    mediaId:String!
    username:String!
}

type Status{
    id:ID!,
    username:String!,
    createdDate:String!,
    lastLogindate:String!,
    statu:Boolean
}
#Inputs
input RegisterInput {
    username:String!,
    password:String!,
    repassword:String!,
    email:String!  
}

input UserProfileInput {
    name:String!,
    surname:String!,
    phoneNumber:String!,
    birthDate:String!,
    
}

#Queries
type Query {
    #Post
    getPosts:[Post!]
    getPost(postId:ID!):Post!
    getPostsMedia(mediaId:String!):[Post!]
    #Comment
    getComments(postId:ID!):[Comment!]
    getUserProfile(userId:String):UserProfile!
    #Media
    getMedias:[Media!]
    #Location
    getLocations(userId:String):[Location!]
    #Friends
    getFriends(userId:String!):[Friend!]

    #Albums
    getAllAlbums(userId:String!):[Album!]
    getAlbum(userId:String!,albumId:ID!):Album!

    #IpAdresses
    getAllIp:[IpAdress!]
    getUserAllIp(userId:String!):[IpAdress!]

    #Views
    getViewsCount(mediaId:String):String!
    getViews(mediaId:String):[View!]

    #SavedPost
    getUserSavedPost(userId:ID):[SavedPost!]
},

#Mutations
type Mutation{

    # Auth
    register(registerInput:RegisterInput):User!
    login(username:String!,password:String!):User!

    #Post
    createPost(description:String!):Post!
    deletePost(postId:ID!):String! 
    likePost(postId:String):Post!

    #Comment
    createComment(postId:String!,body:String!):Comment!
    deleteComment(commentId:ID!):String!,
    getCommentsCount(postId:String!):Int!

    #User Profile
    createUserProfile(userId:String!,userProfileInput:UserProfileInput):UserProfile!
    updateUserProfile(userId:String!,userProfileInput:UserProfileInput):UserProfile!
    deleteUserProfile(userId:String!):String!

    #Media
    createMedia(userId:String!,url:String!,type:String!,postId:String!):Media!
    deleteMedia(userId:String!,mediaId:ID!):String!
    
    #Location
    setLocation(userId:String,latitude:String,longitude:String):Location!

    #Friend
    setFriend(userId:String!,friendsId:String!):Friend!
    deleteFriend(userId:String!,friendsId:String!):String!

    #Album
    createAlbum(userId:String!,albumName:String!):Album!
    addAlbum(userId:String!,albumId:String!,mediaId:String!):Album!
    deleteAlbumMedia(userId:String!,albumId:ID!,mediaId:ID!):Album!
    deleteAlbum(userId:String!,albumId:ID!):String!

    #Ip Adress
    saveIp(userId:String!,ipAdress:String):IpAdress!

    #View
    createView(userId:String!,mediaId:String!):View!

    #SavedPost
    savePost(userId:ID!,mediaId:ID!):SavedPost!
    deleteSavedPost(userId:ID!,mediaId:String!):String!

    #Status
    setStatus(userId:ID!):Status!
    changeStatus(userId:ID!):Status!


}

#Subscriptions
type Subscription{
    newPost:Post!,
    getStatus:Status!
   
}
`