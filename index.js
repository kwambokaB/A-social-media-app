const {ApolloServer} = require('apollo-server');
const  mongoose = require('mongoose');
const dotenv = require('dotenv');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

dotenv.config();

const server = new ApolloServer({typeDefs, resolvers});
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false})
.then(()=> {
    console.log('db connected successfully')
    return server.listen({port: 5000}).then((res) => console.log(`Server running at ${res.url}`))
    .catch(e => console.log('server connect error', e))
}).catch(e => console.log('db connect error', e))

