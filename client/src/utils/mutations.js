import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($dogs: [ID]!) {
    addOrder(dogs: $dogs) {
      purchaseDate
      dogs {
        _id
        name
        description
        rate
        zipCode
        categories {
          name
        }
        user
        client {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userToAdd: UserAddInput!, $dogToAdd: DogAddInput) {
    addUser(userToAdd: $userToAdd, dogToAdd: $dogToAdd) {
      token
      user {
        _id
      }
    }
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation updatePassword($currentPassword: String, $newPassword: String) {
    updatePassword(currentPassword: $currentPassword, newPassword: $password) {
      user {
        _id
      }
    }
  }
`