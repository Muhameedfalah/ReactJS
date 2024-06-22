import { useContext } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { FavoritesContext } from "../context/FavoritesContext";

const Favorites = () => {
  const { favoritesItems } = useContext(FavoritesContext);
  return (
    <div>
      <div className="container mx-auto my-10 lg:my-20 px-4">
        {favoritesItems.length > 0 ? (
          <>
            <h2 className="font-bold text-3xl lg:text-4xl pb-10 lg:pb-16">Favorite Employees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {favoritesItems.map((employee) => (
                <FavoriteCard
                  key={employee.login.uuid}
                  employee={employee}
                  index={employee.favoriteIndex}
                  company={employee.favoriteCompany}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            You do not have any favorite employees yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
