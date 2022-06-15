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

const postRepository = {
  insertPost
};

export default postRepository;
