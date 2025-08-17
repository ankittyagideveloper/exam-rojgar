import "./App.css";
import Layout from "./component/Layout";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import PDF_Page from "./pages/PDF_Page";
import TestPage from "./pages/TestPage";
import PurchasePage from "./pages/PurchasePage";

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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
