import "./App.css";
import React, { lazy, Suspense } from "react";
import { UpdateToast } from "./component/UpdateToast";
import AutoNotificationPrompt from "./component/AutoNotificationPrompt";
import Layout from "./component/Layout";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedRoute, { AdminRoute } from "./component/ProtectedRoute";
import TestLayout from "./component/test-layout/TestLayout";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

// Lazy-loaded pages and secondary routes to dramatically decrease initial bundle size & JavaScript execution time
const QuizPage = lazy(() => import("./pages/QuizPage"));
const PDF_Page = lazy(() => import("./pages/PDF_Page"));
const AttemptedTests = lazy(() => import("./pages/AttemptedTests"));
const TestsListPage = lazy(() => import("./pages/admin/TestsListPage"));
const TestDetailLayout = lazy(() => import("./pages/admin/TestDetailLayout"));
const TestQuestionsPage = lazy(() => import("./pages/admin/TestQuestionsPage"));
const TestSettingsPage = lazy(() => import("./pages/admin/TestSettingsPage"));
const TestPreviewPage = lazy(() => import("./pages/admin/TestPreviewPage"));
const TestPage = lazy(() => import("./pages/TestPage"));
const Quiz = lazy(() => import("./pages/Quiz"));
const AllQuizComponent = lazy(() => import("./pages/AllQuizComponent"));
const QuestionBankPage = lazy(() => import("./pages/admin/QuestionBankPage"));
const AllQuizResult = lazy(() => import("./component/quiz/AllQuizResult"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const VideoPlayerPage = lazy(() => import("./pages/VideoPlayerPage"));
const TargetSeriesPage = lazy(() => import("./pages/mentorship/Mentorship"));
const FreeTestsPage = lazy(() => import("./pages/FreeTestsPage"));
const TestSeriesDemoPage = lazy(() => import("./pages/TestSeriesDemoPage"));

// Lazy-loaded mock test pages
const SangamMockTestPage = lazy(() => import("./pages/SangamMockTestPage"));
const ProfitLossDiscountMockTestPage = lazy(() => import("./pages/ProfitLossDiscountMockTestPage"));
const VijayanagarBahmaniMockTestPage = lazy(() => import("./pages/VijayanagarBahmaniMockTestPage"));
const RevisionTest2MockTestPage = lazy(() => import("./pages/RevisionTest2MockTestPage"));
const RevisionTest1MockTestPage = lazy(() => import("./pages/RevisionTest1MockTestPage"));
const HarappaMockTestPage = lazy(() => import("./pages/HarappaMockTestPage"));
const HCFLCMMockTestPage = lazy(() => import("./pages/HCFLCMMockTestPage"));
const EnvironmentQuizMockTestPage = lazy(() => import("./pages/EnvironmentQuizMockTestPage"));
const MahajanpadMockTestPage = lazy(() => import("./pages/MahajanpadMockTestPage"));
const JainismMockTestPage = lazy(() => import("./pages/JainismMockTestPage"));
const BuddhismMockTestPage = lazy(() => import("./pages/BuddhismMockTestPage"));
const AverageMockTestPage = lazy(() => import("./pages/AverageMockTestPage"));
const PostMauryanEmpireMockTestPage = lazy(() => import("./pages/PostMauryanEmpireMockTestPage"));
const MauryanEmpireMockTestPage = lazy(() => import("./pages/MauryanEmpireMockTestPage"));
const GuptaMockTestPage = lazy(() => import("./pages/GuptaMockTestPage"));
const MixtureAlligationMockTestPage = lazy(() => import("./pages/MixtureAlligationMockTestPage"));
const DelhiSultanateMockTestPage = lazy(() => import("./pages/DelhiSultanateMockTestPage"));
const VedicMock2MockTestPage = lazy(() => import("./pages/VedicMock2MockTestPage"));
const CompoundInterestMockTestPage = lazy(() => import("./pages/CompoundInterestMockTestPage"));
const PipeCisternMockTestPage = lazy(() => import("./pages/PipeCisternMockTestPage"));
const RevisionMockTestPage = lazy(() => import("./pages/RevisionMockTestPage"));
const RevisionTest3MockTestPage = lazy(() => import("./pages/RevisionTest3MockTestPage"));
const PercentageMockTestPage = lazy(() => import("./pages/PercentageMockTestPage"));
const MughalMockTestPage = lazy(() => import("./pages/MughalMockTestPage"));
const RatioMockTestPage = lazy(() => import("./pages/RatioMockTestPage"));
const ProfitMockTestPage = lazy(() => import("./pages/ProfitMockTestPage"));
const VijayNagarAndBahmaniMockTestPage = lazy(() => import("./pages/VijayNagarAndBahmaniMockTestPage"));
const BhaktiAndSufiMockTestPage = lazy(() => import("./pages/BhaktiAndSufiMockTestPage"));
const TimeAndWorkMockTestPage = lazy(() => import("./pages/TimeAndWorkMockTestPage"));
const MarathaMockTestPage = lazy(() => import("./pages/MarathaMockTestPage"));
const PipeMockTestPage = lazy(() => import("./pages/PipeMockTestPage"));
const AdventMockTestPage = lazy(() => import("./pages/AdventMockTestPage"));
const TimeSpeedDistanceBoatMockTestPage = lazy(() => import("./pages/TimeSpeedDistanceBoatMockTestPage"));
const TimeMockTestPage = lazy(() => import("./pages/TimeMockTestPage"));
const RevoltEconomicImpactPeasantMockTestPage = lazy(() => import("./pages/RevoltEconomicImpactPeasantMockTestPage"));
const HostoryFullRevisionTestMockTestPage = lazy(() => import("./pages/HostoryFullRevisionTestMockTestPage"));
const ModernHistoryExtremistPhaseMockTestPage = lazy(() => import("./pages/ModernHistoryExtremistPhaseMockTestPage"));
const RailwayMockTestPage = lazy(() => import("./pages/RailwayMockTestPage"));
const PolityConstitutionAndPreambleAndSourcesMockTestPage = lazy(() => import("./pages/PolityConstitutionAndPreambleAndSourcesMockTestPage"));
const ScheduleCitizenshipMockTestPage = lazy(() => import("./pages/ScheduleCitizenshipMockTestPage"));
const ArithmeticSectionalTestMockTestPage = lazy(() => import("./pages/ArithmeticSectionalTestMockTestPage"));
const FundamentalRightsAndDpSpMockTestPage = lazy(() => import("./pages/FundamentalRightsAndDpSpMockTestPage"));
const ParliamentMockTestPage = lazy(() => import("./pages/ParliamentMockTestPage"));
const AmendmentsMockTestPage = lazy(() => import("./pages/AmendmentsMockTestPage"));
const MathsMockTestPage = lazy(() => import("./pages/MathsMockTestPage"));
const GeographyBasicsTest1MockTestPage = lazy(() => import("./pages/GeographyBasicsTest1MockTestPage"));
const MilitaryExerciseTest1MockTestPage = lazy(() => import("./pages/MilitaryExerciseTest1MockTestPage"));
const PresidentGovernorPmTest1MockTestPage = lazy(() => import("./pages/PresidentGovernorPmTest1MockTestPage"));
const StateLegislaturePanchayatiRajTest1MockTestPage = lazy(() => import("./pages/StateLegislaturePanchayatiRajTest1MockTestPage"));
const MixtureAlligationTest2MockTestPage = lazy(() => import("./pages/MixtureAlligationTest2MockTestPage"));
const LineAnglesTest1MockTestPage = lazy(() => import("./pages/LineAnglesTest1MockTestPage"));
const Cbt2UgTest1MockTestPage = lazy(() => import("./pages/Cbt2UgTest1MockTestPage"));
const ImportantDaysTest1MockTestPage = lazy(() => import("./pages/ImportantDaysTest1MockTestPage"));
const TrigonometryMockTestPage = lazy(() => import("./pages/TrigonometryMockTestPage"));
const HeightMockTestPage = lazy(() => import("./pages/HeightMockTestPage"));
const TransportationSystemMockTestPage = lazy(() => import("./pages/TransportationSystemMockTestPage"));
const SportsMockTestPage = lazy(() => import("./pages/SportsMockTestPage"));
const MedievalHistoryRajputAndTriPartiteMockTestPage = lazy(() => import("./pages/MedievalHistoryRajputAndTriPartiteMockTestPage"));
const CurrentAffairsPyqTest1MockTestPage = lazy(() => import("./pages/CurrentAffairsPyqTest1MockTestPage"));
const TrianglesTest1MockTestPage = lazy(() => import("./pages/TrianglesTest1MockTestPage"));
const RegulatingMockTestPage = lazy(() => import("./pages/RegulatingMockTestPage"));
const ConstitutionalBodiesMockTestPage = lazy(() => import("./pages/ConstitutionalBodiesMockTestPage"));
const GkPolityTest1MockTestPage = lazy(() => import("./pages/GkPolityTest1MockTestPage"));
const RevisionTestPolityFullMockTestPage = lazy(() => import("./pages/RevisionTestPolityFullMockTestPage"));
const GeographyFullTest1MockTestPage = lazy(() => import("./pages/GeographyFullTest1MockTestPage"));
const AdvanceMathsMensurationMockTestPage = lazy(() => import("./pages/AdvanceMathsMensurationMockTestPage"));
const UniverseLatitudeAndLongitudeMockTestPage = lazy(() => import("./pages/UniverseLatitudeAndLongitudeMockTestPage"));
const EconomicsGDPGNPBasics1MockTestPage = lazy(() => import("./pages/EconomicsGDPGNPBasics1MockTestPage"));
const RRBNTPCEconomyLecture2InflationMockTestPage = lazy(() => import("./pages/RRBNTPCEconomyLecture2InflationMockTestPage"));
const RRBNTPCEconomyLecture3MonetaryPolicyMockTestPage = lazy(() => import("./pages/RRBNTPCEconomyLecture3MonetaryPolicyMockTestPage"));
const RRBNTPCEconomyLecture4TaxationMockTestPage = lazy(() => import("./pages/RRBNTPCEconomyLecture4TaxationMockTestPage"));
const EconomyFullTestMockTestPage = lazy(() => import("./pages/EconomyFullTestMockTestPage"));
const CircleTest1MockTestPage = lazy(() => import("./pages/CircleTest1MockTestPage"));
const QuadrilateralTest1MockTestPage = lazy(() => import("./pages/QuadrilateralTest1MockTestPage"));
const PolygonTest1MockTestPage = lazy(() => import("./pages/PolygonTest1MockTestPage"));
const BudgetAndEconomicSurveyTest1MockTestPage = lazy(() => import("./pages/BudgetAndEconomicSurveyTest1MockTestPage"));
const MsWordPyqMockTestPage = lazy(() => import("./pages/MsWordPyqMockTestPage"));
const MsPowerpointMockTestPage = lazy(() => import("./pages/MsPowerpointMockTestPage"));
const MsExcelMockTestPage = lazy(() => import("./pages/MsExcelMockTestPage"));
const MsOfficeMsWordMockTestPage = lazy(() => import("./pages/MsOfficeMsWordMockTestPage"));
const ComputerLecture2CPUandMemoryMockTestPage = lazy(() => import("./pages/ComputerLecture2CPUandMemoryMockTestPage"));
const ComputerLecture1FundamentalsTestMockTestPage = lazy(() => import("./pages/ComputerLecture1FundamentalsTestMockTestPage"));
const ComputerOperatingSystemlecture3MockTestPage = lazy(() => import("./pages/ComputerOperatingSystemlecture3MockTestPage"));
const HeatAndLightTest1MockTestPage = lazy(() => import("./pages/HeatAndLightTest1MockTestPage"));
const ElectricityAndMagnetismTest1MockTestPage = lazy(() => import("./pages/ElectricityAndMagnetismTest1MockTestPage"));
const GravitationPressureElasticityWavesTest1MockTestPage = lazy(() => import("./pages/GravitationPressureElasticityWavesTest1MockTestPage"));

const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Inline redirect element — only redirects when the route is actually rendered
const ExternalRedirect = ({ url }) => {
  window.location.replace(url);
  return null;
};

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
        element: (
          <Suspense fallback={<RouteLoader />}>
            <LearnPage />
          </Suspense>
        ),
      },
      {
        path: "learn/:courseName",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CoursePage />
          </Suspense>
        ),
      },
      {
        path: "learn/:courseName/:videoId",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <VideoPlayerPage />
          </Suspense>
        ),
      },
      {
        path: "online-test-series/*",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<RouteLoader />}>
              <TestPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "quiz-category/*",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<RouteLoader />}>
              <Quiz />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "free-tests/*",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <FreeTestsPage />
          </Suspense>
        ),
      },
      {
        path: "pdf-category",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PDF_Page />
          </Suspense>
        ),
      },
      {
        path: "attempted-tests",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<RouteLoader />}>
              <AttemptedTests />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/attempt/:attemptId/result",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<RouteLoader />}>
              <AllQuizResult />
            </Suspense>
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
            element: (
              <Suspense fallback={<RouteLoader />}>
                <TestsListPage />
              </Suspense>
            ),
          },
          {
            path: "question-bank",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <QuestionBankPage />
              </Suspense>
            ),
          },
          {
            path: "tests/:testId",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <TestDetailLayout />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="questions" replace />,
              },
              {
                path: "questions",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <TestQuestionsPage />
                  </Suspense>
                ),
              },
              {
                path: "settings",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <TestSettingsPage />
                  </Suspense>
                ),
              },
              {
                path: "preview",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <TestPreviewPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/whatsapp",
        element: (
          <ExternalRedirect url="https://whatsapp.com/channel/0029VbAqJ1MHLHQV47i0lI3u" />
        ),
      },
      {
        path: "/telegram",
        element: <ExternalRedirect url="https://t.me/ExamRojgaar" />,
      },
      {
        path: "/youtube",
        element: (
          <ExternalRedirect url="https://www.youtube.com/@ExamRojgaar" />
        ),
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
        element: (
          <Suspense fallback={<RouteLoader />}>
            <QuizPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/all-quiz/:categoryId/attempt/:attemptId",
    element: <TestLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AllQuizComponent />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/mock-test",
    element: (
      <ProtectedRoute requirePremium>
        <TestLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "sangam", element: <Suspense fallback={<RouteLoader />}><SangamMockTestPage /></Suspense> },
      {
        path: "profit-loss-discount",
        element: <Suspense fallback={<RouteLoader />}><ProfitLossDiscountMockTestPage /></Suspense>,
      },
      {
        path: "vijayanagar-bahmani",
        element: <Suspense fallback={<RouteLoader />}><VijayanagarBahmaniMockTestPage /></Suspense>,
      },
      { path: "revision-test-1", element: <Suspense fallback={<RouteLoader />}><RevisionTest1MockTestPage /></Suspense> },
      { path: "revision-test-2", element: <Suspense fallback={<RouteLoader />}><RevisionTest2MockTestPage /></Suspense> },
      { path: "harappa", element: <Suspense fallback={<RouteLoader />}><HarappaMockTestPage /></Suspense> },
      { path: "hcf-lcm", element: <Suspense fallback={<RouteLoader />}><HCFLCMMockTestPage /></Suspense> },
      { path: "environment-quiz", element: <Suspense fallback={<RouteLoader />}><EnvironmentQuizMockTestPage /></Suspense> },
      { path: "mahajanpad", element: <Suspense fallback={<RouteLoader />}><MahajanpadMockTestPage /></Suspense> },
      { path: "buddhism", element: <Suspense fallback={<RouteLoader />}><BuddhismMockTestPage /></Suspense> },
      { path: "jainism", element: <Suspense fallback={<RouteLoader />}><JainismMockTestPage /></Suspense> },
      { path: "average", element: <Suspense fallback={<RouteLoader />}><AverageMockTestPage /></Suspense> },
      {
        path: "post-mauryan-empire",
        element: <Suspense fallback={<RouteLoader />}><PostMauryanEmpireMockTestPage /></Suspense>,
      },
      { path: "mauryan-empire", element: <Suspense fallback={<RouteLoader />}><MauryanEmpireMockTestPage /></Suspense> },
      { path: "gupta", element: <Suspense fallback={<RouteLoader />}><GuptaMockTestPage /></Suspense> },
      {
        path: "mixture-alligation",
        element: <Suspense fallback={<RouteLoader />}><MixtureAlligationMockTestPage /></Suspense>,
      },
      { path: "delhi-sultanate", element: <Suspense fallback={<RouteLoader />}><DelhiSultanateMockTestPage /></Suspense> },
      { path: "vedic-mock-2", element: <Suspense fallback={<RouteLoader />}><VedicMock2MockTestPage /></Suspense> },
      { path: "compound-interest", element: <Suspense fallback={<RouteLoader />}><CompoundInterestMockTestPage /></Suspense> },
      { path: "pipe-cistern", element: <Suspense fallback={<RouteLoader />}><PipeCisternMockTestPage /></Suspense> },
      { path: "revision", element: <Suspense fallback={<RouteLoader />}><RevisionMockTestPage /></Suspense> },
      { path: "revision-test-3", element: <Suspense fallback={<RouteLoader />}><RevisionTest3MockTestPage /></Suspense> },
      { path: "percentage", element: <Suspense fallback={<RouteLoader />}><PercentageMockTestPage /></Suspense> },
      { path: "mughal", element: <Suspense fallback={<RouteLoader />}><MughalMockTestPage /></Suspense> },
      { path: "ratio", element: <Suspense fallback={<RouteLoader />}><RatioMockTestPage /></Suspense> },
      { path: "profit", element: <Suspense fallback={<RouteLoader />}><ProfitMockTestPage /></Suspense> },
      {
        path: "vijay-nagar-and-bahmani",
        element: <Suspense fallback={<RouteLoader />}><VijayNagarAndBahmaniMockTestPage /></Suspense>,
      },
      { path: "bhakti-and-sufi", element: <Suspense fallback={<RouteLoader />}><BhaktiAndSufiMockTestPage /></Suspense> },
      { path: "time-and-work", element: <Suspense fallback={<RouteLoader />}><TimeAndWorkMockTestPage /></Suspense> },
      { path: "maratha", element: <Suspense fallback={<RouteLoader />}><MarathaMockTestPage /></Suspense> },
      { path: "pipe", element: <Suspense fallback={<RouteLoader />}><PipeMockTestPage /></Suspense> },
      { path: "advent", element: <Suspense fallback={<RouteLoader />}><AdventMockTestPage /></Suspense> },
      {
        path: "time-speed-distance-boat",
        element: <Suspense fallback={<RouteLoader />}><TimeSpeedDistanceBoatMockTestPage /></Suspense>,
      },
      { path: "time", element: <Suspense fallback={<RouteLoader />}><TimeMockTestPage /></Suspense> },
      { path: "revolt-economic-impact-peasant", element: <Suspense fallback={<RouteLoader />}><RevoltEconomicImpactPeasantMockTestPage /></Suspense> },
      { path: "history-full-revision-test", element: <Suspense fallback={<RouteLoader />}><HostoryFullRevisionTestMockTestPage /></Suspense> },
      { path: "modern-history-extremist-phase", element: <Suspense fallback={<RouteLoader />}><ModernHistoryExtremistPhaseMockTestPage /></Suspense> },
      { path: "dummy-test", element: <Suspense fallback={<RouteLoader />}><RailwayMockTestPage /></Suspense> },
      { path: "polity-constitution-and-preamble-and-sources", element: <Suspense fallback={<RouteLoader />}><PolityConstitutionAndPreambleAndSourcesMockTestPage /></Suspense> },
      { path: "schedule-citizenship", element: <Suspense fallback={<RouteLoader />}><ScheduleCitizenshipMockTestPage /></Suspense> },
      { path: "arithmetic-sectional-test", element: <Suspense fallback={<RouteLoader />}><ArithmeticSectionalTestMockTestPage /></Suspense> },
      { path: "test-series-demo", element: <Suspense fallback={<RouteLoader />}><TestSeriesDemoPage /></Suspense> },
      { path: "fundamental-rights-and-dp-sp", element: <Suspense fallback={<RouteLoader />}><FundamentalRightsAndDpSpMockTestPage /></Suspense> },
      { path: "parliament", element: <Suspense fallback={<RouteLoader />}><ParliamentMockTestPage /></Suspense> },
      { path: "amendments", element: <Suspense fallback={<RouteLoader />}><AmendmentsMockTestPage /></Suspense> },
      { path: "maths", element: <Suspense fallback={<RouteLoader />}><MathsMockTestPage /></Suspense> },
      { path: "geography-basics-test-1", element: <Suspense fallback={<RouteLoader />}><GeographyBasicsTest1MockTestPage /></Suspense> },
      { path: "military-exercise-test-1", element: <Suspense fallback={<RouteLoader />}><MilitaryExerciseTest1MockTestPage /></Suspense> },
      { path: "president-governor-pm-test-1", element: <Suspense fallback={<RouteLoader />}><PresidentGovernorPmTest1MockTestPage /></Suspense> },
      { path: "state-legislature-panchayati-raj-test-1", element: <Suspense fallback={<RouteLoader />}><StateLegislaturePanchayatiRajTest1MockTestPage /></Suspense> },
      { path: "mixture-alligation-test-2", element: <Suspense fallback={<RouteLoader />}><MixtureAlligationTest2MockTestPage /></Suspense> },
      { path: "revision-test-1-mock-test", element: <Suspense fallback={<RouteLoader />}><RevisionTest1MockTestPage /></Suspense> },
      { path: "line-angles-test-1", element: <Suspense fallback={<RouteLoader />}><LineAnglesTest1MockTestPage /></Suspense> },
      { path: "cbt2-ug-test-1", element: <Suspense fallback={<RouteLoader />}><Cbt2UgTest1MockTestPage /></Suspense> },
      { path: "important-days-test-1", element: <Suspense fallback={<RouteLoader />}><ImportantDaysTest1MockTestPage /></Suspense> },
      { path: "Trigonometry", element: <Suspense fallback={<RouteLoader />}><TrigonometryMockTestPage /></Suspense> },
      { path: "Height", element: <Suspense fallback={<RouteLoader />}><HeightMockTestPage /></Suspense> },
      { path: "TransportationSystem", element: <Suspense fallback={<RouteLoader />}><TransportationSystemMockTestPage /></Suspense> },
      { path: "Sports", element: <Suspense fallback={<RouteLoader />}><SportsMockTestPage /></Suspense> },
      { path: "MedievalHistoryRajputAndTriPartite", element: <Suspense fallback={<RouteLoader />}><MedievalHistoryRajputAndTriPartiteMockTestPage /></Suspense> },
      { path: "triangles-test-1", element: <Suspense fallback={<RouteLoader />}><TrianglesTest1MockTestPage /></Suspense> },
      { path: "Regulating", element: <Suspense fallback={<RouteLoader />}><RegulatingMockTestPage /></Suspense> },
      { path: "ConstitutionalBodies", element: <Suspense fallback={<RouteLoader />}><ConstitutionalBodiesMockTestPage /></Suspense> },
      { path: "RevisionTestPolityFull", element: <Suspense fallback={<RouteLoader />}><RevisionTestPolityFullMockTestPage /></Suspense> },
      { path: "geography-full-test-1", element: <Suspense fallback={<RouteLoader />}><GeographyFullTest1MockTestPage /></Suspense> },
      { path: "AdvanceMathsMensuration", element: <Suspense fallback={<RouteLoader />}><AdvanceMathsMensurationMockTestPage /></Suspense> },
      { path: "UniverseLatitudeAndLongitude", element: <Suspense fallback={<RouteLoader />}><UniverseLatitudeAndLongitudeMockTestPage /></Suspense> },
      { path: "EconomicsGDPGNPBasics1", element: <Suspense fallback={<RouteLoader />}><EconomicsGDPGNPBasics1MockTestPage /></Suspense> },
      { path: "RRBNTPCEconomyLecture2Inflation", element: <Suspense fallback={<RouteLoader />}><RRBNTPCEconomyLecture2InflationMockTestPage /></Suspense> },
      { path: "RRBNTPCEconomyLecture3MonetaryPolicy", element: <Suspense fallback={<RouteLoader />}><RRBNTPCEconomyLecture3MonetaryPolicyMockTestPage /></Suspense> },
      { path: "RRBNTPCEconomyLecture4Taxation", element: <Suspense fallback={<RouteLoader />}><RRBNTPCEconomyLecture4TaxationMockTestPage /></Suspense> },
      { path: "EconomyFullTest", element: <Suspense fallback={<RouteLoader />}><EconomyFullTestMockTestPage /></Suspense> },
      { path: "circle-test-1", element: <Suspense fallback={<RouteLoader />}><CircleTest1MockTestPage /></Suspense> },
      { path: "polygon-test-1", element: <Suspense fallback={<RouteLoader />}><PolygonTest1MockTestPage /></Suspense> },
      { path: "quadrilateral-test-1", element: <Suspense fallback={<RouteLoader />}><QuadrilateralTest1MockTestPage /></Suspense> },
      { path: "budget-and-economic-survey-test-1", element: <Suspense fallback={<RouteLoader />}><BudgetAndEconomicSurveyTest1MockTestPage /></Suspense> },
      { path: "MsWordPyq", element: <Suspense fallback={<RouteLoader />}><MsWordPyqMockTestPage /></Suspense> },
      { path: "MsPowerpoint", element: <Suspense fallback={<RouteLoader />}><MsPowerpointMockTestPage /></Suspense> },
      { path: "MsExcel", element: <Suspense fallback={<RouteLoader />}><MsExcelMockTestPage /></Suspense> },
      { path: "MsOfficeMsWord", element: <Suspense fallback={<RouteLoader />}><MsOfficeMsWordMockTestPage /></Suspense> },
      { path: "ComputerLecture2CPUandMemory", element: <Suspense fallback={<RouteLoader />}><ComputerLecture2CPUandMemoryMockTestPage /></Suspense> },
      { path: "ComputerLecture1FundamentalsTest", element: <Suspense fallback={<RouteLoader />}><ComputerLecture1FundamentalsTestMockTestPage /></Suspense> },
      { path: "ComputerOperatingSystemlecture3", element: <Suspense fallback={<RouteLoader />}><ComputerOperatingSystemlecture3MockTestPage /></Suspense> },
      { path: "heat-and-light-test-1", element: <Suspense fallback={<RouteLoader />}><HeatAndLightTest1MockTestPage /></Suspense> },
      { path: "electricity-and-magnetism-test-1", element: <Suspense fallback={<RouteLoader />}><ElectricityAndMagnetismTest1MockTestPage /></Suspense> },
      { path: "gravitation-pressure-elasticity-waves-test-1", element: <Suspense fallback={<RouteLoader />}><GravitationPressureElasticityWavesTest1MockTestPage /></Suspense> },
    ],
  },
  {
    path: "/free-mock-test",
    element: <TestLayout />,
    children: [
      { path: "current-affairs-pyq-2026-test-1", element: <Suspense fallback={<RouteLoader />}><CurrentAffairsPyqTest1MockTestPage /></Suspense> },
      { path: "gk-polity-test-1", element: <Suspense fallback={<RouteLoader />}><GkPolityTest1MockTestPage /></Suspense> },
    ],
  },
  {
    path: "/target-series",
    element: (
      <Suspense fallback={<RouteLoader />}>
        <TargetSeriesPage />
      </Suspense>
    ),
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
            <UpdateToast />
            <AutoNotificationPrompt />
          </ClerkProvider>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
