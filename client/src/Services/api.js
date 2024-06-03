// import dotenv from "dotenv";
// dotenv.config()
const BASE_URL = process.env.REACT_APP_BASE_URL

export const AuthEndpoints = {
	LOGIN_API:BASE_URL+'auth/login',
	SIGNUP_API:BASE_URL+'auth/signup',
	
	
};

export const ProfileEndpoints = {
	UPDATE_USER_API:BASE_URL+'auth/updateUser',
	DASHBOARD_API:BASE_URL+'auth/dashboard',

	PLAYLIST_MODIFICATION:BASE_URL+'auth/playListModification',
	
	
};


export const PublicEndpoints = {
	GET_USER_API:BASE_URL+'getUser/:id'
}
