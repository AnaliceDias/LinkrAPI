import postRepository from "../repositories/postRepository.js";
import getMetaData from "metadata-scraper";


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

export async function getTimeline (req, res) {
  try{
      const postsDB = await postRepository.getTimeline();
      const posts = postsDB.rows;

      const limitPostNumber = 20;
      const limitPosts = [];

      if(posts.length > limitPostNumber) {
          for(let i = 0; i < limitPostNumber; i++) {
              limitPosts.push(posts[i]);
          }
      }

      const allPosts = limitPosts.map(async post => {
        const data = await getMetaData(post.link);

        const newPost = {
          name: post.name,
          link: post.link,
          coment: post.text,
          title: data.title,
          description: data.description,
          image: data.image
        }

        return(newPost)
      })

      res.send(allPosts);
  }catch (error){
      res.sendStatus(500);
      console.log("There's something wrong in postController: " + error);
  }
}