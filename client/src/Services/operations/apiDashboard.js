import apiConnector from "../apiConnector";
import { ProfileEndpoints } from "../api";
import { toast } from "react-hot-toast";

const {UPDATE_USER_API, DASHBOARD_API, PLAYLIST_MODIFICATION } = ProfileEndpoints;

export function dashboard(creatorId,token){
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("DASHBOARD_API", DASHBOARD_API);
			const response = await apiConnector("POST",DASHBOARD_API,{creatorId,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);

			console.log(response.data);
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}


export function updateUser(userId, firstName, lastName, email, playListType, token){
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("UPDATE_USER_API", UPDATE_USER_API);
			const response = await apiConnector("POST",UPDATE_USER_API,{userId, firstName, lastName, email, playListType, token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);

			console.log(response.data);

			dispatch(setUser(JSON.stringify({ ...response.data.user,})));

			localStorage.setItem("user", JSON.stringify(response.data.user))
				
			toast.success('User Update Success.');
			setTimeout(()=>{
				navigate("/profile");
			},1000);
			toast.success('Welcome to Profile');
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}


export function playListModification(userId, imdbId, mode, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("PLAYLIST_MODIFICATION", PLAYLIST_MODIFICATION);
			const response = await apiConnector("PUT",PLAYLIST_MODIFICATION,{userId,imdbId,mode,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			console.log(response.data.saved);

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}
