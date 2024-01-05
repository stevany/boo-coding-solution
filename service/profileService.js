const profile = require('../model/profile');
const {encryptPassword} = require('./encryptService')
const {profileValidation} = require('../validation/validation');
async function find(body) {
  const result = await profile.find(body);
  return result;

}

async function findById(id) {
  const result = await profile.findById(id);
  return result;

}

async function create(body) {
  const isValid = await profileValidation(body);
  if(isValid.length > 0) {
    return {
      status: 500,
      data: isValid,
    }
  }
  body.password = await encryptPassword(body.password);
  body.image = body.image || 'https://soulverse.boo.world/images/1.png';
  let profileModel = new profile(body);
  profileModel.createdAt = Date.now();
  profileModel.updatedAt = Date.now();
  await profileModel.save();
  profileModel.password=''
  return {
    status: 200,
    data: profileModel,
  }

}

async function update(id, body) {
  let profileModel = await findById(id);
  if(!profileModel){
    return {
      status: 500,
      data: "Profile not found!"
    }
  } else {
    profileModel.name = body.name;
    profileModel.password = body.password;
    profileModel.updatedAt = Date.now();
    await profileModel.save();
    return {
      status: 200,
      data: profileModel
    }

  }


}

module.exports = {
  find,
  findById,
  create,
  update
}