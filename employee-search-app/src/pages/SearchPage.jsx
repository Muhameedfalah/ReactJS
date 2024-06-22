import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const companyFromParams = searchParams.get('company');

  const [searchTerm, setSearchTerm] = useState(companyFromParams || '');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (companyFromParams) {
      fetchEmployees(companyFromParams);
    } else {
      setLoading(false);
      setError('Please enter a company name to search.');
    }
  }, [companyFromParams]);

  const fetchEmployees = async (company) => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
      setEmployees(response.data.results);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?company=${searchTerm.trim()}`);
    } else {
      setError('Please enter a company name.');
    }
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <form onSubmit={handleSearch} className="mb-10">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter company name..."
            className="input input-bordered flex-grow pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-success text-white text-xl">
            Search
          </button>
        </div>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {!loading && !error && employees.length > 0 && (
        <>
          <h1 className="font-bold text-3xl lg:text-4xl pb-10 lg:pb-16 lg:pt-6">Search Results for: {companyFromParams}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {employees.map((employee, index) => (
              <EmployeeCard key={employee.login.uuid} employee={employee} index={index} company={companyFromParams} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchPage