import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
    if (storedWishlistItems) {
      setWishlistItems(storedWishlistItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishList = (item, company, index) => {
    const itemWithCompany = {
      ...item,
      favoriteCompany: company || 'wizzer',
      favoriteIndex: index,
    };
    setWishlistItems([...wishlistItems, itemWithCompany]);
  };

  const removeFromWishList = (itemId) => {
    const updatedWishList = wishlistItems.filter((item) => item.login.uuid !== itemId);
    setWishlistItems(updatedWishList);
  };


  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishList, removeFromWishList }}>
      {children}
    </WishlistContext.Provider>
  )
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};