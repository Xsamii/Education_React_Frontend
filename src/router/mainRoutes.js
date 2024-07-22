import LoginPage from "../pages/LoginPage";
import FunctionPage from "../pages/functionPage";
import SessionsPage from "../pages/session";
import CreateSession from "../pages/session/AddSession";
import StudentsPage from "../pages/student";
import CreateStudentPage from "../pages/student/CreateStudentPage";
import TeachersPage from "../pages/teacher";
import HomePage from "../pages/Home";
import CreateTeacher from "../pages/teacher/CreateTeacher";
import AddStudentToTeacher from "../pages/student/AddStudenttoTeacher";
import AllStudents from "../pages/student/AllStudents";
import UpdateCustomPricePage from "../pages/student/UpdateCustomPricePage";
import SessionsListPage from "../pages/session/AllSessions";
import SessionDetailsPage from "../pages/session/SessionDetails";
export const mainRoutes = [
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  {
    path: "/",
    element: <FunctionPage />,
  },
  {
    path: "/students",
    element: <StudentsPage />,
  },
  {
    path: "/teachers",
    element: <TeachersPage />,
  },
  {
    path: "/sessions",
    element: <SessionsPage />,
  },
  {
    path: "/dashboard",
    element: <h1>dashboard page</h1>,
  },
  {
    path: "/functions",
    element: <FunctionPage />,
  },
  {
    path: "/add-session",
    element: <CreateSession />,
  },
  {
    path: "/add-student",
    element: <CreateStudentPage />,
  },
  {
    path: "/students/create",
    element: <CreateStudentPage />,
  },
  {
    path: "/students/add-teacher",
    element: <AddStudentToTeacher />,
  },
  {
    path: "/students/all",
    element: <AllStudents />,
  },
  {
    path: "/students/update-custom-price",
    element: <UpdateCustomPricePage />,
  },
  {
    path: "/teachers/create",
    element: <CreateTeacher />,
  },
  {
    path: "/teacher/all",
    element: <></>,
  },
  {
    path: "/sessions/create",
    element: <CreateSession />,
  },
  {
    path: "/sessions/all",
    element: <SessionsListPage />,
  },
  {
    path: "/sessions/:id",
    element: <SessionDetailsPage />,
  },
];

export const studentRouts = [
  {
    path: "/student/create",
    element: <CreateStudentPage />,
  },
  {
    path: "/student/all",
    element: <></>,
  },
];
export const teacherRouts = [
  {
    path: "/teacher/create",
    element: <>Create Teacher</>,
  },
  {
    path: "/teacher/all",
    element: <></>,
  },
];

export const sessionsRoutes = [
  {
    path: "/sessions/create",
    element: <CreateSession />,
  },
  {
    path: "/sessions/all",
    element: <>all sessions</>,
  },
];
