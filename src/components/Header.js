import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {GiEagleHead} from 'react-icons/gi'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Header = () => {
  const [pageState, setPageState] = useState("Sign in")
  const location = useLocation()
  const auth = getAuth()
  useEffect(() => {
onAuthStateChanged(auth, (user) => {
  // if the user is authenticated set tle header to profile otherwise set it to sign in
  if(user){
    setPageState("Profile")
  }else{
    setPageState("Sign in")
  }
})
  }, [auth])
  // console.log(location)

  function matchRoute (route){
    if(route === location.pathname){
      return true
    }else{
      return false
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
       <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <Link to='/'>
        <div className='h-5 cursor-pointer flex items-center '><GiEagleHead className='text-3xl text-red-700'/> Hope Estate</div>
        </Link>
        
        <div className=''>
          <ul className='flex space-x-10'>
            <Link to='/'>
                 <li className={`py-3 text-sm font-semibold text-gray-400 border-b-transparent cursor-pointer ${matchRoute("/") && "text-blue-600"}`}>Home</li>
            </Link>

            <Link to='/offers'>
                 <li className={`py-3 text-sm font-semibold text-gray-400 border-b-transparent cursor-pointer ${matchRoute("/offers") && "text-blue-600"}`}>Offers</li>
            </Link>
            
            <Link to='profile'>
                <li className={`py-3 text-sm font-semibold text-gray-400 border-b-transparent cursor-pointer $({matchRoute("/sign-in") || matchRoute("/profile")) && "text-blue-600 border-b-black"}`}>{pageState}</li>
            </Link>
            
          </ul>
        </div>
       </header>
    </div>
  )
}

export default Header