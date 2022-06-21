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

// async function insertHashtags(){}

async function insertRelPostHashtags(postId , hashtagId){
  // hashtagId = parseInt(hashtagId);
  // postId = string(postId);
  return(
    //hashtagIds.map(hashtagId => {
      db.query(`
        INSERT INTO "postHashtags" ("postId" , "hashtagId")
        VALUES ($1 , $2)` 
        , [postId.toString(), hashtagId])
   // })
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

const hashtagRepository = {
  getHashtags,
  insertRelPostHashtags,
  deleteHashtagHistoric
};

export default hashtagRepository;
