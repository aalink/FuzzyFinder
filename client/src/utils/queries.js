import { gql } from '@apollo/client';

export const QUERY_DOGS = gql`
  query getDogs($category: ID) {
    dogs(category: $category) {
      _id
      name
      description
      rate
      zipCode
      image
      category {
        _id
      }
      user {
        _id
      }
      client {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($dogs: [ID]!) {
    checkout(dogs: $dogs) {
      session
    }
  }
`;

export const QUERY_ALL_DOGS = gql`
  {
    dogs {
      _id
      name
      description
      rate
      zipCode
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        dogs {
          _id
          name
          description
          rate
          zipCode
          image
        }
      }
    }
  }
`;
export const QUERY_CATEGORY = gql`
query getCategory($categoryName: String!) {
  category(categoryName: $categoryName) {
    _id
  }
}
`;