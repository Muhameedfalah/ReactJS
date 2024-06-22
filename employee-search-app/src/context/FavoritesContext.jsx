import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritesItems, setFavoritestItems] = useState([]);

  useEffect(() => {
    const storedFavoritesItems = JSON.parse(localStorage.getItem('favoritesItems'));
    if (storedFavoritesItems) {
      setFavoritestItems(storedFavoritesItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
  }, [favoritesItems]);

  const addToFavorites = (item, company, index) => {
    const itemWithCompany = {
      ...item,

      favoriteCompany: company || 'wizzer', 
      favoriteIndex: index,
    };
    setFavoritestItems([...favoritesItems, itemWithCompany]);
  };

  const removeFromFavorites = (itemId) => {
    const updatedWishlist = favoritesItems.filter((item) => item.login.uuid !== itemId);
    setFavoritestItems(updatedWishlist);
  };

  return (
    <FavoritesContext.Provider value={{ favoritesItems, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};