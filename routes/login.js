'use strict';

const express = require('express');
const {login} = require('../service/authService');
const router = express.Router();

module.exports = function() {
router.route('/login')
  .post(async (req, res)  => {
    let output = await login(req.body)
    res.status(200)
    if(!output.login){
      res.status(401)
    }
    res.json(output)

  });
 
  return router;
}

