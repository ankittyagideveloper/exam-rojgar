import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import QuestionAdmin from "./QuestionAdmin";
export default function AdminPanel() {
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(90);
  const [editingTestId, setEditingTestId] = useState(null);
  const db = getFirestore(app);
  useEffect(() => {
    fetchTests();
  }, []);
  const fetchTests = async () => {
    const snap = await getDocs(collection(db, "tests"));
    setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const createOrUpdateTest = async () => {
    if (!title) return alert("Enter test title");
    if (editingTestId) {
      const ref = doc(db, "tests", editingTestId);
      await updateDoc(ref, { title, durationMinutes: duration });
    } else {
      await addDoc(collection(db, "tests"), {
        title,
        totalQuestions: 100,
        durationMinutes: duration,
        totalMarks: 100,
        createdAt: new Date(),
        isActive: true,
      });
    }
    setTitle("");
    setDuration(90);
    setEditingTestId(null);
    fetchTests();
  };
  const handleEdit = (test) => {
    setEditingTestId(test.id);
    setTitle(test.title);
    setDuration(test.durationMinutes);
  };
  const handleDelete = async (testId) => {
    const ok = window.confirm("Are you sure you want to delete this test?");
    if (!ok) return;
    await deleteDoc(doc(db, "tests", testId));
    fetchTests();
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {" "}
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel – Test Series
      </h1>{" "}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        {" "}
        <h2 className="text-xl font-semibold mb-4">
          {" "}
          {editingTestId ? "Update Test" : "Create New Test"}{" "}
        </h2>{" "}
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <input
          className="border p-2 w-full mb-3 rounded"
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />{" "}
        <div className="flex gap-3">
          {" "}
          <button
            onClick={createOrUpdateTest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {" "}
            {editingTestId ? "Update Test" : "Create Test"}{" "}
          </button>{" "}
          {editingTestId && (
            <button
              onClick={() => {
                setEditingTestId(null);
                setTitle("");
                setDuration(90);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              {" "}
              Cancel{" "}
            </button>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-white p-6 rounded-xl shadow">
        {" "}
        <h2 className="text-xl font-semibold mb-4">All Tests</h2>{" "}
        <table className="w-full border">
          {" "}
          <thead className="bg-gray-200">
            {" "}
            <tr>
              {" "}
              <th className="p-2 border">Title</th>{" "}
              <th className="p-2 border">Duration</th>{" "}
              <th className="p-2 border">Status</th>{" "}
              <th className="p-2 border">Actions</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {tests.map((test) => (
              <tr key={test.id}>
                {" "}
                <td className="p-2 border">{test.title}</td>{" "}
                <td className="p-2 border">{test.durationMinutes} min</td>{" "}
                <td className="p-2 border">
                  {" "}
                  {test.isActive ? "Active" : "Inactive"}{" "}
                </td>{" "}
                <td className="p-2 border">
                  {" "}
                  <div className="flex gap-2">
                    {" "}
                    <button
                      onClick={() => handleEdit(test)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      {" "}
                      Edit{" "}
                    </button>{" "}
                    <button
                      onClick={() => handleDelete(test.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      {" "}
                      Delete{" "}
                    </button>{" "}
                  </div>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
      <QuestionAdmin />
    </div>
  );
}
