var mongoose=require("mongoose");
const {MBTI, Enneagram} = require('../const/voteConstant')

//Create a schema
var profileSchema =new mongoose.Schema({
	id: Number,
	name: String,
    username:{type:String, required:true},
	password:{type:String, required:true},
	description: String,
	mbti: {type:String, enum: MBTI, required:true,},
	enneagram: {type:String, enum: Enneagram, default: ''},
	variant: String,
	tritype: Number,
	socionics: String,
	sloan: String,
	psyche: String,
    image: String,
	createdAt:Date,
	updatedAt:Date,
	
})
//create model if not exists
module.exports=mongoose.model('profile', profileSchema);