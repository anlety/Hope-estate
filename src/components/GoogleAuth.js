import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const GoogleAuth = () => {
  return (
    <button className='w-full flex items-center justify-center py-3 px-7 text-white bg-red-700 uppercase rounded font-medium text-sm hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg'><FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue with Google </button>
  )
}

export default GoogleAuth