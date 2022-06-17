import hashtagRepository from "../repositories/hashtagRepository.js";

export async function identifyHashtags(req, res, next){
    let texto = req.body.text.split(' ');
    let hashtags = [];
    let hashtag;
    texto.map(t => {
      if(t.length !== 1 && t[0] === "#"){
        hashtag = t.split('#')[1];
        hashtags.push(hashtag);
      }
    });
    res.locals.hashtags = hashtags;
    next();
    
  }
  
export async function verifyHashtags(req, res, next){
    const hashtags = res.locals.hashtags;
    hashtagRepository.getHashtags(hashtags);

    // let hashtagWhere = [];
    // let query = `SELECT * FROM hashtags WHERE `
    
    if(hashtags.length === 0){
      next();
    }else{
    //   hashtags.map(hashtag => {
    //     hashtagWhere.push(`name='${hashtag}'`);
    //   });
    //   hashtagWhere = hashtagWhere.join(' or ');
      
    //   query = query + hashtagWhere;
    //   console.log(query)
      //res.locals.hashtagsToCreate
      
      next();
    }
  }
  
export async function createHashtag(req, res, next){
    const hashtags = res.locals.hashtags;
  
    if(hashtags.length === 0){
      next();
    }else{
      
      next();
    }
  }