import React from "react";
import { useTranslation } from "react-i18next";
import "./LangSwitch.css";
import Button from "../Button/Button"


export default function LangSwitch() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <Button
        onClick={() => changeLanguage("en")}
        className={i18n.language === "en" ? "active" : ""}
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage("ru")}
        className={i18n.language === "ru" ? "active" : ""}
      >
        RU
      </Button>
    </div>
  );
}
