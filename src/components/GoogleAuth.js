import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const GoogleAuth = () => {
  const navigate = useNavigate()
  async function onGoogleClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // console.log(user)
      // Check if the user exist by comparing the user id
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      // If the user doesn't exist create a user in firestore
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate("/")
    } catch (error) {
      toast.error("Google Authentication failed")
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} className='w-full flex items-center justify-center py-3 px-7 text-white bg-red-700 uppercase rounded font-medium text-sm hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg'><FcGoogle className='text-2xl bg-white rounded-full mr-2'/> Continue with Google </button>
  )
}

export default GoogleAuth