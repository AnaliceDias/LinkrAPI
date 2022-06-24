import db from "../../config/db.js";

async function createRepost(userId, postId) {
  return db.query(
    `
    INSERT INTO "userReposts" ("userId", "postId")
    VALUES ($1, $2)`,
    [userId, postId]
  );
}

async function countReposts(postId) {
  return db.query(
    `SELECT COUNT(u.id) FROM users u 
    JOIN "userReposts" ul ON u.id = ul."userId" 
    WHERE ul."postId" = $1`,
    [postId]
  );
}

const repostRepository = {
    createRepost,
    countReposts,
};

export default repostRepository;
