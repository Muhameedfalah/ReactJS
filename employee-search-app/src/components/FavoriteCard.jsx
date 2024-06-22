/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoriteCard = ({ employee, index, company }) => {
  const { name, dob, location, picture, login } = employee;
  const { removeFromFavorites } = useContext(FavoritesContext);

  const removeFromFavoritesList = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromFavorites(itemId);
        Swal.fire({
          title: "Deleted!",
          text: "Favorite has been removed.",
          icon: "success"
        });
      }
    });
  };
  return (
    <div className="w-full shadow-lg rounded-lg relative">
      <div className="flex justify-center items-center p-4">
        <img src={picture.large} className="h-40 w-auto rounded-full" alt="Employee" />
      </div>
      <div className="p-5">
        <h4 className="text-xl font-semibold pb-2">{`${name.first} ${name.title} ${name.last}`}</h4>
  
        <p><strong>Age:</strong> {dob.age}</p>
        <h4 className="pt-4 pb-2 text-xl font-semibold">Locations</h4>
        <ul className="flex flex-wrap gap-2">
          <li><strong>City:</strong> {location.city},</li>
          <li><strong>Country:</strong> {location.country}</li>
        </ul>
        <div className="grid grid-cols-2 gap-4 pt-6">
          <Link to={`/employee/${company}/${index}`} className="btn">More Details</Link>
          <button type="button" className="btn btn-error text-white" onClick={() => removeFromFavoritesList(login.uuid)}>Remove Favorite</button>
        </div>
      </div>
    </div>
  )
}

export default FavoriteCard