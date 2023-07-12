import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const [formdata, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formdata

  function onLogout(){
    auth.signOut()
    navigate("/")
  }
  return (
    <>
    <section className='max-w-6xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          <input  type='text' id='name' value={name} disabled className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>
          <input  type='email' id='email' value={email} disabled className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your name? <span className='text-red-600 hover:text-red-700 ml-1 transition ease-in-out duration-200 cursor-pointer'> Edit</span></p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign out</p>
          </div>
        </form>
      </div>
      
    </section>
    </>
  )
}

export default Profile