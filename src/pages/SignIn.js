import React, { useState } from 'react';
import GoogleAuth from '../components/GoogleAuth';
import {PiEyeClosedDuotone, PiEyeDuotone} from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import {toast} from 'react-toastify'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password} = formData;

  const [showPassword, setShowPassword] = useState(false)

  function onChange(e){
    console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value,
    }))
  }
  const navigate = useNavigate()
  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential.user){
        navigate("/")
      }
    } catch (error) {
      toast.error("Wrong username or password")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className=''>

        <div className='w-[70%] justify-center items-center px-6 py-12 max-w-6xl mx-auto'>
          <form onSubmit={onSubmit}>
            <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white mb-6 border-gray-300 rounded transition ease-in-out' type='email' id='email' value={email} onChange={onChange} placeholder='email address'/>
            <div className='relative mb-6'>
            <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword? "text": "password"} id='password' value={password} onChange={onChange} placeholder='password' />
            {showPassword? (<PiEyeClosedDuotone className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>) : (<PiEyeDuotone className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>
            )}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 '>Don't have a account? <Link to='/sign-up' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Register</Link> </p>
              <p>
                <Link to='/forgot-password' className='text-red-600  hover:text-red-800 transition duration-200 ease-in-out'>Forgot password?</Link>
                </p>
            </div>

             <button type='submit' className='bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out w-full hover:shadow-lg active:bg-blue-900'>Sign in</button>
          <div className='my-4 items-center flex before:border-t  before:flex-1  before:border-gray-300 
          after:border-t  after:flex-1  after:border-gray-300'>
            <p className='text-center font-semiblod  mx-4'>OR</p>
          </div>

          <GoogleAuth/>
          </form>

         



        </div>
      </div>
    </section>
  )
}

export default SignIn