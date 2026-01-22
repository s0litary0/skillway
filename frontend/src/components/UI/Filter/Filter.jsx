import { useSearchParams } from "react-router-dom";
import "./Filter.css";
import { useTranslation } from "react-i18next";

export default function Filter() {
  const { t } = useTranslation();
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
      <label>{t("difficulty")}:</label>
      <select value={selected} onChange={handleChange}>
        <option value="">{t("all")}</option>
        <option value="E">{t("easy")}</option>
        <option value="M">{t("medium")}</option>
        <option value="H">{t("hard")}</option>
      </select>
    </div>
  );
}
