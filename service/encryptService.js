const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

function generateAccessToken(userId, username) {
  return jwt.sign({id:userId, username }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
}

async function encryptPassword(text) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  return bcrypt.hash(text, salt);
}
async function comparePassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}


module.exports = {
  generateAccessToken,
  encryptPassword,
  comparePassword,
}