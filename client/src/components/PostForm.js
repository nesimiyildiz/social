import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../utils/graphql";

const CREATE_POST = gql`
  mutation createPost($description: String!) {
    createPost(description: $description) {
      id
      description
      createdDate
      username
      likes {
        id
        createdDate
        username
      }
      likesCount
    }
  }
`;

export default function PostForm() {
  const [description, setDescription] = useState("");
  const [newPost, { error }] = useMutation(CREATE_POST, {
    variables: { description },
    update(proxy, result) {
      // console.log(result);
      const data = proxy.readQuery({
        query: GET_POSTS,
      });

      proxy.writeQuery({
        query: GET_POSTS,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      setDescription("");
    },
    onError(err) {
      console.log();
    },
  });
  const onChange = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(description);
    newPost();
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h2>Gönderi Oluştur</h2>

        <Form.Field>
          <Form.Input
            placeholder="Gönderi Yazınız"
            name="description"
            onChange={onChange}
            value={description}
            error={error ? true : false}
          />
         
          <Button type="submit" color="blue">
            Gönder
          </Button>

       
        </Form.Field>

  
      </Form>

      {error && (
            <div className="ui error message" style={{ marginBottom: 15 }}>
              <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )}
    </div>
  );
}
