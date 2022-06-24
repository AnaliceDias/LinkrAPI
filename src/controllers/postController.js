import postRepository from "../repositories/postRepository.js";
import getMetaData from "metadata-scraper";
import { v4 as uuid } from "uuid";
import likeRepository from "../repositories/likeRepository.js";
import userRepository from "../repositories/userRepository.js";
import followRepository from "../repositories/followRepository.js";
import hashtagRepository from "../repositories/hashtagRepository.js";

export function createPostId(req, res, next) {
  res.locals.postId = uuid();
  next();
}

export async function publishPost(req, res, next) {
  const { link } = req.body;
  let text = req.body.text;
  const userId = res.locals.user;
  const postId = res.locals.postId;
  if (text === "") text = null;

  try {
    await postRepository.insertPost(postId, text, link, userId);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { postId } = req.params;

  try {
    await likeRepository.deleteLikesByPostId(postId);
    await hashtagRepository.deleteHashtagHistoric(postId);
    await postRepository.deletePost(postId);

    res.status(204).send("Deletado com sucesso");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getTimeline(req, res) {
  const userId = res.locals.user;
  let { offset } = req.query;
  if (!offset) {
    offset = 0;
  }

  try {
    const following = await followRepository.chekQttFollowing(userId);

    if (following.rowCount === 0) return res.send({ following: 0, newPosts: [] }).status(200);

    const postsDB = await postRepository.getTimeline(userId, offset);
    const posts = postsDB.rows;
    const newPosts = [];
    for (let post of posts) {
      const data = await getMetaData(post.link);
      newPosts.push({
        ...post,
        title: data.title,
        description: data.description,
        image: data.image,
      });
    }

    return res.send({ following: following.rows[0].following, newPosts }).status(200);
  } catch (error) {
    res.sendStatus(500);
    console.log("There's something wrong in postController: " + error);
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;
  let { offset } = req.query;
  if (!offset) {
    offset = 0;
  }

  try {
    const userDb = await userRepository.getUserById(id);
    const postsDB = await postRepository.getUserTimeline(id, offset);
    const posts = postsDB.rows;
    const newPosts = [];
    let user = null;
    if (userDb.rowCount > 0) {
      user = userDb.rows[0];
    }
    for (let post of posts) {
      const data = await getMetaData(post.link);
      newPosts.push({
        ...post,
        title: data.title,
        description: data.description,
        image: data.image,
      });
    }
    res.send({ user, newPosts });
  } catch (error) {
    res.sendStatus(500);
    console.log("There's something wrong in postController: " + error);
  }
}

export async function updatePost(req, res) {
  const { postId: id } = req.params;
  const userId = res.locals.user;

  try {
    const post = await postRepository.getPostById(id);

    // check if post exists and if the owner is the logged user
    if (!post.rows[0]) {
      return res.status(404).send("Post not found");
    } else if (post.rows[0].userId !== userId) {
      return res.status(401).send("User isn't the owner of the post");
    }

    await postRepository.updatePost(id, req.body.text);

    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}
