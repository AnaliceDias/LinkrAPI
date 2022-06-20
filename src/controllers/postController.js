import postRepository from "../repositories/postRepository.js";
import getMetaData from "metadata-scraper";
import { v4 as uuid } from "uuid";

export function createPostId(req, res, next) {
  res.locals.postId = uuid();
  next();
}

export async function publishPost(req, res) {
  const { link } = req.body;
  let text = req.body.text;
  const userId = res.locals.user;
  const postId = res.locals.postId;
  if (text === "") text = null;

  try {
    await postRepository.insertPost(postId, text, link, userId);
    res.status(201).send("Post publicado com sucesso.");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const userId = res.locals.user;
  const { postId } = req.params;

  try {
    const post = await postRepository.getPostById(postId);
    if (!post.rows[0]) return res.sendStatus(404);
    else if (userId !== post.rows[0].userId) return res.sendStatus(401);

    await postRepository.deletePost(postId);

    res.status(204).send("Deletado com sucesso");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getTimeline(req, res) {
  try {
    const postsDB = await postRepository.getTimeline();
    const posts = postsDB.rows;

    const newPosts = [];

    for (let post of posts) {
      const data = await getMetaData(post.link);
      newPosts.push({
        ...post,
        title: data.title,
        description: data.description,
        image: data.image
      });
    }

    res.send(newPosts);
  } catch (error) {
    res.sendStatus(500);
    console.log("There's something wrong in postController: " + error);
  }
}
