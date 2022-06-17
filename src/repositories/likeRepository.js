import db from '../../config/db.js';

async function createLike(userId, postId) {
    return db.query(
        `
    INSERT INTO "userLikes" ("userId", "postId")
    VALUES ($1, $2)`,
        [userId, postId]
    );
}

async function deleteLike(userId, postId) {
    return db.query(
        `DELETE FROM "userLikes" WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}

async function checkLike(userId, postId) {
    return db.query(
        `SELECT * FROM "userLikes" WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}

const likeRepository = {
    createLike,
    deleteLike,
    checkLike
};

export default likeRepository;
