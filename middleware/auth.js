const jwt = require('jsonwebtoken');
const {findById} = require('../service/profileService');

async function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {

    if (err) return res.sendStatus(403)
    const userData = await findById(user.id);
    if(userData){
      req.user = user

      next()
    } else {
      return res.sendStatus(401)
    }
   
  })
}
module.exports = {
  authenticateToken,
}