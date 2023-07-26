import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import {BsFillPinMapFill} from 'react-icons/bs'
// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Autoplay, Navigation, Pagination} from "swiper/modules"
import SwiperCore from "swiper";
import {RiShareForwardLine} from 'react-icons/ri'
import {GiPersonInBed, GiBathtub} from "react-icons/gi"
import {PiCarProfileFill, PiChairFill} from "react-icons/pi"

// import Swiper styles
import 'swiper/css/bundle';

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLink, setShareLink] = useState(false)
  SwiperCore.use([Autoplay, Navigation, Pagination])
  const params = useParams()
  useEffect(()=> {
    async function fetchListing(){
      const docRef = doc(db, "listings", params.listingId)
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setListing(docSnap.data())
        setLoading(false)
        // console.log(listing);
      }
    }
    fetchListing();
    
  },[params.listingId]);
  if(loading){
    return <Spinner/>
  }
  return (
    <main>
      <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect='fade' modules={[EffectFade]} autoplay={{delay: 3000}}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className='relative w-full overflow-hidden h-[500px]' style={{background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover",
          }}>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2  rounded-full w-12 h-12 flex justify-center items-center' onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLink(true)
        setTimeout(()=> {
          setShareLink(false)
        }, 2000)
      }}>
          <RiShareForwardLine className='text-xl text-blue-500'/>
      </div>
      {shareLink && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">Link copied</p>
      )}
      <div className='flex flex-col md:flex-row m-4 max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
        <div className=' w-full h-[200px] lg-[400px]'> 
          <p className='text-2xl font-bold mb-3 text-blue-900'>
            {listing.name} - $ {listing.offer ? listing.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className='flex items-center mt-6 mb-3 font-semibold'>
            <BsFillPinMapFill className='text-green-700 mr-1'/>
              {listing.address}
          </p>
          <div className='flex justify-start items-center space-x-4 w-[75%]'>
            <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type === "rent" ? "Rent" : "Sale"}</p>
            {listing.offer && (
              <p className= 'bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>${+listing.regularPrice - +listing.discountedPrice} discount</p>
            )}
          </div>
          <p className='mb-3 mt-3'> <span className='font-semibold'>Description -</span> {listing.description}</p>
          <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold'>
            <li className='flex items-center whitespace-nowrap'> <GiPersonInBed className='text-lg mr-1'/> {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</li>

            <li className='flex items-center whitespace-nowrap'> <GiBathtub className='text-lg mr-1'/> {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}</li>

            <li className='flex items-center whitespace-nowrap'> <PiCarProfileFill className='text-lg mr-1'/> {+listing.parking  ? "Parking" : "No Parking"}</li>

            <li className='flex items-center whitespace-nowrap'> <PiChairFill className='text-lg mr-1'/> {+listing.furnished  ? "Furnished" : "No furnished"}</li>
          </ul>
        </div>
        <div className='bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden'> </div>
      </div>
    </main>
  )
}

export default Listing