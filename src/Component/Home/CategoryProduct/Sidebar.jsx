import React from 'react';

const Sidebar = ({ categories, prices, colors, brands, onFilterChange }) => {
  return (
    <div className="w-full p-4 bg-gray-100">
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Category</h3>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category} className="flex items-center">
            <input 
              type="checkbox" 
              id={category} 
              className="mr-2" 
              onChange={() => onFilterChange('category', category)} 
            />
            <label htmlFor={category} className="text-sm">{category}</label>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Price</h3>
      <ul className="space-y-2">
        {prices.map(price => (
          <li key={price} className="flex items-center">
            <input 
              type="checkbox" 
              id={price} 
              className="mr-2" 
              onChange={() => onFilterChange('price', price)} 
            />
            <label htmlFor={price} className="text-sm">{price}</label>
          </li>
        ))}
      </ul>
    </div>
    
    {colors.length > 0 && (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Colors</h3>
        <ul className="space-y-2">
          {colors.map(color => (
            <li key={color} className="flex items-center">
              <input 
                type="checkbox" 
                id={color} 
                className="mr-2" 
                onChange={() => onFilterChange('color', color)} 
              />
              <label htmlFor={color} className="text-sm">{color}</label>
            </li>
          ))}
        </ul>
      </div>
    )}

    {brands.length > 0 && (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Brands</h3>
        <ul className="space-y-2">
          {brands.map(brand => (
            <li key={brand} className="flex items-center">
              <input 
                type="checkbox" 
                id={brand} 
                className="mr-2" 
                onChange={() => onFilterChange('brand', brand)} 
              />
              <label htmlFor={brand} className="text-sm">{brand}</label>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
};

export default Sidebar;
