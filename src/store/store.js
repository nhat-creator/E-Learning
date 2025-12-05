import { configureStore } from "@reduxjs/toolkit";
import courseCatalogReducer from "./Reducers/courseCatalogReducer";
import courseByPageReducer from "./Reducers/courseByPageReducer";
import listCourseReducer from "./Reducers/listCourseReducer";
import detailCourseReducer from "./Reducers/detailCourse";
import courseByCategoryReducer from "./Reducers/courseByCategoryReducer";
import loginReducer from "./Reducers/loginReducer";
import listUsersReducer from "./Reducers/listUsersReducer";
import userReducer from "./Reducers/userReducer";
import userInfoReducer from "./Reducers/userInfoReducer";
import registerReducer from "./Reducers/registerReducer";
import courseReducer from "./Reducers/courseReducer";
import registerCoursesReducer from "./Reducers/registerCourses";
import joinCoursesReducer from "./Reducers/joinCoursesReducer";
import registationByCourseReducer from "./Reducers/registationByCourseReducer";
import catalogReducer from "./Reducers/catalogReducer";
import registationByUserReducer from "./Reducers/registationByUserReducer";
export const store = configureStore({
  reducer: {
    courseCatalogReducer,
    courseByPageReducer,
    listCourseReducer,
    detailCourseReducer,
    courseByCategoryReducer,
    loginReducer,
    userReducer,
    listUsersReducer,
    userInfoReducer,
    registerReducer,
    courseReducer,
    registerCoursesReducer,
    joinCoursesReducer,
    registationByCourseReducer,
    catalogReducer,
    registationByUserReducer,
  },
});
