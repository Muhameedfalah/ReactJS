import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { WishlistContext } from "../context/WishlistContext";

const WishListCard = ({ employee, index, company }) => {

  const { name, dob, location, picture, login } = employee;
  const { removeFromWishList } = useContext(WishlistContext);

  const removeFromWishListFn = (itemId) => {
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
        removeFromWishList(itemId);
        Swal.fire({
          title: "Deleted!",
          text: "Favorite has been removed.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className="wishlistCard">
      <div className="wishlistCard_thumb">
        <img src={picture.large} alt="Employee" />
      </div>
      <div className="wishlistCard_text">
        <h4 className="h5">{`${name.first} ${name.title} ${name.last}`}</h4>
        <ul className="list-group list-group-flush pb-3 pt-2">
          <li className="list-group-item"><strong>Age:</strong> {dob.age}</li>
          <li className="list-group-item"><strong>City:</strong> {location.city},</li>
          <li className="list-group-item"><strong>Country:</strong> {location.country}</li>
        </ul>
        <div className="button_groups">
          <Link to={`/employee/${company}/${index}`} className="btn btn-dark">More Details</Link>
          <button type="button" className="btn btn-danger" onClick={() => removeFromWishListFn(login.uuid)}>Remove Favorite</button>
        </div>
      </div>
    </div>
  )
}

export default WishListCard