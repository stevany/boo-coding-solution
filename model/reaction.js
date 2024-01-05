var mongoose=require("mongoose");

//Create a schema
var reactionSchema=new mongoose.Schema({
	id: Number,
    userId: String,
    commentId: String,
	like: Boolean,
	createdAt:Date,
	updatedAt:Date,
})
//create model if not exists
module.exports=mongoose.model('reaction', reactionSchema);