import React,{useEffect,useState} from 'react'
import {Icon, Label, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useMutation,gql} from '@apollo/client';

const POST_LIKE=gql`
    mutation likePost($postId:String!){
        likePost(postId:$postId){
            id,
            likesCount,
            likes{
                id,
                username
            }
        }
    }

`

export default function LikeButton({post:{id,likesCount,likes},user}) {

    const [toggleLike]=useMutation(POST_LIKE,{
        variables:{postId:id},
        onError(err){
            console.log(err);
        }
    })
    
 
    const [like,setLike]=useState(false);

    useEffect(()=>{
        if (user&&likes.find(b=>b.username===user.username)) {
            setLike(true)
        }else{
            setLike(false)
        }
    },[likes,user])

    const likeBtn=user?(
        like?(
            <Button color='red'>
                <Icon name='heart'/>
            </Button>
        ):(
            <Button color='red' basic>
                <Icon name='heart'/>
            </Button>
        )
    ):(
        <Button basic color='red' as={Link} to="/login"><Icon  name='heart'/></Button>
    )
  return (
    <Button as="div" labelPosition="right" onClick={toggleLike}>
    {likeBtn}
    <Label basic color="red" pointing="left" as="a">
      {likesCount}
    </Label>
  </Button>
  )
}
