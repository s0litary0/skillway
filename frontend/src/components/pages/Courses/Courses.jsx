import { useEffect, useState } from "react";
import CourseListService from "../../../services/CoursesListService";
import Card from "../../UI/Card/Card";
import Search from "../../UI/Search/Search";
import Filter from "../../UI/Filter/Filter";
import { useSearchParams } from "react-router-dom";
import "./Courses.css";
import Sort from "../../UI/Sort/Sort";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const difficultyFilterParam = searchParams.get("difficulty_level") || "";
  const sortParam = searchParams.get("sort") || "";

  useEffect(() => {
    const fetchCourses = async () => {
      let params = {};

      if (searchQuery) {
        params.search = searchQuery;
      }
      if (difficultyFilterParam) {
        params.difficulty_level = difficultyFilterParam;
      }
      if (sortParam) {
        params.ordering = sortParam;
      }
      console.log(params);
      const response = await CourseListService.getCourses(params);

      console.log(response);
      setCourses(response);
    };

    fetchCourses();
  }, [searchQuery, difficultyFilterParam, sortParam]);

  return (
    <div className="courses-page">
      <div className="search-filter-sort-container">
        <Search />
        <Filter />
        <Sort />
      </div>
      <div className="courses-container">
        {courses.map((course) => (
          <Card key={course.id} item={course} className="course-card" />
        ))}
      </div>
    </div>
  );
}
