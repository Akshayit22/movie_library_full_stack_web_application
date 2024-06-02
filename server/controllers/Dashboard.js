const User = require('../models/User');
const UserPlayList = require('../models/UserPlayList');

exports.dashboard = async (req, res) => {
	try {
		const { id, email } = req.user;
		const { creatorId } = req.body;
		console.log("In the dashboard controller", email);

		if (!creatorId) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		
		const userDetails = await User.findOne({ email });

		const creatorDetails = await User.findById({ _id:creatorId });

		var PlayList;

		if( creatorDetails.playListType == "Public" || creatorId == id){
			PlayList = await UserPlayList.findOne({user:creatorDetails._id});
		}
		else if (creatorDetails.playListType == "Private"){
			PlayList = "Private";
		}else{
			PlayList = "Private";
		}

		return res.status(200).json({
			success: true,
			userDetails,
			creatorDetails,
			PlayList,
			message: "Dashboard details fetched successfully",
		});


	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in Dashboard, Please try again.",
		});
	}
}

exports.playListModification = async(req, res) => {
	try{
		const { userId, imdbId, mode } = req.body;
		// const { id, email } = req.user;

		if (!imdbId || !mode) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		const userDetails = await User.findById({ _id:userId });

		var newPlayList;

		if(mode == "AddToPlayList"){
			newPlayList = await UserPlayList.findOneAndUpdate(
				{user:userDetails._id},
				{$push:{playList:imdbId}},
				{new:true}
			);
		}
		else if( mode == "RemoveFromPlayList"){
			newPlayList = await UserPlayList.findOneAndUpdate(
				{user:userDetails._id},
				{$pull:{playList:imdbId}},
				{new:true}
			);
		}

		return res.status(200).json({
			success: true,
			newPlayList,
			message: "Dashboard details fetched successfully",
		});

	}catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in playListModification, Please try again.",
		});
	}
}