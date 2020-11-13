const gql = require('graphql-tag');

module.exports =  gql`
type Posts{
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
}
type Comment{
    id: ID!
    body: String!
    username: String!
    createdAt: String!
}
type Like{
    id: ID!
    username: String!
    createdAt: String!
}
type User{
    id: ID!
    email: String!
    password: String!
    username: String!
    token: String!
    createdAt: String!
}
input RegisterInput{
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
}
type Query{
    getPosts: [Posts]
    getPost(postId: ID!): Posts
}
type Mutation{
    register(registerInput: RegisterInput) : User!
    login(username: String!, password: String!) : User!
    createPost(body: String!): Posts!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String) : Posts!
    deleteComment(postId: ID!, commentId: ID!): Posts!
    likePost(postId: ID!): Posts!
}
`;