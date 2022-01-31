const { UserInputError,AuthenticationError}=require('apollo-server');
const Album=require('../../models/Album');
const checkAuth=require('../../utils/check-auth'); 

module.exports={
    Query:{
        getAllAlbums:async(_,{userId},context)=>{
            const user=checkAuth(context);
            if(user.id===userId){
                return await Album.find({user:userId})
            }else{
                throw new AuthenticationError("Kullanıcı Bulunamadı")
            }
            
        },
        getAlbum:async(_,{userId,albumId},context)=>{
            const user=checkAuth(context);
            if(user.id===userId){
                return await Album.findById(albumId);
            }else{
                throw new AuthenticationError("Kullanıcı Bulunamadı")
            }
            
        },
    },
    Mutation:{
        createAlbum:async(_,{userId,albumName},context)=>{
            const user=checkAuth(context);
            try {
                if(user.id===userId){
                    const newAlbum=new Album({
                        albumName,
                        createdDate:new Date().toISOString(),
                        username:user.username,
                        user:user.id
                    })
                    
                    await newAlbum.save();
                    return newAlbum;
                    
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        addAlbum:async(_,{userId,albumId,mediaId},context)=>{
            const user=checkAuth(context);
            const album=await Album.findById(albumId);
            if(user.id===userId){
                if(album){
                    album.medias.push({
                    mediaId,
                    createdDate:new Date().toISOString()
                    })
                    await album.save()
                    return album
                }else{
                    throw new UserInputError("Album Bulunamadı")
                }
            }else{
                throw new AuthenticationError("Yorum Silmeye Yetkili değilsiniz")
            }  

        },
        deleteAlbumMedia:async(_,{userId,albumId,mediaId},context)=>{
            const user=checkAuth(context);
            
                const album=await Album.findById(albumId);
            if(user.id===userId){
                if(album){
                    const mediaIndex=album.medias.findIndex(m=>m.id===mediaId);
                    if(album.medias[mediaIndex].id==mediaId){
                        album.medias.splice(mediaIndex,1);
                        await album.save();
                        return album;
                    }else{
                        throw new UserInputError("Album Bulunamadı")
                    }
                }
            }else{
                throw new AuthenticationError("Yorum Silmeye Yetkili değilsiniz")
            }
            

        },
        deleteAlbum:async(_,{userId,albumId},context)=>{
            const user=checkAuth(context);
            if(user.id===userId){
                const album=await Album.findById(albumId);
                if(album){
                    await album.delete();
                    return "Albüm Silindi!"
                }else{
                    throw new UserInputError("Gönderi Bulunamadı")
                }
            }
        }
       
    }
}