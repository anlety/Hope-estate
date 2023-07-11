import React, { useState } from 'react';
import GoogleAuth from '../components/GoogleAuth';
import {PiEyeClosedDuotone, PiEyeDuotone} from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom';
// import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from '../firebase'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const {name, email, password} = formData;

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function onChange(e){
    console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const user = userCredential.user;
      // console.log(user)

      // Delete password from formData to save to database
      const formDataCopy = {...formData}
      delete formDataCopy.password

      // Adding timestamp to formDataCopy
      formDataCopy.timestamp =serverTimestamp();

      // Save user to firestore with setDoc method
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong, please try again later")
    }
  }
  return (
    <section>
    <h1 className='text-3xl text-center mt-6 font-bold'>Register</h1>
    <div className=''>

      <div className='w-[70%] justify-center items-center px-6 py-12 max-w-6xl mx-auto'>
        <form onSubmit={onSubmit}>
        <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white mb-6 border-gray-300 rounded transition ease-in-out' type='text' id='name' value={name} onChange={onChange} placeholder='Full name'/>

          <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white mb-6 border-gray-300 rounded transition ease-in-out' type='email' id='email' value={email} onChange={onChange} placeholder='email address'/>
          <div className='relative mb-6'>
          <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword? "text": "password"} id='password' value={password} onChange={onChange} placeholder='password' />
          {showPassword? (<PiEyeClosedDuotone className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>) : (<PiEyeDuotone className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>
          )}
          </div>
          <div className='flex  justify-center whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6 '>Have a account? <Link to='/sign-in' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Sign in</Link> </p>
            {/* <p>
              <Link to='/forgot-password' className='text-red-600  hover:text-red-800 transition duration-200 ease-in-out'>Forgot password</Link>
              </p> */}
          </div>

           <button type='submit' className='bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out w-full hover:shadow-lg active:bg-blue-900'>Register</button>
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

export default SignUp