import { gql } from '@apollo/client'

export const POST_COMMENTS_QUERY = gql`
query ($postId: String!) {
  comments (
    filter: { postId: $postId }
  ) {
    _id
    comment
    timestamp
    author {
      _id
      name
    }
  }
}
`
