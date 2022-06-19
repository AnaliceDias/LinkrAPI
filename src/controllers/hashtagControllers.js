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
    const hashtags = res.locals.hashtags;
    const {hashtagsToCreate} = res.locals;

    hashtagRepository.insertHashtags(hashtagsToCreate);

    if(hashtags.length === 0){
      next();
    }else{
      //inserir no banco as hashtags novas
      //solicitar ao banco od das novas hashtags
      // adicionar esses ids na lista dos ids de hashtags
      
      next();
    }
  }