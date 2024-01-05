const {find} = require('./profileService')

const {comparePassword, generateAccessToken} = require('./encryptService')

async function login(body) {
  const request = {username: body.username};
  const userModel = await find(request)
  let isValidPassword = false;
  if(userModel.length > 0) {
    isValidPassword = await comparePassword(body.password, userModel[0].password);
    if(isValidPassword){
      return {
        login: isValidPassword,
        token: generateAccessToken(userModel[0]._id, body.username),
      }
    }
  
  }
  
  return {login: isValidPassword };
}

module.exports = {
  login,
}