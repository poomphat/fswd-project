import { gql } from '@apollo/client'

export const CREATE_COMMENT_MUTATION = gql`
mutation ($record: CreateOneCommentInput!) {
  createComment (record: $record) {
    recordId
  }
}
`
