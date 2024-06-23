import React, { useContext } from 'react';
import WishListCard from '../components/WishListCard';
import { WishlistContext } from '../context/WishlistContext';

const WishList = () => {
  const { wishlistItems } = useContext(WishlistContext);
  return (
    <div className='container'>
      <div className='section_padding'>
        {
          wishlistItems.length > 0 ? (<>
            <h2 className="display-6 pb-4">Favorite Employees</h2>
            <div className="card_grids">
              {wishlistItems.map((employee) => (
                <WishListCard
                  key={employee.login.uuid}
                  employee={employee}
                  index={employee.favoriteIndex}
                  company={employee.favoriteCompany}
                />
              ))}
            </div>
          </>) : (<>
            <p className="text-center text-gray-500">
              You do not have any favorite employees yet.
            </p>
          </>)
        }
      </div>
    </div>
  )
}

export default WishList