import db from "../../config/db.js";

function addComment(userId, postId, text) {
  return db.query(
    `
      INSERT INTO comments ("userId", "postId", text) 
      VALUES ($1, $2, $3)
  
  `,
    [userId, postId, text]
  );
}

function getCommentsByPostId(postId) {
  return db.query(
    `
    SELECT c."userId", u.name AS username, c.text, u.picture AS avatar FROM comments c
    JOIN users u ON u.id = c."userId"
    WHERE c."postId" = $1
    ORDER by c."createdAt" DESC
  `,
    [postId]
  );
}

const commentRepository = {
  addComment,
  getCommentsByPostId
};

export default commentRepository;
