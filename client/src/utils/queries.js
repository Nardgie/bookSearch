import {gql} from '@apollo/client';

// Define the query

// The query for getting the user's data
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;



