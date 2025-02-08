import { createBrowserRouter, Form } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import DashboardLayout from "../components/Layout/DashboardLayout/DashboardLayout";
import Home from "../pages/Homepage/home";
import About from "../pages/about";
import RegisterForm from "../pages/Homepage/RegisterForm";
import SettingsPage from "../pages/SettingsPage";
import Subcategories from "../pages/Dashboard/Subcategories";
import BookDetails from "../components/BookDetails";
import PurchaseList from "../components/PurchaseList";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import BalanceSheet from "../components/navigators/BalanceSheet";
import BooksLayout from "../components/Layout/BooksLayout/BooksLayout";
import SellList from "../components/navigators/SellList";
import UserManagement from "../components/UserManagement";
import Blog from "../pages/Blog";
import ExpenseSheet from "../components/Layout/BooksLayout/ExpenseSheet";
import HomepageLayout from "../pages/Homepage/HomepageLayout";
import POSMemo from "../components/Layout/BooksLayout/POSMemo";

import Category from "../components/Layout/BooksLayout/Category";

import AddBook from "../components/AddBook";

import PrintBalanceSheet from "../components/navigators/PrintBalanceSheet";
import PrintPurchaseList from "../components/PrintPurchaseList";
import PrintSellList from "../components/navigators/PrintSellList";
import SellBooks from "../components/Layout/BooksLayout/SellBooks";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MainHomepage from "../pages/Homepage/MainHomepage";
import Services from "../pages/Homepage/Services";
import ErrorPage from "../pages/Homepage/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<MainHomepage/>,
      },
      
      {
        path:"services",
        element:<Services/>,
      },
      {
        path:"error",
        element:<ErrorPage/>,
      },

    ],
  },
  {
    path:"/homeLayout",
    element: <HomepageLayout />,
    children: [
      {
        index:true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },

      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },

  {
    path: "book/:bookId",
    element: <BookDetails />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "bookmanagement",
        element: (
          <PrivateRoute>
            <BooksLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "add",
            element: <AddBook />,
          },
          {
            path: "sellBooks",
            element: <SellBooks></SellBooks>,
          },
          {
            path: "pos",
            element: <POSMemo />,
          },
        ],
      },

      {
        path: "categorydropdown",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },

      {
        path: ":category",
        element: (
          <PrivateRoute>
            {" "}
            <Subcategories />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch("https://libraryserver.atctechlimited.com/api/books")
            .then((response) => response.json())
            .then((books) =>
              books.filter((book) => book.category === params.category)
            ),
      },
      {
        path: "purchase-list",
        element: (
          <PrivateRoute>
            <PurchaseList />
          </PrivateRoute>
        ),
      },
      {
        path: "print-purchase-list",
        element: <PrintPurchaseList />,
      },

      {
        path: "sales-list",
        element: (
          <PrivateRoute>
            <SellList />
          </PrivateRoute>
        ),
      },
      {
        path: "print-sales-list",
        element: <PrintSellList />,
      },

      {
        path: "balancesheet",
        element: (
          <PrivateRoute>
            <BalanceSheet />
          </PrivateRoute>
        ),
      },
      {
        path: "print-balance-sheet",
        element: <PrintBalanceSheet />,
      },

      {
        path: "expense",
        element: (
          <PrivateRoute>
            <ExpenseSheet />
          </PrivateRoute>
        ),
      },
      {
        path: "usermanage",
        element: (
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        ),
      },

      {
        path: "settings",
        element: (
          <PrivateRoute>
            {" "}
            <SettingsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
