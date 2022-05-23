import { gql } from "@apollo/client"

export const GET_POSTS=gql`
{
  getPosts {
    id
    description
    createdDate
    username
    likes {
      id
      username
    }
    likesCount
  }
  
}
`