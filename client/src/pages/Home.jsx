import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Spinner from '../Component/Commen/Spinner';
import { FaSearch } from 'react-icons/fa';
import Movie from '../Component/Movie';

const Home = () => {

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const [searchFilter, setSearchFilter] = useState('War');

	const API_URL = "http://www.omdbapi.com/?";
	const API_KEY = "apikey=5a2a8758";

	const [page, setPage] = useState(1);
	var URL = API_URL + `s=${searchFilter}&${API_KEY}&page=${page}`;


	async function fetchProductsData() {
		setLoading(true);
		console.log(URL);
		try {
			const resp = await fetch(URL);
			const resp_json = await resp.json();
			setData(resp_json.Search);
			console.log(resp_json.Search);
			console.log(data);

		} catch (error) {
			console.log("something went wrong");
		}

		setLoading(false);
	}

	async function moreHandler() {
		if (page == 1) {
			setPage(2);
		} else {
			setPage(page + 1);
		}

		console.log(page, URL);
		const resp = await fetch(URL);
		const resp_json = await resp.json();
		setData([...data, ...resp_json.Search]);
		console.log(data);
	}

	async function formSubmit(){
		event.preventDefault();
		setSearchFilter(search);
		
	}

	useEffect(() => {
		fetchProductsData();
	}, [searchFilter]);


	return (
		<div className='min-h-screen mt-10'>
			{

				loading ? <Spinner></Spinner>
					:
					<div className='w-full flex flex-col items-center'>
						<form className=" mx-auto max-w-xl py-1 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300" onSubmit={formSubmit}>
							<input type="text" placeholder="Search items" onChange={(e) => setSearch(e.target.value)}
								className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="search"></input>
							<button type="submit" className="flex flex-row items-center justify-center min-w-[30px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-slate-900 text-black font-medium tracking-wide border-transparent py-1.5 h-[35px] -mr-3 bg-richblack-600" >
								<FaSearch />
							</button>
						</form>



						{
							data?.length > 0 ?
								(
									<div className='w-fit h-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>



										{
											data.map((movie, index) => (
												<Movie key={index} movie={movie}></Movie>
											))
										}
									</div>
								) :
								(
									<div><p>No</p>
									</div>
								)
						}

						<button onClick={() => moreHandler()} className='px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg justify-center m-3'>
							Load more</button>

					</div>

			}


		</div>
	)
}

export default Home;