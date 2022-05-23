import React,{useState} from 'react'
import {Icon, Label, Button,Confirm } from "semantic-ui-react";
import { useMutation,gql} from '@apollo/client';
import {GET_POSTS} from '../utils/graphql';

const DELETE_POST=gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }
`

function DeleteButton({postId,callback}){
    const [confirm,setConfirm]=useState(false);

    const [deletePost]=useMutation(DELETE_POST,{
        update(proxy){
            setConfirm(false);

            const data=proxy.readQuery({query:GET_POSTS});
            proxy.writeQuery({query:GET_POSTS,
            data:{getPosts:data.getPosts.filter((p)=>p.id!==postId)}});

            if(callback) callback();
        },
        variables:{postId}
    })

    return(
        <>
            <Button as='div' color='blue' inverted floated='right' onClick={()=>setConfirm(true)}>
                <Icon name='trash' style={{margin:0}}/>
            </Button>
            <Confirm 
                open={confirm} content='Silmekten Emin Misiniz'
                onCancel={()=>setConfirm(false)}
                onConfirm={deletePost}
            />
        </>
    )
}

export default DeleteButton


