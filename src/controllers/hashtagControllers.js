import hashtagRepository from "../repositories/hashtagRepository.js";
import db from "../../config/db.js";

export async function identifyHashtags(req, res, next) {
  let texto = req.body.text.split(" ");
  let hashtags = [];
  let hashtag;
  texto.map((t) => {
    if (t.length !== 1 && t[0] === "#") {
      hashtag = t.split("#")[1];
      hashtags.push(hashtag);
    }
  });

  res.locals.hashtags = hashtags;

  next();
}

export async function verifyHashtags(req, res, next) {
  const hashtags = res.locals.hashtags;

  if (hashtags.length === 0) {
    next();
  } else {
    try {
      let verifiedHashtags = await hashtagRepository.getHashtags(hashtags);
      res.locals.hashtagsToCreate = verifiedHashtags.hashtagsToCreate;
      res.locals.hashtagIds = verifiedHashtags.hashtagIds;

      next();
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
}

export async function createHashtag(req, res, next) {
  const { hashtags, hashtagsToCreate } = res.locals;

  if (hashtags.length === 0) {
    next();
  } else {
    if (hashtagsToCreate.length !== 0) {
      let contador = 0;

      hashtagsToCreate.map((hashtag) => {
        const newHashtag = db.query(
          `
           INSERT INTO hashtags (name)
           VALUES ($1)`,
          [hashtag]
        );

        newHashtag.then(() => {
          contador++;

          if (contador === hashtagsToCreate.length) {
            const newHashtagsIds = hashtagRepository.getHashtags(hashtagsToCreate);

            newHashtagsIds.then((r) => {
              res.locals.hashtagIds = [...res.locals.hashtagIds, ...r.hashtagIds];

              next();
            });
            newHashtagsIds.catch((err) => {
              console.log(err);
              res.sendStatus(404);
            });
          }
        });
        newHashtag.catch((err) => {
          console.log(err);
          res.sendStatus(404);
        });
      });
    }
  }
}

// export async function createHashtag(req, res, next){}

export async function relRegisterPostHashtags(req, res) {
  const { postId, hashtagIds } = res.locals;

  try {
    hashtagIds.map((hashtagId) => {
      const newRelPostHashtag = hashtagRepository.insertRelPostHashtags(postId, hashtagId);
    });
    res.status(201).send("Post publicado com sucesso.");
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}
