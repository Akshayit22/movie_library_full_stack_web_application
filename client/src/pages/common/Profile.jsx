import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import Spinner from '../../Component/Commen/Spinner';
import {dashboard} from '../../Services/operations/apiDashboard';

function Profile() {

	var { user } = useSelector((state) => state.profile);
	var user = user ? JSON.parse(user) : null;
	const {token} = useSelector((s)=> s.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(user);
		dispatch(dashboard(user._id,token));
		console.log();
	}, []);


	return (
		<div classNameName='min-h-screen'>
			{
				user ?
					(
						<div className='flex justify-center p-5'>
							<div className="w-96 px-6 py-6  text-center bg-richblack-700 rounded-lg lg:mt-0 xl:px-10">
								<div className="space-y-4 xl:space-y-6">
									<img className="mx-auto rounded-full h-36 w-36" src={user.image} loading='lazy' alt="avatar"></img>
									<div className="space-y-2">
										<div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
											<h3 className="text-white">{user.firstName + " " + user.lastName}</h3>
											<p className="text-white">{user.email}</p>
											<p className="text-richblack-300 justify-center">{"Movie Watch-List "}<span className='text-white flex flex-row justify-between'>{user.playListType + " "} <CiEdit className='text-2xl text-white hover:cursor-pointer'/></span></p>

										</div>
									</div>
								</div>
							</div>
						</div>
					) :
					(
						<div>
							<p>User Details Not Found.</p>
						</div>
					)
			}

			<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

			<div className='p-3'>
				<p className='text-2xl'>Movie Watch List </p>
			</div>

			{user?.playListType == "Private" &&
				(
					<div>
						<p className='text-2xl text-center'>Private</p>
					</div>
				)}

			{user?.playListType == "Public" &&
				(
					<div>
						<p className='text-2xl text-center'>Public</p>
					</div>
				)}

		</div>
	)
}

export default Profile;