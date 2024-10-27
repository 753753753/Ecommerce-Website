// CardList.js
import React, { useState } from 'react';
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera, CiHeadphones } from "react-icons/ci";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { useData } from '../../../context/myContext';
import { useSelectedData } from '../Contextapi/Context';
import cardData from '../Data/CategoryData';

const CardList = () => {
  const [cards, setCards] = useState(cardData);
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 6; // Number of cards to display per page
  const {selectedData , setSelectedData} = useSelectedData();
  const { getproduct , setgetproduct} = useData()
  
  const handleNext = () => {
    const newStartIndex = (startIndex + cardsPerPage) % cards.length;
    setStartIndex(newStartIndex);
  };

  const handlePrev = () => {
    const newStartIndex = (startIndex - cardsPerPage + cards.length) % cards.length;
    setStartIndex(newStartIndex);
    // If you want to display additional data on each "Previous" click
    if (startIndex === 0) {
      const additionalData = cards.length - cardsPerPage;
      setStartIndex(additionalData < 0 ? 0 : additionalData);
    }
  };

  const fullCardsArray = [...cards, ...cards]; // Duplicate the array to create a loop
  const visibleCards = fullCardsArray.slice(startIndex, startIndex + cardsPerPage);

  const handleCardClick = (text) => {
    setSelectedData(text);
  };


  return (
    <div>
      <div className="text w-full max-w-screen-lg mx-auto gap-8 px-4 md:px-6 mt-10 flex flex-col md:flex-row items-center justify-between mb-6">
  <div className="flex items-center space-x-2">
    <div className="w-2 h-8 bg-secondary rounded-md md:w-3"></div>
    <div className="font-poppins text-base font-semibold leading-5 pt-2 md:pt-0 text-secondary md:text-xl">
      Categories
    </div>
  </div>
  <div className="font-inter text-2xl font-semibold leading-12 tracking-wide mt-1 md:mt-0 md:text-[2rem]">
   
  </div>
  <div className="flex mt-4 md:mt-0">
    <button className="mr-2" onClick={handlePrev} disabled={startIndex === 0}>
      <GoArrowLeft className="cursor-pointer border-2 text-black rounded-full px-3 w-12 h-12 bg-gray-200 hover:bg-gray-50" />
    </button>
    <button onClick={handleNext} disabled={startIndex + cardsPerPage >= cards.length}>
      <GoArrowRight className="cursor-pointer border-2 text-black rounded-full px-3 w-12 h-12 bg-gray-200 hover:bg-gray-50" />
    </button>
  </div>
</div>
      <div className="flex flex-wrap justify-center md:justify-center md:space-x-16 space-x-8">
        {visibleCards.map((card) => (
          <Card key={card.id} id={card.id} text={card.text} icon={card.icon} onSelect={handleCardClick} isselectdata = {selectedData == card.text}/>
        ))}
      </div>
    </div>
  );
};
const Card = ({ id, text, icon, onSelect , isselectdata}) => {
  const renderIcon = () => {
    const commonIconClass = 'w-11 h-11'; // Define a common class for icons
    switch (icon) {
      case 'icon1':
        return <IoIosPhonePortrait className={commonIconClass} />;
      case 'icon2':
        return <BsSmartwatch className={commonIconClass} />;
      case 'icon3':
        return <RiComputerLine className={commonIconClass} />;
      case 'icon4':
        return <CiCamera className={commonIconClass} />;
      case 'icon5':
        return <CiHeadphones className={commonIconClass} />;
      case 'icon6':
        return <IoGameControllerOutline className={commonIconClass} />;
      default:
        return null;
    }
  };
  const handleClick = () => {
    onSelect(text); // Call the onSelect prop when card is clicked
  };
  return (
    <div className={`m-4 p-4 border rounded-md shadow-md w-full md:w-[8.25rem] justify-center text-center hover:bg-secondary ${isselectdata ? 'bg-secondary text-white' : 'bg-white'} cursor-pointer hover:text-white`} onClick={handleClick}>
      <div className="justify-center flex">
        {renderIcon()}
      </div>
      <p className='font-poppins text-base font-regular leading-6 mt-2'>{text}</p>
    </div>
  );
};


export default CardList;
