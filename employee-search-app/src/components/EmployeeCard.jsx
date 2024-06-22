/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FavoritesContext } from "../context/FavoritesContext";


const EmployeeCard = ({ employee, company, index }) => {
  const { addToFavorites, favoritesItems } = useContext(FavoritesContext);

  const isEmployeeInFavorite = favoritesItems.some(item => item.login.uuid === employee.login.uuid);

  const { name, dob, location, picture } = employee;

  const handleAddFavorite = () => {
    if (!isEmployeeInFavorite) {
      addToFavorites(employee, company, index);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "This item is added In Favorites.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div className="w-full shadow-lg rounded-lg relative">
      <button className={`btn absolute top-3 right-3 text-xl ${isEmployeeInFavorite ? 'bg-red-300' : ''} disabled:bg-red-300 disabled:text-black`} onClick={() => handleAddFavorite(employee.login.uuid)} disabled={isEmployeeInFavorite}>
        <CiHeart />
      </button>
      <div className="flex justify-center items-center p-4">
        <img src={picture.large} className="h-40 w-auto rounded-full" alt="Employee" />
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-xl pb-4">{`${name.first} ${name.title} ${name.last}`}</h4>
        <p><strong>Age:</strong> {dob.age}</p>
        <h4 className="pt-4 pb-2 text-xl font-semibold">Locations</h4>
        <ul className="flex flex-wrap gap-2">
          <li><strong>City:</strong> {location.city},</li>
          <li><strong>Country:</strong> {location.country}</li>
        </ul>
        <div className="pt-6">
          <Link to={`/employee/${company}/${index}`} className="btn w-full">More Details</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
