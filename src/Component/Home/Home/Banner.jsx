// src/components/ImageSlider.js
import React, { useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { IoLogoApple } from "react-icons/io";
import { MdNavigateNext } from 'react-icons/md';
import { SiSamsung } from "react-icons/si";
const slides = [
  {
    id: 1,
    text: 'iPhone 14 Series',
    image: 'img/Banner1.png',
    logo: <IoLogoApple className="w-10 h-10 md:w-14 md:h-14" />,
  },
  {
    id: 2,
    text: 'Samsung Series',
    image: 'img/Banner3.png',
    logo: <SiSamsung className="w-10 h-10 md:w-14 md:h-14" />,
  },
  // Add more slides as needed
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center bg-black mt-4">
      {/* Left side (Previous button) */}
      <button
        className="absolute left-2 md:left-6 m-2 md:m-6 text-white"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <GrFormPrevious className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Center (Text) */}
      <div className="flex-shrink-0 p-2 md:p-6 md:pl-[12rem] text-white md:w-1/2">
        <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0 md:space-x-2">
          <div className="flex flex-col">
            <div className="flex flex-shrink-0 space-x-2">
            {slides[currentSlide].logo}
            <h1 className="text-base md:text-base font-light pt-2 md:pt-3">
              {slides[currentSlide].text}
            </h1>
            </div> 
            <h1 className="text-xl md:text-[2.4rem] lg:text-[3rem] md:leading-normal mt-1 md:mt-2 font-bold">Up to 10% off Voucher</h1>
          </div>
        </div>
      </div>

      {/* Right side (Image Slider) */}
      <div className="relative flex-shrink-0 overflow-hidden w-full md:w-1/2 h-[15rem] md:h-[25rem]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover mt-2 md:mt-5"
            />
          </div>
        ))}
      </div>

      {/* Right side (Next button) */}
      <button
        className="absolute right-2 md:right-6 m-2 md:m-6 text-white"
        onClick={handleNext}
        aria-label="Next"
      >
        <MdNavigateNext className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
};

export default Banner;
