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

async function getTimeline() {
  return db.query(
    `SELECT p.id AS id, p.text AS text, p.link AS link, u.name AS name 
    FROM posts p
    JOIN users u
    ON u.id=p."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20`
  );
}

const postRepository = {
  insertPost,
  getPostById,
  deletePost,
  getTimeline
};

export default postRepository;
