import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const today = new Date();
const minAdultDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

export default function RegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  testDetails,
}) {
  const { t } = useTranslation();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("common.errorMessages.name.nameRequired"))
      .matches(/^[A-Za-z ]+$/, t("common.errorMessages.name.nameInvalid"))
      .min(3, t("common.errorMessages.name.nameMin"))
      .max(40, t("common.errorMessages.name.nameMax")),

    rrbRegNo: Yup.string()
      .length(10, t("common.errorMessages.rrbRegNo.regNoLength"))
      .required(t("common.errorMessages.rrbRegNo.regNoRequired")),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, t("common.errorMessages.phoneNo.phoneNoLength"))
      .required(t("common.errorMessages.phoneNo.phoneNoRequired")),
    dob: Yup.date()
      .max(new Date(), t("common.errorMessages.dob.dobFutureValidation"))
      .max(minAdultDate, t("common.errorMessages.dob.dobAgeLimit"))
      .required(t("common.errorMessages.dob.dobRequired"))
      .typeError(t("common.errorMessages.dob.invalidDOB")),
  });
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <Formik
        initialValues={{
          name: "",
          rrbRegNo: "",
          phone: "",
          dob: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <Form
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full max-w-md rounded-lg p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            {testDetails?.title ?? ""} {t("registerationModal.registration")}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                {t("registerationModal.fullName")}
              </label>
              <Field
                type="text"
                name="name"
                className="w-full border p-2 rounded"
                placeholder={t("registerationModal.placeholderText.name")}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                {t("registerationModal.rrbRegNo")}
              </label>
              <Field
                name="rrbRegNo"
                className="w-full border p-2 rounded"
                placeholder={t("registerationModal.placeholderText.rrbRegNo")}
              />
              <ErrorMessage
                name="rrbRegNo"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                {t("registerationModal.phoneNo")}
              </label>
              <Field
                name="phone"
                type="tel"
                className="w-full border p-2 rounded"
                placeholder={t("registerationModal.placeholderText.phoneNo")}
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                {t("registerationModal.dob")}
              </label>
              <Field
                name="dob"
                type="date"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="dob"
                component="p"
                className="text-red-500 text-sm"
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
        </Form>
      </Formik>
    </div>
  );
}
