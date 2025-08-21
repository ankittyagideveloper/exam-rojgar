import "./App.css";
import Layout from "./component/Layout";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import PDF_Page from "./pages/PDF_Page";
import TestPage from "./pages/TestPage";
import PurchasePage from "./pages/PurchasePage";
import { useEffect, useState } from "react";
import Loader from "./component/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "test-category/*",
        element: <TestPage />,
      },
      {
        path: "quiz-category/*",
        element: <TestPage />,
      },

      // {
      //   path: "user-my-purchase",
      //   element: <PurchasePage />,
      // },
      {
        path: "pdf-category",
        element: <PDF_Page />,
      },
      {
        path: "/all-test/:categoryId",
        element: <QuizPage />,
      },
    ],
  },
  {
    path: "*",
    // element: <NotFound />,
  },
]);
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - you can adjust this or tie it to actual loading events
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <Loader /> : <RouterProvider router={router} />}</>;
}

export default App;
