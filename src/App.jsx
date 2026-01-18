import "./App.css";
import Layout from "./component/Layout";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import PDF_Page from "./pages/PDF_Page";
import { useEffect, useState } from "react";
import Loader from "./component/Loader";
import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";
import ProtectedRoute, { AdminRoute } from "./component/ProtectedRoute";
import TestLayout from "./component/test-layout/TestLayout";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import AttemptedTests from "./pages/AttemptedTests";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TestsListPage from "./pages/admin/TestsListPage";
import TestDetailLayout from "./pages/admin/TestDetailLayout";
import TestQuestionsPage from "./pages/admin/TestQuestionsPage";
import TestSettingsPage from "./pages/admin/TestSettingsPage";
import TestPreviewPage from "./pages/admin/TestPreviewPage";
import TestPage from "./pages/TestPage";
import Quiz from "./pages/Quiz";
import AllQuizComponent from "./pages/AllQuizComponent";
import QuestionBankPage from "./pages/admin/QuestionBankPage";

function PublicRoute({ children }) {
  const { isSignedIn } = useUser();
  return isSignedIn ? <Navigate to="/home" replace /> : <>{children}</>;
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "test-category/*",
          element: (
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "quiz-category/*",
          element: (
            <ProtectedRoute>
              <Quiz />
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
        {
          path: "attempted-tests",
          element: (
            <ProtectedRoute>
              <AttemptedTests />
            </ProtectedRoute>
          ),
        },

        {
          path: "admin",
          element: (
            <AdminRoute>
              <Outlet />
            </AdminRoute>
          ),
          children: [
            {
              path: "tests",
              element: <TestsListPage />,
            },
            {
              path: "question-bank",
              element: <QuestionBankPage />,
            },
            {
              path: "tests/:testId",
              element: <TestDetailLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="questions" replace />,
                },
                {
                  path: "questions",
                  element: <TestQuestionsPage />,
                },
                {
                  path: "settings",
                  element: <TestSettingsPage />,
                },
                {
                  path: "preview",
                  element: <TestPreviewPage />,
                },
              ],
            },
          ],
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
    {
      path: "/all-quiz/:categoryId/attempt/:attemptId",
      element: <TestLayout />,
      children: [
        {
          index: true,
          element: <AllQuizComponent />,
        },
      ],
    },
  ],
  // {
  //   basename: "/",
  // }
);
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
        <HelmetProvider>
          <ThemeProvider>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
              <RouterProvider router={router} />
            </ClerkProvider>
          </ThemeProvider>
        </HelmetProvider>
      )}
    </>
  );
}

export default App;
