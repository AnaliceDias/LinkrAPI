import repostRepository from "../repositories/repostRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function repostPost(req, res) {
    const { postId } = req.body;
    const userId = res.locals.user;
    try {     
        await repostRepository.createRepost(userId, postId);
        return res.sendStatus(201);
    } catch (e) {
        console.error('Could not repost post ' + e);
        return res.sendStatus(500);
    }
}

export async function getRepostCount(req, res){
    const { postId } = req.params;
    try {
        const query = await repostRepository.countReposts(postId);
        return res.status(200).send({repostsCount: query.rows[0].count});       

    } catch (e) {
        console.error('Could not get count of reposts' + e);
        return res.sendStatus(500);
    }
}

export async function getUserReposted(req, res){
    const { userId } = req.params;
    try {
        const query = await userRepository.getUserById(userId);
        return res.status(200).send({name: query.rows[0].name});       

    } catch (e) {
        console.error('Could not get user reposted' + e);
        return res.sendStatus(500);
    }
}