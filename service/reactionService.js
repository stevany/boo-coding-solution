const reaction = require('../model/reaction');

async function findReaction(body) {
  const result = await reaction.find(body);
  return result;

}


async function createReaction(profileId, userId, body) {
  let reactionModel = new reaction(body);
  reactionModel.created_at = Date.now();
  reactionModel.updated_at = Date.now();
  await reactionModel.save();
  return reactionModel;

}

async function deleteReaction(id) {
  await reaction.deleteOne({_id: id})
  return true;

}




module.exports = {
  findReaction,
  createReaction,
  deleteReaction
}