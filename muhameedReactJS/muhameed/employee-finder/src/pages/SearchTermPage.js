import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';

const SearchTermPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParms = new URLSearchParams(location.search);
  const companyFromParms = searchParms.get('company');

  const [searchTerm, setSearchTerm] = useState(companyFromParms || '');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (companyFromParms) {
      fetchEmployeData(companyFromParms);
    } else {
      setLoading(false);
      setError("Please set a company name to search");
    }
  }, [companyFromParms]);

  const fetchEmployeData = async (company) => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
      console.log(response);
      setEmployees(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?company=${searchTerm.trim()}`);
    } else {
      setError("Please set a compnany name");
    }
  }
  return (
    <section className='searchTermPage'>
      <div className='container'>
        <div className='search_form'>
          <form onSubmit={handleSearch}>
            <div className="input-group flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter company name..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </div>
          </form>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && employees.length > 0 && (
          <>
            <h2 className='display-6 pb-3 '>Search Results for: <strong>{companyFromParms}</strong></h2>
            <div className="card_grids">
              {employees.map((employee, index) => (
                <EmployeeCard key={employee.login.uuid} employee={employee} index={index} company={companyFromParms} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default SearchTermPage