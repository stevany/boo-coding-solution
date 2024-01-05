const assert = require('assert')
const axios = require('axios')

const { Given, When, Then } = require('@cucumber/cucumber')
const URL='http://localhost:3000'

Given ('{word} is login', async function (word) {
  const url = `${URL}/profile/`;
  const username = word.toLowerCase();
  const profile =  await axios({
    url: url,
    method: 'post',
    data: {
      "name": word,
      "username": username,
      "password": "123",
      "description": "Adolph Larrue Martinez III.",
      "mbti": "INFJ",
      "enneagram": "2w3",
      "variant": "sp/so",
      "tritype": 725,
      "socionics": "SEE",
      "sloan": "RCOEN",
      "psyche": "FEVL"
}
  });
const login = await axios({method: 'post',
  url: `${URL}/login`,
  data: {
    "username": username,
    "password": "123"
  }
  });
  this.user = {
    ...this.user,
    [username]: {
      id: profile.data._id,
      token: login.data.token
    }
  }
});

When ('{word} edit profile name to {word}', async function (word, newName) {
  const profileUser = this.user[word.toLowerCase()];
  this.profileUser = profileUser;
  const url = `${URL}/profile/${profileUser.id}`;
  const username = word.toLowerCase();
  await axios({
    url: url,
    method: 'put',
    data: {
      "name": newName,
      "username": username,
      "password": "123",
      "description": `${newName} Larrue Martinez III.`,
      "mbti": "ENFJ",
      "enneagram": "2w3",
      "variant": "sp/so",
      "tritype": 725,
      "socionics": "SEE",
      "sloan": "RCOEN",
      "psyche": "FEVL"
    },
    headers: {
      "authorization": `Bearer ${profileUser.token}`
    }
  });

});

When ('{word} comment {word} profile', async function (user, profile) {
  const currentUser = this.user[user.toLowerCase()];
  const profileUser = this.user[profile.toLowerCase()];
  const comment = await axios({method: 'post',
  url: `${URL}/profile/${profileUser.id}/comment`,
    data: {
      "comment": "test comment1",
      "mbti": "ISTJ",
      "enneagram": "4w3"
    },
    headers: {
      "authorization": `Bearer ${currentUser.token}`
    }
  });
  this.commentId = comment.data._id;
  this.profileUser = profileUser;
});

When ('{word} edit comment', async function (user) {
  const currentUser = this.user[user.toLowerCase()];
  const comment = await axios({method: 'put',
  url: `${URL}/profile/${this.profileUser.id}/comment/${this.commentId}`,
    data: {
      "comment": "test comment1",
      "mbti": "ENTJ",
      "enneagram": "2w3"
    },
    headers: {
      "authorization": `Bearer ${currentUser.token}`
    }
  });
});

When ('{word} like it', async function (user) {
  const currentUser = this.user[user.toLowerCase()];
  const reaction = await axios({
    method: 'post',
    url: `${URL}/profile/${this.profileUser.id}/comment/${this.commentId}/react`,
    data: {
      "like": true
    },
    headers: {
      "authorization": `Bearer ${currentUser.token}`
    }
  });
  this.currentUser = currentUser;
});

Then ('comment like {int}', async function (like) {
  const comment = await axios({
    method: 'get',
    url: `${URL}/profile/${this.profileUser.id}/comment?sort=like`,
    headers: {
      "authorization": `Bearer ${this.profileUser.token}`
    }
  });
  const commentData = comment.data.find((comm) => comm._id == this.commentId);
  assert.equal(commentData.like, like)
});

Then ('{word} profile changed', async function (profile) {
  const comment = await axios({
    method: 'get',
    url: `${URL}/profile/${this.profileUser.id}/comment?sort=updatedAt`,
    headers: {
      "authorization": `Bearer ${this.profileUser.token}`
    }
  });
  assert.equal(comment.status, 200)
});