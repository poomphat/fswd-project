import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
mutation ($record: CreateOneUserInput!) {
  createUser (record: $record) {
    recordId
  }
}
`
