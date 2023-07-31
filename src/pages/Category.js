import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import { useParams } from 'react-router'

const Category = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [moreLoad, setMoreLoad] = useState(null)
  const params = useParams()
  useEffect(()=> {
    async function fetchOffers(){
      try {
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("type", "==", params.categoryName), orderBy("timestamp","desc"), limit(8));
        const querySnap = await getDocs(q)
        // get the last item in the array
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setMoreLoad(lastVisible)
        const listings =[]
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()

          })
          
        })
        setListings(listings)
          setLoading(false)
      } catch (error) {
        toast.error("Could not fetch offers")
      }
    }
    fetchOffers()
  }, [params.categoryName])

  async function onFetchMoreListing(){
    try {
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("type", "==", params.categoryName), orderBy("timestamp","desc"),startAfter(moreLoad) ,limit(4));
      const querySnap = await getDocs(q)
      // get the last item in the array
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setMoreLoad(lastVisible)
      const listings =[]
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()

        })
        
      })
      setListings((prevState) => [...prevState, ...listings])
        setLoading(false)
    } catch (error) {
      toast.error("Could not fetch offers")
    }
  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
    <h1 className='text-3xl text-center mt-6 font-bold mb-6'>{params.categoryName === "rent" ? "property for rent" : "Property for sale"}</h1>
    {loading ? (
      <Spinner/>
    ) : listings && listings.length > 0 ? (<>
    <main>
      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {listings.map((listing) => (
          <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
        ))}
      </ul>

    </main>
      {moreLoad &&navigator(
        <div className='flex justify-center items-center '>
          <button className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out ' onClick={onFetchMoreListing}>Load more</button>
        </div>
      )}
    </>
    ) : (<p className='justify-center'> There are no current offers</p>)}
  </div>
  )
}

export default Category