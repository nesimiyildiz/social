import React, { useContext } from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { useParams,useNavigate } from "react-router-dom";

const SINGLE_POST = gql`
    
       query($postId:ID!){
            getPost(postId:$postId){
                id
                description
                username
                likes {
                    id
                    createdDate
                    username
                }
                likesCount
                createdDate
            }
        }
    

`;

//FIXME:yorumlar ayrı çekilecek
export default function SinglePost(props) {
  let navigate=useNavigate();
  const {postId}=useParams(props);
  const {user}=useContext(AuthContext);

  const {loading,data}=useQuery(SINGLE_POST,{
      variables:postId,
      onError(err){

      }
  });

  function deleteCallback(params) {
    navigate("/",{replace:true})
  }

  return (<div>{postId}</div>)
}
