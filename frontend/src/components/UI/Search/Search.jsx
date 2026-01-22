import { useSearchParams } from "react-router-dom";
import "./Search.css";
import { useTranslation } from "react-i18next";

export default function SearchComponent({ placeholder }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = Object.fromEntries([...searchParams]);

    if (value.trim() === "") {
      delete params.search;
    } else {
      params.search = value;
    }
    setSearchParams(params);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder ? placeholder : t("search_courses")}
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <img src="icons/search.svg" alt={t("search_icon")} />
    </div>
  );
}
