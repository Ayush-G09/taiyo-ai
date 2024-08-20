import { createBrowserRouter } from "react-router-dom";
import Auth from "./views/Auth";
import Layout from "./views/Layout";
import Contacts from "./views/Contacts";
import ChartsAndMaps from "./views/ChartsAndMaps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/contacts",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Contacts/>,
      },
    ]
  },
  {
    path: "/chartsandmaps",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ChartsAndMaps/>,
      },
    ]
  },
]);