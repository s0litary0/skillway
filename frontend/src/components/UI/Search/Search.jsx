import { useSearchParams } from "react-router-dom";
import "./Search.css"


export default function SearchComponent({ placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = Object.fromEntries([...searchParams]);

    if (value.trim() === "") {
      delete params.search
    } else {
      params.search = value;
    }
    setSearchParams(params);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Search courses..."}
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <img src="icons/search.svg" alt="search-icon"/>
    </div>
  );
}