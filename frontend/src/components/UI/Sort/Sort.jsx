import { useSearchParams } from "react-router-dom";
import "./Sort.css";
import { useTranslation } from "react-i18next";

export default function Sort() {
  const { t } = useTranslation();
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
      <img src="icons/sort-alt.svg" alt={t("sort_icon")} />
      <label>{t("sort_label")}: </label>
      <select value={currentSort} onChange={handleSortChange}>
        <option value="">{t("sort_select")}</option>
        <option value="-created_at">{t("sort_newest")}</option>
        <option value="created_at">{t("sort_oldest")}</option>
        <option value="difficulty_level">{t("sort_difficulty_low_high")}</option>
        <option value="-difficulty_level">{t("sort_difficulty_high_low")}</option>
      </select>
    </div>
  );
}
