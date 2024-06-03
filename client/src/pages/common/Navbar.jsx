// import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { logout } from '../../Services/operations/apiAuth';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Navbar = () => {

    const Navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	let [open, setOpen] = useState(false);

	var {user} = useSelector((state) => state.profile);
	var user = user?JSON.parse(user):null;
	const [getstarted, setGetStarted] = useState(true);
	

	const logoutFunc = () =>{
		dispatch(logout());
		Navigate('/');
	}
	
	useEffect(()=>{
		setOpen(false);
		if(user != null){
			setGetStarted(false);
		}else{
			setGetStarted(true);
		}
	},[location]);



    return (
        <div className="">
            <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto gap-2 shadow-md">

                <NavLink to="/">
                    <div className="md:ml-5 ml-2" >
                        <img src={logo} alt="logo" height={100} width={150} />
                    </div>
                </NavLink>

                <div className="flex items-center font-medium text-slate-100 mr-5 md:space-x-6 space-x-1">

                    <NavLink to="/">
                        <p className="text-xl">Home</p>
                    </NavLink>

                    
                    <NavLink to="/profile">
                        <div className="relative">
                            
                            <p className="text-xl">Profile & Watch-List</p>

                            {/* {
                                cart.length > 0 &&
                                (<span className="absolute -top-1 -right-2 bg-green-600 text-x5 w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">

                                    {cart.length}</span>)
                            } */}
                        </div>
                    </NavLink>

                    {
						getstarted==true?
						(<button onClick={()=> Navigate('/user-auth')} className='btn bg-richblack-900 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static' >Get Started</button>)
						:(<button onClick={()=>logoutFunc()} className='btn bg-richblack-900 text-white md:ml-8 font-semibold px-3 py-1 rounded  duration-500 hover:bg-richblack-700 md:static' >Log Out</button>)
					}

                </div>

            </nav>
        </div>


    )
};

export default Navbar;