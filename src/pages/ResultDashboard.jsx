import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { app } from "../../firebase";

export function ResultsDashboard({ testId }) {
  const db = getFirestore(app);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const q = query(
      collection(db, "testResults"),
      where("testId", "==", testId),
      orderBy("score", "desc")
    );

    const snap = await getDocs(q);
    setResults(
      snap.docs.map((d, i) => ({ rank: i + 1, id: d.id, ...d.data() }))
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Results Dashboard</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Correct</th>
            <th className="p-2 border">Incorrect</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td className="p-2 border">{r.rank}</td>
              <td className="p-2 border">{r.userId}</td>
              <td className="p-2 border">{r.score}</td>
              <td className="p-2 border">{r.correct}</td>
              <td className="p-2 border">{r.incorrect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
