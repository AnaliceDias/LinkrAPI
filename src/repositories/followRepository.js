import db from "../../config/db.js";

async function checkIsFollowing(userId, followId) {
  return db.query(
    `
    SELECT * FROM follows
    WHERE follows."userId" = $1 AND follows."followId" = $2`,
    [userId, followId]
  );
}

async function followUser(userId, followId){
    return db.query(
        `
        INSERT INTO follows ("userId", "followId")
        VALUES ($1, $2)`,
        [userId, followId]
      );
}

async function unfollowUser(userId, followId){
    return db.query(
        `DELETE FROM follows WHERE "userId" = $1 AND "followId" = $2`,
        [userId, followId]
      );
}

const followRepository = {
    checkIsFollowing,
    followUser,
    unfollowUser
};

export default followRepository;
