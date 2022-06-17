import db from '../../config/db.js';

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
        if (!query.rows[0]) return res.status(200).send({isLiked: false});
        else return res.status(200).send({isLiked: true});

    } catch (e) {
        console.error('Could not check like post ' + e);
        return res.sendStatus(500);
    }

}