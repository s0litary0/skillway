import { useSearchParams } from "react-router-dom";
import "./Filter.css";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = searchParams.get("difficulty_level") || "";

  const handleChange = (e) => {
    const value = e.target.value;

    if (value) {
      searchParams.set("difficulty_level", value);
    } else {
      searchParams.delete("difficulty_level");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="difficulty-filter">
      <img src="icons/filter.svg" alt="filter-icon" />
      <label>Difficulty:</label>
      <select value={selected} onChange={handleChange}>
        <option value="">All</option>
        <option value="E">Easy</option>
        <option value="M">Medium</option>
        <option value="H">Hard</option>
      </select>
    </div>
  );
}
