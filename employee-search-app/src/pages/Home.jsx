import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import EmployeeCard from "../components/EmployeeCard";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      navigate(`/search?company=${trimmedSearchTerm}`);
    }
  };

  useEffect(() => {
    const fetchEmploye = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&seed=wizzer`);

        const employees = response.data.results;
        setEmployees(employees);
      } catch (error) {
        setError("An error occurred while fetching employee");
      } finally {
        setLoading(false);
      }
    };
    fetchEmploye();
  }, []);
  if (error) return <div>{error}</div>;
  return (
    <div>
      <Banner></Banner>
      <div className="container mx-auto px-5 py-10">
        <div className="pt-16">
          <div className="pb-16">
            <form onSubmit={handleSearch}>
              <div className="max-w-96 relative mx-auto pb-10">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter company name..."
                    className="grow pr-10"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-success text-white text-xl absolute right-0 top-0">
                    <CiSearch />
                  </button>
                </label>
              </div>
            </form>
            <h1 className="font-bold text-3xl lg:text-4xl">Employees of the month:</h1>
          </div>
          {loading && <div>Loading...</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {employees.map((employee, index) => (
              <EmployeeCard
                key={employee.login.uuid}
                employee={employee}
                index={index}
                company="wizzer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
