import db from "../../config/db.js";

async function getHashtags(hashtags){
    let hashtagWhere = [];
    let query = `SELECT * FROM hashtags WHERE `;
    let hashtagsExisting = {hashtagIds: [], names: []};
    let hashtagsToCreate = [];
    
    if(hashtags.length !== 0){
      hashtags.map(hashtag => {
        hashtagWhere.push(`name='${hashtag}'`);
      });

      hashtagWhere = hashtagWhere.join(' or ');
      query = query + hashtagWhere;
  
      try {
        const reqHashtags = await db.query(query);
        
        reqHashtags.rows.map(hashtag => {
            hashtagsExisting.hashtagIds.push(hashtag.id);
            hashtagsExisting.names.push(hashtag.name);
        });
        hashtags.map(hashtag =>{
            if(hashtagsExisting.names.includes(hashtag) ){}
            else{
                hashtagsToCreate.push(hashtag);
            }
        });

        return {
            hashtagsToCreate: hashtagsToCreate,
            hashtagIds: hashtagsExisting.hashtagIds
        };

      }catch(err){
        console.log(err);
        return [];
      }
    }
}

async function insertRelPostHashtags(postId , hashtagId){

  return(
      db.query(`
        INSERT INTO "postHashtags" ("postId" , "hashtagId")
        VALUES ($1 , $2)` 
        , [postId.toString(), hashtagId])
  )

}

async function getPostsWithHashtag(hashtagName){
  return (
    db.query(`
    SELECT posts.id , posts.text , posts.link,  users.name,  users.picture  , posts."userId" , hashtags.name as title
    FROM posts
    JOIN "postHashtags"
    ON "postId" = posts.id
    JOIN users
    ON posts."userId" = users.id
    JOIN hashtags
    ON "hashtagId" = hashtags.id
    WHERE hashtags.name = $1
    ORDER BY posts."createdAt" DESC
    `, [hashtagName])
  )
}

function deleteHashtagHistoric(postId) {
  return db.query(
    `
    DELETE FROM "postHashtags" WHERE "postId" = $1
  `,
    [postId]
  );
} 

async function getHashtagTrending(){
  return(
    db.query(`
    SELECT hashtags.name as "hashtagName", hashtags.id FROM "postHashtags"
    JOIN hashtags
    ON "postHashtags"."hashtagId" = hashtags.id
    JOIN posts
    ON "postHashtags"."postId" = posts.id
    GROUP BY  hashtags.name, hashtags.id
    ORDER BY count("postHashtags"."hashtagId") desc
    LIMIT 10`)
  )
}

const hashtagRepository = {
  getHashtags,
  insertRelPostHashtags,
  getPostsWithHashtag,
  deleteHashtagHistoric,
  getHashtagTrending
};

export default hashtagRepository;
