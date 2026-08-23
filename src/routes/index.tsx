import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import ExamplePage from "../pages/ExamplePage";
import DrawingPage from "../pages/DrawingPage";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "draw",
        element: <DrawingPage />,
      },
      {
        path: "example",
        element: <ExamplePage />,
      }
    ],
  },
]);

export default router;