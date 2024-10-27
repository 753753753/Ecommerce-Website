import React from 'react';

const Sidebar = ({ categories, prices, colors, brands, onFilterChange }) => {
  return (
    <div className="w-full p-4 bg-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <ul>
          {categories.map(category => (
            <li key={category}>
              <input 
                type="checkbox" 
                id={category} 
                onChange={() => onFilterChange('category', category)} 
              />
              <label htmlFor={category} className="ml-2">{category}</label>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Price</h3>
        <ul>
          {prices.map(price => (
            <li key={price}>
              <input 
                type="checkbox" 
                id={price} 
                onChange={() => onFilterChange('price', price)} 
              />
              <label htmlFor={price} className="ml-2">{price}</label>
            </li>
          ))}
        </ul>
      </div>
      
      {colors.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Colors</h3>
          <ul>
            {colors.map(color => (
              <li key={color}>
                <input 
                  type="checkbox" 
                  id={color} 
                  onChange={() => onFilterChange('color', color)} 
                />
                <label htmlFor={color} className="ml-2">{color}</label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {brands.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Brands</h3>
          <ul>
            {brands.map(brand => (
              <li key={brand}>
                <input 
                  type="checkbox" 
                  id={brand} 
                  onChange={() => onFilterChange('brand', brand)} 
                />
                <label htmlFor={brand} className="ml-2">{brand}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
