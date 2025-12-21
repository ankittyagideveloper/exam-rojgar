import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import QuestionAdmin from "./QuestionAdmin";
export default function AdminPanel() {
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState("");
  const [testId, setTestId] = useState("");
  const [duration, setDuration] = useState(90);
  const [editingTestId, setEditingTestId] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const [maxMarks, setMaxMarks] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const db = getFirestore(app);
  useEffect(() => {
    fetchTests().then((res) => console.log(res));
  }, []);
  const fetchTests = async () => {
    const snap = await getDocs(collection(db, "tests"));
    setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const createOrUpdateTest = async () => {
    if (!title) return alert("Enter test title");
    if (editingTestId) {
      const ref = doc(db, "tests", editingTestId);
      await updateDoc(ref, {
        isActive: Boolean(activeStatus),
        title,
        durationMinutes: duration,
        questionsCount,
        maxMarks,
      });
    } else {
      await setDoc(doc(db, "tests", testId), {
        testId,
        title,
        durationMinutes: duration,
        createdAt: new Date(),
        isActive: activeStatus,
      });
    }
    setTestId("");
    setTitle("");
    setDuration(90);
    setEditingTestId(null);
    setActiveStatus(false);
    fetchTests();
    setMaxMarks(0);
    setQuestionsCount(0);
  };
  const handleEdit = (test) => {
    setEditingTestId(test.testId);
    setTitle(test.title);
    setDuration(test.durationMinutes);
    setActiveStatus(test.isActive);
    setMaxMarks(test.maxMarks);
    setQuestionsCount(test.questionsCount);
  };
  const handleDelete = async (testId) => {
    const ok = window.confirm("Are you sure you want to delete this test?");
    if (!ok) return;
    await deleteDoc(doc(db, "tests", testId));
    fetchTests();
  };
  return (
    <div className="min-h-screen px-1 bg-gray-100 md:py-8 md:px-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel – Test Series</h1>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingTestId ? "Update Test" : "Create New Test"}{" "}
        </h2>
        <input
          disabled={editingTestId}
          className={`border p-2 w-full mb-3 rounded ${
            editingTestId && "bg-gray-200"
          }`}
          placeholder="Test Id"
          value={editingTestId ? editingTestId : testId}
          onChange={(e) => setTestId(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="flex flex-col gap-2 text-sm font-medium mb-4">
          Select the Status:
          <select
            name="activeStatus"
            defaultValue={activeStatus}
            value={activeStatus}
            className="
      w-60
      rounded-md
      bg-white
      px-3 py-2
      shadow-sm
      focus:outline-none
      cursor-pointer
    "
            onChange={(e) => {
              const isActive = e.target.value === "true";
              setActiveStatus(isActive);
            }}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </label>

        <label className="text-sm font-medium mb-4">
          Max Marks:
          <input
            className="border p-2 w-full mb-3 rounded"
            type="number"
            placeholder="Max Marks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
          />
        </label>
        <label className="text-sm font-medium mb-4">
          Number of Questions:
          <input
            className="border p-2 w-full mb-3 rounded"
            type="number"
            placeholder="No. of Questions"
            value={questionsCount}
            onChange={(e) => setQuestionsCount(Number(e.target.value))}
          />
        </label>
        <label className="text-sm font-medium mb-4">
          Duration:
          <input
            className="border p-2 w-full mb-3 rounded"
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </label>
        <div className="flex gap-3">
          <button
            onClick={createOrUpdateTest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingTestId ? "Update Test" : "Create Test"}
          </button>
          {editingTestId && (
            <button
              onClick={() => {
                setEditingTestId(null);
                setTitle("");
                setDuration(90);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="bg-white p-2 md:p-6 rounded-xl shadow">
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
            </tr>
          </thead>
          <tbody>
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
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <QuestionAdmin testids={tests} />
    </div>
  );
}
