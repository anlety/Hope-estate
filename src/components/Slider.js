import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import Spinner from '../components/Spinner';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Autoplay, Navigation, Pagination} from "swiper/modules"
import SwiperCore from "swiper";
import 'swiper/css/bundle';
import { useNavigate } from 'react-router';


const Slider = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  SwiperCore.use([Autoplay, Navigation, Pagination])
  const navigate = useNavigate()
  useEffect(()=> {
    async function fetchListing(){
      const listingRef = collection(db, "listings")
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5))
      const docSnap = await getDocs(q)
      let listings = [];
      docSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      // console.log(listings)
      setLoading(false)
    }
    fetchListing()
  }, [])
  if(loading){
    return <Spinner/>
  }
  if(listings.length === 0){
    return <></>;
  }
  return (
    listings && (
      <>
      <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect='fade' modules={{EffectFade}} autoplay={{delay: 3000}}>
          {listings.map(({data, id}) =>(
        <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
          <div style={{background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover"}} className='w-full h-[500px] overflow-hidden cursor-pointer relative'>
          </div>
          <p className='text-white absolute left-1 top-3 bg-slate-500 px-2 py-2 rounded-br-3xl font-medium shadow-lg opacity-90'>{data.name}</p>

          <p className='text-white absolute left-1 bottom-1 bg-red-500 px-2 py-2 rounded-tr-3xl font-semibold max-width-[90%] shadow-lg opacity-90'>${data.discountedPrice ?? data.regularPrice}
          {data.type === "rent" && " / month"}</p>
        </SwiperSlide>
      ))}
      </Swiper>
    
      </>
    )
  )
}

export default Slider