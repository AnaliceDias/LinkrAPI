import db from "../../config/db.js";

async function getHashtags(hashtags) {
  let hashtagWhere = [];
  let query = `SELECT * FROM hashtags WHERE `;
  let hashtagsExisting = [];

  if (hashtags.length !== 0) {
    hashtags.map(hashtag => {
      hashtagWhere.push(`name='${hashtag}'`);
    });
    hashtagWhere = hashtagWhere.join(" or ");

    query = query + hashtagWhere;

    try {
      const reqHashtags = await db.query(query);
      console.log();

      // reqHashtags.map(hashtag => {
      //     //hashtagsExisting.push({hashtagId: hashtag.id, name: hashtag.name});
      //     console.log(hashtag)
      // })
      //console.log(hashtagsExisting);
    } catch (err) {
      console.log(err);
    }

    //res.locals.hashtagsToCreate
  }
  return;
}

function deleteHashtagHistoric(postId) {
  return db.query(
    `
    DELETE FROM "postHashtags" WHERE "postId" = $1
  `,
    [postId]
  );
}

const hashtagRepository = {
  getHashtags,
  deleteHashtagHistoric
};

export default hashtagRepository;
