import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/common/Profile';
import PrivateRoute from './Component/Auth/PrivateRoute';
import OpenRoute from './Component/Auth/OpenRoute';
import GetStarted from './pages/GetStarted';
import Navbar from './pages/common/Navbar';
import Footer from './pages/common/Footer';


function App() {

  return (
    <div className=' lg:w-[98.9vw]  min-h-screen bg-gradient-to-r  flex flex-col'>

      <div className=''>
          <Navbar></Navbar>
      </div>

      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/user-auth' element={<GetStarted ></GetStarted>}></Route>

        <Route path='/home' element={<Home></Home>}></Route>

        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        <Route path='*' element={<h1 className='min-h-screen flex justify-center center text-3xl '>Page Not Found 404</h1>}></Route>
      </Routes>


      <Footer></Footer>
    </div>
  )
}

export default App;
