const typeDefs = `
    # Define a query type

  type Query {
    me: User
  }
  
  # Define a User type

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  # Define a Book type

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  # Define an Auth type

    type Auth {
        # JWT
        token: ID!
        user: User
    }

    # Define a BookInput type

    input BookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    # Here is where we define the queries and mutations

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: String!): User
    }


`;

module.exports = typeDefs;
