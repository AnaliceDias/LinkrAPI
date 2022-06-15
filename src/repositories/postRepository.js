import db from "../../config/db.js";

async function insertPost(text, link, userId) {
  return db.query(
    `
    INSERT INTO posts (text, link, "userId") 
    VALUES ($1, $2, $3)
  `,
    [text, link, userId]
  );
}

async function getPostById(postId) {
  return db.query(
    `
    SELECT * FROM posts
    WHERE id = $1
  
  `,
    [postId]
  );
}

async function deletePost(postId) {
  return db.query(
    `
    DELETE FROM posts
    WHERE id = $1
  `,
    [postId]
  );
}

const postRepository = {
  insertPost,
  getPostById,
  deletePost
};

export default postRepository;
