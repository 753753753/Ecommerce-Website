import React from 'react'
import Allproduct from './Allproduct'
import Banner from './Banner'
import Banner1 from './Banner1'
import Category from './Category'
import CategoryProduct from './CategoryProduct'
import Facility from './Facility'

function Home() {
    return (
            <div className="mx-auto w-full max-w-7xl">
                <Banner />
                <Category />
                <CategoryProduct />
                <div><hr className='h-1 bg-gray-100 mt-[4rem]' /></div>
                <Banner1 />
                <div><hr className='h-1 bg-gray-100 mt-[4rem]' /></div>
                <Allproduct />
                <div><hr className='h-1 bg-gray-100 mt-[4rem]' /></div>
                <Facility />
                <div><hr className='h-1 bg-gray-100 mt-[4rem]' /></div>
            </div>
    )
}

export default Home
