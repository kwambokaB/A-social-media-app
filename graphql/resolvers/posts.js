const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Posts');
const checkAuth = require('../../util/jwt-auth');

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            }
            catch(err){
                throw new Error('getPosts error', err)
            }
        },
        async getPost(_, {postId}){
          try{
              const post = await post.findById(postId);
              if(post) {
                  return post;
              } else {
                  throw new Error('Post not found');
              }
             
          }
          catch (err) {
            throw new Error(err);
        }
        }
    }, 
    Mutation: {
        async createPost(_, {body}, context){
            const user = checkAuth(context);

            if(args.body.trim() === '') {
               throw new Error('post  body must not be empty')
            }
            
            const newPost = new Post({
                body,
                use: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post
        },
        async deletePost(_, {postId}, context){
            const user = checkAuth(context);
            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted Successfully';
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            }
            catch (err) {
                throw new Error(err)
            }
        },
        async likePost(_, {postId}, context){
           const {username} = checkAuth(context)

           const post = await Post.findById(postId);

           if(post){
              if(post.likes.find(like => like.username === username)){
                  // post already liked, unlike it
                  post.likes = post.likes.filter(like => like.username !== username)
              } else{
                  // not liked therfore like
                  post.likes.push({
                      username,
                      createdAt: new Date().toISOString()
                  })
              }
              await post.save();
              return post;
           } else throw new UserInputError('Post not found')
        }
    }
}