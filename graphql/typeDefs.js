const gql = require('graphql-tag');

module.exports =  gql`
type Posts{
    id:ID!,
    username: String!,
    body: String!,
    createdAt: String!
}
type Query{
    getPosts: [Posts]
}
`;