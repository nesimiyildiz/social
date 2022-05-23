import React,{useContext} from 'react'
import { gql,useQuery,useSubscription} from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm'
import {AuthContext} from '../context/auth'
import {GET_POSTS} from '../utils/graphql'
//TODO: burada kullanıcı bilgisi yok ise direk login sayfasına yönlendirilmesi gerekiyor. düzenlenecek

export default function Home() {

  const {user}= useContext(AuthContext)
  const {loading,error,data}=useQuery(GET_POSTS)
  if(data){
    console.log(data);
  }

  return (
    <Grid celled='internally'>
      <Grid.Row className="page-title">
        <h1>Son Eklenen Gönderilen</h1>

      </Grid.Row>
      <Grid.Row>
        {user&&(
          <Grid.Column><PostForm/></Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {
          loading?(<h1>Gönderiler yükleniyor</h1>):(
            data.getPosts&&data.getPosts.map(post=>(
              <Grid.Column key={post.id} width={14}>
                <PostCard post={post}/>
              </Grid.Column>
            ))
          )
        }
      </Grid.Row>
    </Grid>
  )
}
