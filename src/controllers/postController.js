import postRepository from "../repositories/postRepository.js";

export async function publishPost(req, res) {
  const { link } = req.body;
  let text = req.body.text;
  const userId = res.locals.user;
  if (text === "") text = null;

  try {
    await postRepository.insertPost(text, link, userId);

    res.status(201).send("Post publicado com sucesso.");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
