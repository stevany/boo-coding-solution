// export const VoteOptions = {
//   MBTI: 'MBTI',
//   ENNEAGRAM: 'Enneagram',
//   ZODIAC: 'Zodiac'
// };
// export const MBTI = {
//   INFP: 'INFP',
//   INFJ: 'INFJ',
//   ENFP: 'ENFP',
//   ENFJ: 'ENFJ',
//   INTJ: 'INTJ',
//   INTP: 'INTP',
//   ENTP: 'ENTP',
//   ENTJ: 'ENTJ',
//   ISFP: 'ISFP',
//   ISFJ: 'ISFJ',
//   ESFP: 'ESFP',
//   ESFJ: 'ESFJ',
//   ISTP: 'ISTP',
//   ISTJ: 'ISTJ',
//   ESTP: 'ESTP',
//   ESTJ: 'ESTJ',
// }

// export const Enneagram = {
//   ONE_W_TWO: '1w2',
//   TWO_W_THREE: '2w3',
//   THREE_W_FOUR: '3w4',
//   FOUR_W_THREE: '4w3',
//   FOUR_W_FIVE: '4w5',
//   FIVE_W_FOUR: '5w4',
//   FIVE_W_SIX: '5w6',
//   SIX_W_FIVE: '6w5',
//   SIX_W_SEVEN: '6w7',
//   SEVEN_W_SIX: '7w6',

// }
const VoteOptions = [ 'MBTI', 'Enneagram','Zodiac'];
const MBTI = ['','INFP', 'INFJ', 'ENFP', 'ENFJ','INTJ',
'INTP',
'ENTP',
'ENTJ',
'ISFP',
'ISFJ',
'ESFP','ESFJ',
'ISTP',
'ISTJ',
'ESTP',
'ESTJ',
];
const Enneagram = [
  '','1w2','2w3', '3w4','4w3','4w5','5w4', '5w6','6w5','6w7','7w6','7w8','8w7','8w9','9w8','9w1',

];

const Zodiac = ['','Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagitarius', 'Capricorn', 'Aquarius', 'Pisces']
module.exports= {MBTI, Enneagram, Zodiac}