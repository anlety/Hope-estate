import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation()
  // console.log(location)

  function matchRoute (route){
    if(route === location.pathname){
      return true
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
       <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <Link to='/'>
        <div className='h-5 cursor-pointer'>Hope Estate</div>
        </Link>
        
        <div className=''>
          <ul className='flex space-x-10'>
            <Link to='/'>
                 <li className={`py-3 text-sm font-semibold text-gray-400 border-b-transparent cursor-pointer ${matchRoute("/") && "text-blue-600"}`}>Home</li>
            </Link>

            <Link to='/offers'>
                 <li className={`py-3 text-sm font-semibold text-gray-400 border-b-transparent cursor-pointer ${matchRoute("/offers") && "text-blue-600"}`}>Offers</li>
            </Link>
            
            <Link to='sign-in'>
                <li className={`py-3 text-sm font-semibold text-gray-400 border-b-transparent cursor-pointer ${matchRoute("/sign-in") && "text-blue-600"}`}>Sign in</li>
            </Link>
            
          </ul>
        </div>
       </header>
    </div>
  )
}

export default Header