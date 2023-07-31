import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'

import { Link } from 'react-router-dom';
import ListingItem from "../components/ListingItem";


const Home = () => {
  // Offers
  const [offerListings, setOfferListings] = useState(null)
  
  useEffect(()=> {
    async function fetchListings(){
      try {
        // get the reference
        const listingsRef = collection(db, "listings")
        // create query
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc)=> {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setOfferListings(listings)
        // console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  }, [])

  // rent
  const [rentListings, setRentListings] = useState(null)
  
  useEffect(()=> {
    async function fetchListings(){
      try {
        // get the reference
        const listingsRef = collection(db, "listings")
        // create query where the type is = to rent
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));
        // execute the query
        const querySnap = await getDocs(q);
        // create a variable
        const listings = [];
        // use forEach method to fill the variables= created
        querySnap.forEach((doc)=> {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setRentListings(listings)
        // console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  }, [])

  // For sale
  const [saleListings, setSaleListings] = useState(null)
  
  useEffect(()=> {
    async function fetchListings(){
      try {
        // get the reference
        const listingsRef = collection(db, "listings")
        // create query where the type is = to rent
        const q = query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4));
        // execute the query
        const querySnap = await getDocs(q);
        // create a variable
        const listings = [];
        // use forEach method to fill the variables= created
        querySnap.forEach((doc)=> {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setSaleListings(listings)
        console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  }, [])
  return (
    <div>
      <Slider/>
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent offers</h2>
            <Link to='/offers'>
              <p className='px-3 text-sm text-b;ue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offerListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Property for rent</h2>
            <Link to='/category/rent'>
              <p className='px-3 text-sm text-b;ue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more property for rent</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {rentListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Property for sale</h2>
            <Link to='/category/sale'>
              <p className='px-3 text-sm text-b;ue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more property for sale</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {saleListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home