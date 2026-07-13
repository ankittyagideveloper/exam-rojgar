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
import { ClerkProvider } from "@clerk/clerk-react";
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
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";
import AllQuizResult from "./component/quiz/AllQuizResult";
import LearnPage from "./pages/LearnPage";
import CoursePage from "./pages/CoursePage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import SangamMockTestPage from "./pages/SangamMockTestPage";
import ProfitLossDiscountMockTestPage from "./pages/ProfitLossDiscountMockTestPage";
import VijayanagarBahmaniMockTestPage from "./pages/VijayanagarBahmaniMockTestPage";
import RevisionTest2MockTestPage from "./pages/RevisionTest2MockTestPage";
import RevisionTest1MockTestPage from "./pages/RevisionTest1MockTestPage";
import HarappaMockTestPage from "./pages/HarappaMockTestPage";
import HCFLCMMockTestPage from "./pages/HCFLCMMockTestPage";
import EnvironmentQuizMockTestPage from "./pages/EnvironmentQuizMockTestPage";
import MahajanpadMockTestPage from "./pages/MahajanpadMockTestPage";
import JainismMockTestPage from "./pages/JainismMockTestPage";
import BuddhismMockTestPage from "./pages/BuddhismMockTestPage";
import AverageMockTestPage from "./pages/AverageMockTestPage";
import PostMauryanEmpireMockTestPage from "./pages/PostMauryanEmpireMockTestPage";
import MauryanEmpireMockTestPage from "./pages/MauryanEmpireMockTestPage";
import GuptaMockTestPage from "./pages/GuptaMockTestPage";
import MixtureAlligationMockTestPage from "./pages/MixtureAlligationMockTestPage";
import DelhiSultanateMockTestPage from "./pages/DelhiSultanateMockTestPage";
import VedicMock2MockTestPage from "./pages/VedicMock2MockTestPage";
import CompoundInterestMockTestPage from "./pages/CompoundInterestMockTestPage";
import PipeCisternMockTestPage from "./pages/PipeCisternMockTestPage";
import RevisionMockTestPage from "./pages/RevisionMockTestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
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
        path: "learn",
        element: <LearnPage />,
      },
      {
        path: "learn/:courseName",
        element: <CoursePage />,
      },
      {
        path: "learn/:courseName/:videoId",
        element: <VideoPlayerPage />,
      },
      {
        path: "online-test-series/*",
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
        path: "/attempt/:attemptId/result",
        element: (
          <ProtectedRoute>
            <AllQuizResult />
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
      {
        path: "*",
        element: (
          <ErrorPage
            code="404"
            title="Page Not Found"
            message="The page you are looking for doesn't exist or has been moved."
          />
        ),
      },
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
  {
    path: "/mock-test",
    element: (
      <ProtectedRoute>
        <TestLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "sangam", element: <SangamMockTestPage /> },
      {
        path: "profit-loss-discount",
        element: <ProfitLossDiscountMockTestPage />,
      },
      {
        path: "vijayanagar-bahmani",
        element: <VijayanagarBahmaniMockTestPage />,
      },
      { path: "revision-test-1", element: <RevisionTest1MockTestPage /> },
      { path: "revision-test-2", element: <RevisionTest2MockTestPage /> },
      { path: "harappa", element: <HarappaMockTestPage /> },
      { path: "hcf-lcm", element: <HCFLCMMockTestPage /> },
      { path: "environment-quiz", element: <EnvironmentQuizMockTestPage /> },
      { path: "mahajanpad", element: <MahajanpadMockTestPage /> },
      { path: "buddhism", element: <BuddhismMockTestPage /> },
      { path: "jainism", element: <JainismMockTestPage /> },
      { path: "average", element: <AverageMockTestPage /> },
      {
        path: "post-mauryan-empire",
        element: <PostMauryanEmpireMockTestPage />,
      },
      { path: "mauryan-empire", element: <MauryanEmpireMockTestPage /> },
      { path: "gupta", element: <GuptaMockTestPage /> },
      {
        path: "mixture-alligation",
        element: <MixtureAlligationMockTestPage />,
      },

      { path: "delhi-sultanate", element: <DelhiSultanateMockTestPage /> },

      { path: "vedic-mock-2", element: <VedicMock2MockTestPage /> },

      { path: "compound-interest", element: <CompoundInterestMockTestPage /> },
    
      { path: "pipe-cistern", element: <PipeCisternMockTestPage /> },
    
      { path: "Revision", element: <RevisionMockTestPage /> },
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <RouterProvider router={router} />
          </ClerkProvider>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
