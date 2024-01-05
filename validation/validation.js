const Validator = require("fastest-validator");
const {MBTI, Enneagram, Zodiac} = require('../const/voteConstant')

const v = new Validator();

async function profileValidation(body) {
  const schema = {
    name: { type: "string", min: 3, max: 255 },
    username: { type: "string", min: 3, max: 100 },
    password: { type: "string", min: 1, max: 10 },
    mbti: {type: "enum", values: MBTI, default: ''},
    enneagram: {type: "enum", values: Enneagram, default: ''},
    zodiac: {type: "enum", values: Zodiac, default: ''},
    tritype: {type: "number", nullable: true},
  };

  const check = v.compile(schema);
  return check(body);

}

async function commentValidation(body) {
  const schema = {
    comment: { type: "string", nullable: true },
    mbti: {type: "enum", values: MBTI, default: ''},
    enneagram: {type: "enum", values: Enneagram, default: ''},
    zodiac: {type: "enum", values: Zodiac, default: ''},
  };

  const check = v.compile(schema);
  return check(body);


}


module.exports = {
  profileValidation,
  commentValidation
}