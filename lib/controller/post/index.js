import createPost from './create-post'
import getPost from './get-post'
import updatePost from './update-post'
import deletePost from './delete-post'

export default ctx => ({
  createPost: createPost(ctx),
  getPost: getPost(ctx),
  updatePost: updatePost(ctx),
  deletePost: deletePost(ctx)
})
