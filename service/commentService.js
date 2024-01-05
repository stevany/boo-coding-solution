const comment = require('../model/comment');
const reaction = require('../model/reaction');
const reactionService = require('../service/reactionService');
const {commentValidation} = require('../validation/validation');

async function findComment(body, userId, sort) {
  const commentModel = await comment.find(body).sort(sort);
  let result = commentModel;
  for await(const commentData of commentModel) {
    const reactionModel = await reactionService.findReaction({commentId: commentData._id, userId: userId});
    let reactionData = null;
    if(reactionModel.length > 0) {
      reactionData = reactionModel[0];
      const indexExist = result.findIndex((comm) => comm._id == reactionData.commentId);
      if(indexExist > -1){
        result[indexExist]= {
          ...result[indexExist]._doc,
          reaction: reactionData,
        }
      }
     
    }
    
  }
  return result;

}
async function findCommentById(id) {
  const commentModel = await comment.findById(id)
 
  return commentModel;

}

async function createComment(body, profileId, userId) {
  let commentModel = new comment(body);
  commentModel.profileId = profileId;
  commentModel.userId = userId;
  commentModel.like=0;
  commentModel.createdAt = Date.now();
  commentModel.updatedAt = Date.now();
  const isValid = await commentValidation(commentModel);
  if(isValid.length > 0) {
    return {
      status: 500,
      data: isValid,
    }
  }
  await commentModel.save();
 
  return {
    status: 200,
    data: commentModel,
  }

}

async function updateComment(id, userId, body) {
  let commentModel = await findCommentById(id);
  if(!commentModel){
    return { status: 200, data: "Comment not found!"}
  } else {
    commentModel.comment = body.comment;
    commentModel.mbti = body.mbti;
    commentModel.enneagram = body.enneagram;
    commentModel.zodiac = body.zodiac;
    commentModel.updated_at = Date.now();
    await commentModel.save();
    return {
      status: 200,
      data: commentModel,
    }
  }


}

async function updateCommentLike(id, userId, like) {
  const currentDate = Date.now();
    let commentModel = await findCommentById(id);

    let reactionModel = await reactionService.findReaction({commentId: id, userId: userId});
    let reactionData;
    if(!reactionModel.length){//check if reaction exist
      if(like) {//if like, then set reaction data to store else doing nothing
        reactionData =  new reaction({
          userId: userId,
          commentId: commentModel._id,
          like: like,
          createdAt: currentDate,
          updatedAt: currentDate,
        });
      }
    } else {
      if(like != reactionModel[0].like) {//reaction exist, check if like value is different with user request set reactionData, else doing nothing
        reactionData = reactionModel[0];
        reactionData.like = like;
      }
    }
   
    if(!commentModel){
      return {
        status: 500,
        data: "Comment not found!"
      }
    } else if(reactionData) {//only update totalLike in comment and reaction data if reactionData is set
      commentModel.like = like ? commentModel.like + 1: commentModel.like - 1;
      commentModel.updatedAt = Date.now();
      if(!like){
        await Promise.all([reactionService.deleteReaction(reactionData._id), commentModel.save()]);
      } else {
        reactionData.like = like;
        await Promise.all([commentModel.save(), reactionData.save()]);
      }
      
      return {
        status: 200,
        data: reactionData
      }
  
    }
    return {
      status: 200,
      data: ''
    }
  
  
  }

module.exports = {
  findComment,
  createComment,
  updateComment,
  updateCommentLike
}