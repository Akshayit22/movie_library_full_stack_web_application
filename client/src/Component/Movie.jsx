import React from 'react';
import { addPlayList, removePlayList } from '../redux/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import toast from 'react-hot-toast';
import { playListModification } from '../Services/operations/apiDashboard';


function Movie({ movie }) {

		const dispatch = useDispatch();
		const { playList} = useSelector((s) => s.profile);
		var {user} = useSelector((s)=>s.profile);
		const { token } = useSelector((s) => s.auth);
		user = JSON.parse(user);

		
		return (
			<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 text-black">
				<img className="rounded-t-lg" src={movie.Poster} loading='lazy' alt="" height={150} width={300} />
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{movie.Title}</h5>
					<div className='flex flex-row justify-between'>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.Year}</p>

						{
							playList.some((p) => p.imdbID == movie.imdbID) ?
								(
									<div>
										<MdOutlinePlaylistRemove className='text-3xl hover:cursor-pointer'
											onClick={() => {
												dispatch(removePlayList(movie));
												dispatch(playListModification(user._id, movie.imdbID, "RemoveFromPlayList", token));
												toast.success("Movie added to watch list");
											}} />
									</div>
								)
								:
								(
									<MdOutlinePlaylistAdd className='text-3xl hover:cursor-pointer'
										onClick={() => {
											dispatch(addPlayList(movie));
											dispatch(playListModification(user._id, movie.imdbID, "AddToPlayList", token));
											toast.success("Movie added to watch list");
										}} />
								)

						}
					</div>
				</div>
			</div>
		)
	}

export default Movie