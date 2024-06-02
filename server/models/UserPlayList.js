const mongoose = require('mongoose');

const userPlayListSchema = new mongoose.Schema(
	{
		user:{
			type:mongoose.Schema.ObjectId,
			ref:"User",
			required:true,
		},
		playList:[{
			type:String,
		}]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('UserPlayList',userPlayListSchema);