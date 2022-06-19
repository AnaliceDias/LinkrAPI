import postRepository from "../repositories/postRepository.js";
import getMetaData from "metadata-scraper";
import { v4 as uuid } from "uuid";
import likeRepository from "../repositories/likeRepository.js";
import userRepository from "../repositories/userRepository.js";

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
  const { postId } = req.params;

  try {
    await likeRepository.deleteLikesByPostId(postId);
    await postRepository.deletePost(postId);

    res.status(204).send("Deletado com sucesso");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getTimeline(req, res) {
  const { id } = req.params;
  try {
    const userDb = await userRepository.getUserById(id);
    const postsDB = !id ?  await postRepository.getTimeline() : await postRepository.getUserTimeline(id);
    const posts = postsDB.rows;
    const newPosts = [];
    let user = null;
    if(userDb.rowCount>0){
      user = userDb.rows[0];
    } 
    for (let post of posts) {
      const data = await getMetaData(post.link);
      newPosts.push({
        ...post,
        title: data.title,
        description: data.description,
        image: data.image
      });
    }

    res.send({user, newPosts});
  } catch (error) {
    res.sendStatus(500);
    console.log("There's something wrong in postController: " + error);
  }
}
