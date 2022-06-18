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
        `SELECT * FROM "userLikes"         
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}

async function countLikes(postId){
    return db.query(
        `SELECT u.name FROM users u 
        JOIN "userLikes" ul ON u.id = ul."userId" 
        WHERE ul."postId" = $1;`,
        [postId]
    );
}

const likeRepository = {
    createLike,
    deleteLike,
    checkLike,
    countLikes
};

export default likeRepository;
