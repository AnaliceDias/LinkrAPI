import followRepository from "../repositories/followRepository.js";

export async function checkIsFollowing(req, res) {
  const { followId } = req.params;
  const userId = res.locals.user;

  try {
    let isFollowing = false;
    if (Number(userId) === Number(followId))
      return res.status(200).send({ isUser: true, isFollowing }); //se o usuario estiver na propria pagina

    const query = await followRepository.checkIsFollowing(userId, followId);
    if (query.rowCount > 0) isFollowing = true;
    return res.status(200).send({ isUser: false, isFollowing });
  } catch (e) {
    console.error("Could not check if user is following" + e);
    return res.sendStatus(500);
  }
}

export async function followUser(req, res) {
  const { followId } = req.params;
  const { isFollowing } = req.body;
  const userId = res.locals.user;

  try {
    if (isFollowing) {
      await followRepository.unfollowUser(userId, followId);
      return res.sendStatus(200);
    }

    await followRepository.followUser(userId, followId);
    return res.sendStatus(201);
  } catch (e) {
    console.error("Could not follow user " + e);
    return res.sendStatus(500);
  }
}

export async function getFollows(req, res) {
  const userId = res.locals.user;

  try {
    const follows = await followRepository.getFollowsByUserId(userId);

    const followsArr = [];
    for (let follow of follows.rows) {
      followsArr.push(follow.followId);
    }

    res.send(followsArr);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
