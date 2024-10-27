import { createContext, useContext, useEffect, useState } from 'react';
const SelectedDataContext = createContext();

export const SelectedDataProvider = ({ children }) => {
  const [selectedData, setSelectedDataState] = useState(() => {
    const storedData = localStorage.getItem('selectedData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const storedIds = localStorage.getItem('clickedIds');
  const [clickedIds, setClickedIds] = useState(storedIds ? JSON.parse(storedIds) : []);
  
  const handleClick = (productId) => {
    if (!clickedIds.includes(productId)) {
      setClickedIds((prevIds) => [...prevIds, productId]);
    } else {
      setClickedIds((prevIds) => prevIds.filter((id) => id !== productId));
    }
  };

  useEffect(() => {
    localStorage.setItem('clickedIds', JSON.stringify(clickedIds));
  }, [clickedIds]);
  const setSelectedData = (newData) => {
    setSelectedDataState(newData);

    // Save data to localStorage
    localStorage.setItem('selectedData', JSON.stringify(newData));

    
  };

   
  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData , clickedIds , handleClick}}>
      {children}
    </SelectedDataContext.Provider>
  );
};

export const useSelectedData = () => {
  return useContext(SelectedDataContext);
};
