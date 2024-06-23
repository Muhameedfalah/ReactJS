import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";

const HomeSearch = () => {
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
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&seed=wizzer`);
        const employees = response.data.results;
        setEmployees(employees);
      } catch (error) {
        setError("An error occurred while fetching employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <section className="home_search pb-5">
      <div className="container py-4">
        <div className="pt-16 wrapper">
          <div className="pb-16">
            <form onSubmit={handleSearch}>
              <div className="relative mx-auto pb-10">
                <div className="input-group flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter company name..."
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-success text-white text-xl absolute right-0 top-0">
                    <CiSearch />
                  </button>
                </div>
              </div>
            </form>
            <h1 className="display-6 pb-3 md:pb-5">Employees of the month:</h1>
          </div>
          {loading && <div>Loading...</div>}
          <div className="card_grids">
            {employees.map((employee, index) => (
              <div key={employee.login.uuid} className="col">
                <EmployeeCard employee={employee} index={index} company="wizzer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSearch