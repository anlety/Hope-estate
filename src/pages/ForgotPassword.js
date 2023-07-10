import React, { useState } from 'react'
import GoogleAuth from '../components/GoogleAuth';

import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  

  

  function onChange(e){
    // console.log(e.target.value)
    setEmail(e.target.value)
  }
  return (
    <section>
    <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
    <div className=''>

      <div className='w-[70%] justify-center items-center px-6 py-12 max-w-6xl mx-auto'>
        <form>
       

          <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white mb-6 border-gray-300 rounded transition ease-in-out' type='email' id='email' value={email} onChange={onChange} placeholder='email address'/>
          <div className='relative mb-3'>
        
          
          </div>
          <div className='flex  justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6 '>Have a account? <Link to='/sign-in' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Sign in</Link> </p>
            <p className='mb-6 '>Don't have a account? <Link to='/sign-up' className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out'>Register</Link> </p>
          </div>

           <button type='submit' className='bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out w-full hover:shadow-lg active:bg-blue-900'>send reset password</button>
        <div className='my-4 items-center flex before:border-t  before:flex-1  before:border-gray-300 
        after:border-t  after:flex-1  after:border-gray-300'>
          <p className='text-center font-semibold  mx-4'>OR</p>
        </div>

        <GoogleAuth/>
        </form>

       



      </div>
    </div>
  </section>
  )
}

export default ForgotPassword