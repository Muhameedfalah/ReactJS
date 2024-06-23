import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { WishlistContext } from "../context/WishlistContext";


const EmployeeCard = ({ employee, company, index }) => {
  const { addToWishList, wishlistItems } = useContext(WishlistContext);
  const isEmployeeInWishlist = wishlistItems.some(
    (item) => item.login.uuid === employee.login.uuid
  );

  const { name, dob, location, picture } = employee;

  const handleAddWishList = () => {
    if (!isEmployeeInWishlist) {
      addToWishList(employee, company, index);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "This item is added to Favorites.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="employeeCard">
      <button
        className={`employeeCard_btn btn btn-secondary ${isEmployeeInWishlist ? "btn btn-danger" : ""
          } disabled:bg-danger disabled:text-black`}
        onClick={handleAddWishList}
        disabled={isEmployeeInWishlist}
      >
        <CiHeart />
      </button>
      <div className="employeeCard_thumb">
        <img
          src={picture.large}
          alt="Employee"
        />
      </div>
      <div className="employeeCard_text">
        <h5 className="h5">{`${name.first} ${name.title} ${name.last}`}</h5>
        <ul className="list-group list-group-flush py-3">
          <li className="list-group-item"><strong>Age:</strong> {dob.age}</li>
          <li className="list-group-item"><strong>City:</strong> {location.city},</li>
          <li className="list-group-item"><strong>Country:</strong> {location.country}</li>
        </ul>
        <div className="pt-3">
          <Link to={`/employee/${company}/${index}`} className="btn btn-success d-block h-100">
            More Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard