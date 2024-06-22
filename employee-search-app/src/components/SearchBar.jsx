/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useEmployee } from "../context/EmployeeContext";

const SearchBar = () => {

  const { loading, error, searchQuery, handleSearch } = useEmployee();
  const [query, setQuery] = useState(searchQuery);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-sm flex justify-end">
      <form>
        <div className="w-96 relative">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Search employees..."
              value={query}
              onChange={handleInputChange}
              className="grow pr-10"
            />
            <span className="w-4 h-4 opacity-70">
              <CiSearch />
            </span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
