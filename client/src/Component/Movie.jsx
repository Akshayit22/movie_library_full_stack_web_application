import React from 'react'

function Movie({ movie }) {
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 text-black">
			<img className="rounded-t-lg" src={movie.Poster} loading='lazy' alt="" height={150} width={300} />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{movie.Title}</h5>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.Year}</p>
			</div>
		</div>
	)
}

export default Movie