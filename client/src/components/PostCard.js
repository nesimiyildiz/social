import React, { useContext } from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import {AuthContext} from '../context/auth'
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

export default function PostCard({ post }) {
  const { id, description, createdDate, username, likesCount,likes } = post;

  const {user}=useContext(AuthContext);


  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Meta>{moment(createdDate).fromNow(true)}</Card.Meta>
          <Card.Description as={Link} to={`post/${id}`}>
            {description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{id,likesCount,likes}}/>
          {
            user&&user.username===username&&(
              <DeleteButton postId={id}/>
            )
            
            
          }
        </Card.Content>
      </Card>
     
    </div>
  );
}
