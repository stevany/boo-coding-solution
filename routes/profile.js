'use strict';

const express = require('express');
const {findById, create, update} = require('../service/profileService');
const {findComment, createComment, updateComment, updateCommentLike} = require('../service/commentService');
const {authenticateToken} = require('../middleware/auth');
const router = express.Router();


module.exports = function() {
  router.route('/profile')
    .post(async (req, res)  => {
      let output = await create(req.body)
        res.status(output.status);
        res.json(output.data);

    });

  router.route('/profile/:id')
    .get( async (req, res) => {    
      let output = await findById(req.params.id);
      res.render('profile_template', {
            profile: output,
          });
    })
    .put(authenticateToken, async (req, res) => {
      let output = await update(req.params.id, req.body)
      res.status(output.status);
      res.json(output.data);
    });
  //create comment with profile id
  router.route('/profile/:id/comment')
    .get(authenticateToken, async (req, res) => {    
      const {id} = req.params;
      const request = {profileId: id};
      const requestSort = {[req.query.sort]: -1};
      let output = await findComment(request, req.user.id, requestSort);
      res.json(output)

    })
    .post(authenticateToken, async(req, res) => {
      let output = await createComment(req.body,  req.params.id, req.user.id)
      res.status(output.status);
      res.json(output.data);
  });

  router.route('/profile/:id/comment/:commentId')
    .put(authenticateToken, async (req, res) => {    
      const {id, commentId} = req.params;
      let output = await updateComment(commentId, req.user.id, req.body);
      res.status(output.status);
      res.json(output.data);

    });
    router.route('/profile/:id/comment/:commentId/react')
    .post(authenticateToken, async (req, res) => {    
      const {id, commentId} = req.params;
      let output = await updateCommentLike(commentId, req.user.id, req.body.like);
      res.status(output.status);
      res.json(output.data);

    })
  

  return router;
}

