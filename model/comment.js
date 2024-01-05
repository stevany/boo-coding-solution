var mongoose=require("mongoose");
const {MBTI, Enneagram, Zodiac} = require('../const/voteConstant')

//Create a schema
var commentSchema =new mongoose.Schema({
	id: Number,
    profileId: String,
    userId: String,
	comment: {type:String, required:true},
    mbti: {type:String, enum: MBTI, default: ''},
    enneagram: {type:String, enum: Enneagram, default: ''},
    zodiac: {type:String, enum: Zodiac},
    like: Number,
	createdAt:Date,
	updatedAt:Date,
})
//create model if not exists
module.exports=mongoose.model('comment', commentSchema);