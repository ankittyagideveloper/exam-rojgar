import { useState } from "react";

export default function RegistrationModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    rrbRegNo: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.rrbRegNo || !form.phone || !form.dob) {
      alert("Please fill all details");
      return;
    }
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Scholarship Test Registration
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              RRB Registration No
            </label>
            <input
              name="rrbRegNo"
              value={form.rrbRegNo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter RRB Reg No"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter Phone Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
