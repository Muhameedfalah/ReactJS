import axios from 'axios';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { FavoritesContext } from '../context/FavoritesContext';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const icon = new L.Icon({
  iconUrl: iconUrl,
  iconSize: [25, 41],
});

const EmployeeDetails = () => {
  const { company, index } = useParams();
  const [employee, setEmployee] = useState(null);
  const { addToFavorites, favoritesItems } = useContext(FavoritesContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
        const employees = response.data.results;
        const selectedEmployee = employees[parseInt(index)];
        setEmployee(selectedEmployee);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmployee();
  }, [company, index]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const isEmployeeInFavorite = favoritesItems.some(item => item.login.uuid === employee.login.uuid);

  const { name, email, phone, location, picture, dob } = employee;
  const { city, coordinates, country } = location;

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
    <div className="max-w-xl mx-auto py-20">
      {employee && (
        <div className='shadow-lg rounded-lg p-4 relative'>
          <button className={`btn absolute top-3 right-3 text-xl ${isEmployeeInFavorite ? 'bg-red-300' : ''} disabled:bg-red-300 disabled:text-black`} onClick={handleAddFavorite} disabled={isEmployeeInFavorite}>
            <CiHeart />
          </button>
          <div className="pt-4">
            <h3 className='text-xl lg:text-2xl font-semibold pt-6 pb-6 text-center'>Info About: {`${name?.title} ${name?.first} ${name?.last}`}</h3>
            <div className='mx-auto text-center pb-4'>
              <img src={picture?.large} className="h-60 w-auto rounded-3xl mx-auto" alt="Employee" />
            </div>
            <div className='text-center'>
              <p className='pb-1'><strong>Age: </strong> {dob.age}</p>
              <p className='pb-1'><strong>Country: </strong> {country}</p>
              <p className='pb-1'><strong>City:</strong> {city}</p>
              <p className='pb-1'><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone}</p>
            </div>
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
            <div className="mt-4">No location data available.</div>
          )}
          <div className='pt-10 flex justify-between items-center w-full gap-4'>
            <button onClick={() => navigate(-1)} className='btn btn-info px-10 text-white'>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
