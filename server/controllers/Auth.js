const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require('../models/User');
const UserPlayList = require('../models/UserPlayList');

/*
{
	"firstName":"Telang",
	"lastName":"Akshay",
	"image":"https://api.dicebear.com/5.x/initials/svg?seed=TA",
	"playListType":"Private",
	"email":"akshaytelang395@gmail.com",
	"password":"12345"
}
*/

exports.signup = async (req, res) => {
	try {
		const { firstName, lastName, email, playListType, password } = req.body;
		console.log("In the Sign up controller", req.body);

		if (!firstName || !lastName || !email || !password || !playListType) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		const HashedPassword = await bcrypt.hash(password, 10);

		const image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;


		const user = await User.create({
			firstName, lastName, email, image, playListType:playListType,
			password: HashedPassword,
		});

		const newUserPlayList = await UserPlayList.create({
			user:user._id,
		})

		return res.status(200).json({
			success: true,
			user,newUserPlayList,
			message: "User registered successfully",
		});

	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User not registered. Please try again.",
		});
	}
}

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log("In the Login controller", req.body);

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		if (await bcrypt.compare(password, user.password)) {
			var token = jwt.sign({ email: user.email, id: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: '3h', }
			);
			
			user.token = token;
			user.password = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

			return res.cookie('token', token, options).status(200).json({
				success: true,
				token,
				user,
				message: 'User Login Success',
			})

		}
		else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be Logged In. Please try again.",
		});
	}
}



exports.updateUser = async (req, res) => {
	try {
		const { userId, firstName, lastName, email, playListType } = req.body;
		console.log("In the updateUser controller", req.body);

		if (!userId || !firstName || !lastName || !email || !playListType) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		

		const user = await User.findByIdAndUpdate({_id:userId},
			{ firstName, lastName, email, playListType },
			{new:true},
		);


		return res.status(200).json({
			success: true,
			user,
			message: "User updated successfully",
		});

	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User not updated. Please try again.",
		});
	}
}