// @ts-check
const { ApolloServer, gql }  = require('apollo-server')
const GraphQLJSON = require('graphql-type-json')
const {} = requie()

// interface MutationResponse {
//     code: String!
//     success: Boolean!
//     message: String!
// }

const authors = [
    {
        name: 'me',
    },
    {
        name: 'not me'
    }
]
const books = [
    {
        title: 'test title',
        author: authors[0]
    },
    {
        title: 'title test',
        author: authors[1]
    }
]


const typeDefs = gql`
scalar JSON
type custom {
    data: JSON
}
type Event {
    name: String
    date: String
    location: Location
}
type Location {
    name: String
    weather: WeatherInfo
}
type WeatherInfo {
    temperature: Float
    description: String
}

type Book {
    title: String
    author: Author
}   

type Author {
    name: String
    books: [Book]
}

type Query {
    books: [Book]
    authors: [Author]
}
type Mutation {
    createBook(params: CreateBookType): Book
    updateUserEmail(id: ID!,email: String): User
}
type User {
    id: ID!
    name: String!
    email: String!
}
input CreateBookType {
    """
    A main title
    """
    title: String
    "Author name"
    author: String
}
`;

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        books: () => books,
        authors: () => authors
    }
}

const server = new ApolloServer({playground: true, introspection: true, typeDefs, resolvers})
server.listen().then(({url}) => {
    console.log(`server ready at  ${url}` ) 
})