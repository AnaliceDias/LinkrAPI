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

async function getTimeline() {
  return db.query(
    `SELECT p.id AS id, p.text AS text, p.link AS link, u.name AS name 
    FROM posts p
    JOIN users u
    ON u.id=p."usersId"
    ORDER BY id DESC`)
}

const postRepository = {
  insertPost,
  getTimeline
};

export default postRepository;
