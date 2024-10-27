import React from 'react'

function Banner1() {
  return (
    <div>
 <div className="relative flex flex-col md:flex-row items-center justify-center bg-black mt-4">
  {/* Center (Text) */}
  <div className="flex-shrink-0 p-2 md:p-6 md:pl-12 text-white md:w-1/2">
    <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0 md:space-x-2">
      <div className="flex flex-col">
        <div className="flex flex-shrink-0 space-x-2">
          <h1 className="text-base md:text-base pt-2 md:pt-3 text-green-500 font-semibold">
            Categories
          </h1>
        </div> 
        <h1 className="text-xl md:text-2xl lg:text-3xl md:leading-normal mt-1 md:mt-2 font-bold">
          Enhance Your Music Experience
        </h1>
      </div>
    </div>
    <button className='w-full max-w-[9rem] h-12 bg-green-500 mt-6 hover:bg-green-800'>
      Buy Now
    </button>
  </div>

  {/* Right side (Image Slider) */}
  <div className="relative flex-shrink-0 overflow-hidden w-full md:w-1/2 h-96 md:h-[25rem]">
    <img src="img/Banner2.png" className="w-full h-full mt-6 md:mt-0 md:p-[3rem] p-[4rem]  lg:object-cover" />
  </div>
</div>

    </div>
  )
}

export default Banner1
