import React from 'react';
import { CiHeadphones } from "react-icons/ci";
import { SiMoneygram } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
function Facility() {
  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-center md:space-x-32">
        <div className="m-4 p-4 rounded-md shadow-md justify-center text-center cursor-pointer hover:text-black w-full md:w-auto max-w-xs md:max-w-none">
          <div className="justify-center flex bg-gray-400 w-16 rounded-full p-1 mx-auto">
            <TbTruckDelivery className="text-white bg-black size-[3.2rem] p-[8px] rounded-full" />
          </div>
          <p className="font-poppins text-base font-bold leading-6 mt-2">FREE AND FAST DELIVERY</p>
          <p className="font-poppins text-base font-light leading-6 mt-2">Free delivery for all orders over $140</p>
        </div>
        <div className="m-4 p-4 rounded-md shadow-md justify-center text-center cursor-pointer hover:text-black w-full md:w-auto max-w-xs md:max-w-none">
          <div className="justify-center flex bg-gray-400 w-16 rounded-full p-1 mx-auto">
            <CiHeadphones className="text-white bg-black size-[3.2rem] p-[8px] rounded-full" />
          </div>
          <p className="font-poppins text-base font-bold leading-6 mt-2">24/7 CUSTOMER SERVICE</p>
          <p className="font-poppins text-base font-light leading-6 mt-2">Friendly 24/7 customer support</p>
        </div>
        <div className="m-4 p-4 rounded-md shadow-md justify-center text-center cursor-pointer hover:text-black w-full md:w-auto max-w-xs md:max-w-none">
          <div className="justify-center flex bg-gray-400 w-16 rounded-full p-1 mx-auto">
            <SiMoneygram className="text-white bg-black size-[3.2rem] p-[8px] rounded-full" />
          </div>
          <p className="font-poppins text-base font-bold leading-6 mt-2">MONEY BACK GUARANTEE</p>
          <p className="font-poppins text-base font-light leading-6 mt-2">We return money within 30 days</p>
        </div>
      </div>

    </div>
  )
}

export default Facility
