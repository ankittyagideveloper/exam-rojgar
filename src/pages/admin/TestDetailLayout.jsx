import { useParams, Outlet, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTestById } from '../../utils/firestoreHelpers';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../../firebase';
import { LoaderOne } from '../../components/ui/loader';
import { Card, CardContent } from '../../../components/ui/card';

const db = getFirestore(app);

/**
 * TestDetailLayout - Layout component with tabs for test detail pages
 * Tabs: Questions | Settings | Preview
 */
export default function TestDetailLayout() {
  const { testId } = useParams();

  const { data: test, isLoading, error } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => fetchTestById(db, testId),
    enabled: !!testId,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderOne />
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <p className="text-red-600">
              {error ? `Error: ${error.message}` : 'Test not found'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-1 bg-gray-100 md:py-8 md:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{test.title || 'Untitled Test'}</h1>
            <p className="text-gray-600 mt-1">Test ID: {test.testId || test.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                test.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {test.isActive ? 'Live' : 'Draft'}
            </span>
          </div>
        </div>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Duration: {test.durationMinutes || 0} minutes</span>
          <span>•</span>
          <span>Questions: {test.questionsCount || 0} (auto-calculated)</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1">
          <NavLink
            to={`/admin/tests/${testId}/questions`}
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm transition-colors ${
                isActive
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            Questions
          </NavLink>
          <NavLink
            to={`/admin/tests/${testId}/settings`}
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm transition-colors ${
                isActive
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to={`/admin/tests/${testId}/preview`}
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm transition-colors ${
                isActive
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            Preview
          </NavLink>
        </nav>
      </div>

      {/* Tab Content */}
      <Outlet context={{ test }} />
    </div>
  );
}
