import userRepository from '../repositories/userRepository.js';
import likeRepository from '../repositories/likeRepository.js';

export async function likePost(req, res) {
    const { postId, isLiked} = req.body;
    const userId = res.locals.user;

    try {        
        if (isLiked) {
            await likeRepository.deleteLike(userId, postId);
            return res.sendStatus(200);
        }

        await likeRepository.createLike(userId, postId);
        return res.sendStatus(201);
    } catch (e) {
        console.error('Could not like post ' + e);
        return res.sendStatus(500);
    }
}

export async function checkPostIsLiked(req, res){
    const { postId } = req.params;
    const userId = res.locals.user;

    try {
        const query = await likeRepository.checkLike(userId, postId);
        const username = await userRepository.getUserName(userId);
        
        if (!query.rows[0]) return res.status(200).send({username:username.rows[0].name, isLiked: false});
        else return res.status(200).send({username:username.rows[0].name, isLiked: true});

    } catch (e) {
        console.error('Could not check like post ' + e);
        return res.sendStatus(500);
    }

}

export async function getLikeCount(req, res){
    const { postId } = req.params;
    try {
        const query = await likeRepository.countLikes(postId);
        let users =  query.rows.map((e)=> e.name);       
        return res.status(200).send({usersLiked: users});       

    } catch (e) {
        console.error('Could not get count of likes' + e);
        return res.sendStatus(500);
    }
}