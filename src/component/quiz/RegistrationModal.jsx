import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  testDetails,
}) {
  const [form, setForm] = useState({
    name: "",
    rrbRegNo: "",
    phone: "",
    dob: "",
  });

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 🔥 stop page reload

    if (!form.name || !form.rrbRegNo || !form.phone || !form.dob) {
      alert(t("common.fillAllDetails"));
      return;
    }

    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <form
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full max-w-md rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {testDetails?.title ?? ""} {t("registerationModal.registration")}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              {t("registerationModal.fullName")}
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder={t("registerationModal.placeholderText.name")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              {t("registerationModal.rrbRegNo")}
            </label>
            <input
              name="rrbRegNo"
              value={form.rrbRegNo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder={t("registerationModal.placeholderText.rrbRegNo")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              {t("registerationModal.phoneNo")}
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder={t("registerationModal.placeholderText.phoneNo")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              {t("registerationModal.dob")}
            </label>
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
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
            type="button"
          >
            {t("registerationModal.cancel")}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {t("registerationModal.continue")}
          </button>
        </div>
      </form>
    </div>
  );
}
