import { Route } from "react-router-dom";
import AdminPage from "../pages/Admin";
import HomeTemplate from "../pages/Home";
import HomePage from "../pages/Home/Homepage";
import Courses from "../pages/Home/Courses";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import AboutUs from "../pages/Home/AboutUs";
import DetailCourse from "../pages/Home/DetailCourse";
import CoursesByCategory from "../pages/Home/CoursesByCategory";
import CoursePage from "../pages/Admin/CoursePage";
import RegistrationPage from "../pages/Admin/RegistationPage";
import ErrorPage from "../pages/Home/_components/404ErrorPage";
import Profile from "../pages/Home/Profile";
import UserPage from "../pages/Admin/UserPage";
import Information from "../pages/Home/Profile/Information";
import MyCourse from "../pages/Home/Profile/MyCourse";
import Scurity from "../pages/Home/Profile/Scurity";
import DetailCoursePage from "../pages/Admin/CoursePage/DetailCousePage";
import ErrorPage404 from "../pages/Admin/_components/ErrorPage404"; 
import ByUserPage from "../pages/Admin/RegistationPage/ByUser";
import ByCourse from "../pages/Admin/RegistationPage/ByCourse";
import CourseRegistation from "../pages/Admin/RegistationPage/ByCourse/CourseRegistation";
import ProfileAdminPage from "../pages/Admin/ProfileAdminPage";
import UserRegistation from "../pages/Admin/RegistationPage/ByUser/UserRegistation";
import DetailUserPage from "../pages/Admin/UserPage/DetailUserPage";
import UpdateUserPage from "../pages/Admin/UserPage/UpdateUserPage";
import UpdateCoursePage from "../pages/Admin/CoursePage/UpdateCourse";
const routes = [
  //   Home Template
  {
    path: "",
    element: HomeTemplate,
    nested: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "courses",
        element: Courses,
      },
      {
        path: "aboutus",
        element: AboutUs,
      },
      {
        path: "detail/:id",
        element: DetailCourse,
      },
      {
        path: "category/:id",
        element: CoursesByCategory,
      },
      {
        path: "404",
        element: ErrorPage,
      },
      {
        path: "profile",
        element: Profile,
        nested: [
          {
            path: "",
            element: Information,
          },
          {
            path: "my-courses",
            element: MyCourse,
          },
          {
            path: "security",
            element: Scurity,
          },
        ],
      },
    ],
  },
  //   Admin Template
  {
    path: "admin",
    element: AdminPage,
    nested: [
      {
        path: "user",
        element: UserPage,

      },
      {
        path: "user/:taiKhoan",
        element: DetailUserPage,
      },
      {
        path: "user/update/:taiKhoan",
        element: UpdateUserPage,
      },
      {
        path: "course/update/:maKhoaHoc",
        element: UpdateCoursePage,
      },
      {
        path: "",
        element: CoursePage,
      },
      {
        path: "registration",
        element: RegistrationPage,
        nested: [
          {
            path: "by-user",
            element: ByUserPage,
          },
          {
            path: "by-user/:taiKhoan",
            element: UserRegistation,
          },
          {
            path: "by-course",
            element: ByCourse,
          },
          {
            path: "by-course/:maKhoaHoc",
            element: CourseRegistation,
          }
        ]
      },
      {
        path: "detail-course/:id",
        element: DetailCoursePage,
      },
      {
        path: "error-404",
        element: ErrorPage404,
      },
      {
        path: "profile-admin",
        element: ProfileAdminPage,
      }

    ],
  },
  // Auth Page
  {
    path: "login",
    element: LoginPage,
  },
  {
    path: "registation",
    element: RegisterPage,
  },
];

export const renderRoutes = () => {
  const renderNestedRoutes = (nestedRoutes) => {
    return nestedRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={<route.element />}>
        {route.nested && renderNestedRoutes(route.nested)}
      </Route>
    ));
  };

  return routes.map((route, index) => {
    if (route.nested) {
      return (
        <Route key={index} path={route.path} element={<route.element />}>
          {renderNestedRoutes(route.nested)}
        </Route>
      );
    } else {
      return (
        <Route key={index} path={route.path} element={<route.element />} />
      );
    }
  });
};
