import { useSearchParams } from "react-router-dom";
import "./Sort.css";

export default function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value) {
      searchParams.set("sort", value);
    } else {
      searchParams.delete("sort");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="sort-container">
      <img src="icons/sort-alt.svg" alt="sort-icon" />
      <label>Sort: </label>
      <select value={currentSort} onChange={handleSortChange}>
        <option value="">Select sort...</option>
        <option value="-created_at">Newest</option>
        <option value="created_at">Oldest</option>
        <option value="difficulty_level">Difficulty (Low → High)</option>
        <option value="-difficulty_level">Difficulty (High → Low)</option>
      </select>
    </div>
  );
}
