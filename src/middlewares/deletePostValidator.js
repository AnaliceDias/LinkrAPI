import postRepository from "../repositories/postRepository.js";

export default async function deletePostValidator(req, res, next) {
  const userId = res.locals.user;
  const { postId } = req.params;

  try {
    const post = await postRepository.getPostById(postId);
    if (!post.rows[0]) return res.sendStatus(404);
    else if (userId !== post.rows[0].userId) return res.sendStatus(401);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
