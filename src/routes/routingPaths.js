import AddFoodItem from "../pages/addfooditem/AddFoodItem";
import AllFoodItem from "../pages/allfooditem/AllFoodItem";
import Login from "../pages/auth/Login";
import DailySaleReport from "../pages/dailysalereport/DailySaleReport";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import PrintSettings from "../pages/printettings/PrintSettings";
import UpdateFoodItem from "../pages/updatefooditem/UpdateFoodItem";

const routingPaths = [
  {
    id: 1,
    url: "/",
    element: <Dashboard />,
  },
  {
    id: 2,
    url: "/all-food-items",
    element: <AllFoodItem />,
  },
  {
    id: 3,
    url: "/add-food-items",
    element: <AddFoodItem />,
  },
  {
    id: 4,
    url: "/update-food-items",
    element: <UpdateFoodItem />,
  },
  {
    id: 5,
    url: "/daily-sale-report",
    element: <DailySaleReport />,
  },
  {
    id: 6,
    url: "/login",
    element: <Login />,
  },
  {
    id: 7,
    url: "*",
    element: <NotFoundPage />,
  },
  {
    id: 8,
    url: "/print-settings",
    element: <PrintSettings />,
  },
];

export default routingPaths;
