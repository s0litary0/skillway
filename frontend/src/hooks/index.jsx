import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, fetchMe } from "../store/slices/authSlice";
import EnrollService from "../services/EnrollService";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const remove = () => {
    try {
      setStoredValue(null);
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, remove];
};

export const useAuth = () => {
  const dispatch = useDispatch();

  const { token, user, profile, stats, loading, error } = useSelector(
    (state) => state.auth,
  );

  // Automatically fetch "me" if token exists
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe());
    }
  }, [token, user, dispatch]);

  // Login function
  const loginUser = (username, password) => {
    return dispatch(login({ username, password }));
  };

  // Logout function
  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    token,
    user,
    profile,
    stats,
    loading,
    error,
    loginUser,
    logoutUser,
  };
};

export const useEnrollments = (courseId) => {
  const [enrolled, setEnrolled] = useState(0);
  useEffect(() => {
    if (!courseId) return;
    const fetchEnrollments = (courseId) => {
      EnrollService.getEnrollmentsByCourse(courseId)
        .then((enrollments) => enrollments.length)
        .then((count) => setEnrolled(count));
    };
    fetchEnrollments(courseId);
  }, [courseId]);

  const checkEnrollment = async (userId, courseId) => {
    return await EnrollService.checkEnrollment(userId, courseId)
  };

  return [enrolled, checkEnrollment];
};
