import { gql } from '@apollo/client'

export const POSTS_QUERY = gql`
query {
  posts (sort: _ID_DESC) {
    _id
    type
    status
    ... on PhotosPost {
      photos {
        _id
        url
        caption
      }
    }
    timestamp
    author {
      _id
      name
    }
    commentsCount
  }
}
`
