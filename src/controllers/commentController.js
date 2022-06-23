import commentRepository from "../repositories/commentRepository.js";

export async function addComment(req, res) {
  const userId = res.locals.user;
  const { postId } = req.params;
  const text = req.body.comment;

  try {
    await commentRepository.addComment(userId, postId, text);

    res.status(201).send("comentario criado");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const comments = await commentRepository.getCommentsByPostId(postId);
    res.send(comments.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
