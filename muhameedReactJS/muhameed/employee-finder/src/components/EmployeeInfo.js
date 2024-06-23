/* eslint-disable no-undef */
import axios from 'axios';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { WishlistContext } from '../context/WishlistContext';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const icon = new L.Icon({
  iconUrl: iconUrl,
  iconsSize: [25, 41],
});

const EmployeeInfo = () => {
  const { company, index } = useParams();
  const [employee, setEmployee] = useState(null);
  const { addToWishList, wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
        const employees = response.data.results;
        console.log(employees);
        const selectedEmployee = employees[parseInt(index)];
        setEmployee(selectedEmployee);
      } catch (error) {
        console.error("Error get here", error);
      }
    }
    fetchEmployees();
  }, [company, index]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const isEmployeeInWishlist = wishlistItems.some(item => item.login.uuid === employee.login.uuid);

  const { name, email, phone, location, picture, dob } = employee;
  const { city, coordinates, country } = location;

  const handleAddWishlist = () => {
    if (!isEmployeeInWishlist) {
      addToWishList(employee, company, index);
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
    <div className='container'>
      {employee && (
        <div className='empInfo_card'>
          <button className={`btn btn-secondary absolute top-3 right-3 text-xl ${isEmployeeInWishlist ? 'btn-danger' : ''} disabled:btn-danger disabled:text-black`} onClick={handleAddWishlist} disabled={isEmployeeInWishlist}>
            <CiHeart />
          </button>
          <div className="pt-4">
            <div className='empInfo_thumb'>
              <img src={picture?.large} alt="Employee" />
            </div>
            <h3 className='display-6 pb-4'>Info About: {`${name?.title} ${name?.first} ${name?.last}`}</h3>
            <ul className="list-group list-group-flush pb-3">
              <li className="list-group-item"><strong>Age:</strong> {dob.age}</li>
              <li className="list-group-item"><strong>Country: </strong> {country}</li>
              <li className="list-group-item"><strong>City:</strong> {city}</li>
              <li className="list-group-item"><strong>Email:</strong> {email}</li>
              <li className="list-group-item"><strong>Phone:</strong> {phone}</li>
            </ul>
          </div>
          {coordinates ? (
            <div className="mt-4">
              <MapContainer center={[coordinates.latitude, coordinates.longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coordinates.latitude, coordinates.longitude]} icon={icon}>
                  <Popup>
                    {`${name.first} ${name.last}`}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <div className="mt-4 display-3">No location data available.</div>
          )}
          <div className='mt-4 flex justify-between items-center w-full gap-4'>
            <button onClick={() => navigate(-1)} className='btn btn-dark px-4 text-white'>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeInfo