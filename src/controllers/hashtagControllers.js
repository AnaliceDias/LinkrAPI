import hashtagRepository from "../repositories/hashtagRepository.js";
import db from "../../config/db.js";

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

    if(hashtags.length === 0){
        next();
    }else{
        try{
            let verifiedHashtags = await hashtagRepository.getHashtags(hashtags);
            res.locals.hashtagsToCreate = verifiedHashtags.hashtagsToCreate;
            res.locals.hashtagIds = verifiedHashtags.hashtagIds;

            next();

        }catch(err){
            console.log(err);
            res.statusSend(404);
        }
    }
  }
  
export async function createHashtag(req, res, next){

    const {hashtags , hashtagsToCreate} = res.locals;

    if(hashtags.length === 0){
      next();
    }else{
      if(hashtagsToCreate.length !== 0){
        const newHashtagsIds = hashtagRepository.insertHashtags(hashtagsToCreate);

        newHashtagsIds.then(r => {
          console.log(r);

          //if(r === [] || r.[0] === 'erro')
          next();
        });

        newHashtagsIds.catch(err =>{
          console.log(err);
          res.statusSend(404);
        });
        
      }
    }
  }

  export async function relRegisterPostHashtags(req, res, next){

    const {hashtags , hashtagsToCreate} = res.locals;
  
    next();
    
  }