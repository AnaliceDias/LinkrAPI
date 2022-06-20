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

const hashtagRepository = {
  getHashtags,
  //deleteHashtagHistoric
};

export default hashtagRepository;