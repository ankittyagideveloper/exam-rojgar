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
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";
import ProtectedRoute from "./component/ProtectedRoute";
import TestLayout from "./component/test-layout/TestLayout";

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
        element: (
          <ProtectedRoute>
            <TestPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "quiz-category/*",
        element: (
          <ProtectedRoute>
            <TestPage />,
          </ProtectedRoute>
        ),
      },

      // {
      //   path: "user-my-purchase",
      //   element: <PurchasePage />,
      // },
      {
        path: "pdf-category",
        element: <PDF_Page />,
      },
      // {
      //   path: "/all-test/:categoryId",
      //   element: <QuizPage />,
      // },
    ],
  },
  {
    path: "/all-test/:categoryId",
    element: <TestLayout />,
    children: [
      {
        index: true,
        element: <QuizPage />,
      },
    ],
  },
]);
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - you can adjust this or tie it to actual loading events
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInUrl="/">
          <RouterProvider router={router} />
        </ClerkProvider>
      )}
    </>
  );
}

export default App;
