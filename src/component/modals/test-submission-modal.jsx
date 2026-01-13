import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";

export function TestSubmissionModal({
  isOpen,
  statistics = [],
  onClose,
  onSubmit,
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#2C2C2C] rounded-lg shadow-lg w-full max-w-6xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-600 text-center dark:text-white">
            {t("testSubmissionModal.title")}
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#006AB7] text-white">
                  <th className="px-4 py-3 text-left font-semibold border-r border-[#006AB7]">
                    {t("testSubmissionModal.table.section")}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-r border-[#006AB7]">
                    {t("testSubmissionModal.table.noOfQuestions")}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-r border-[#006AB7]">
                    {t("testSubmissionModal.table.answered")}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-r border-[#006AB7]">
                    {t("testSubmissionModal.table.notAnswered")}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold border-r border-[#006AB7]">
                    {t("testSubmissionModal.table.markedForReview")}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    {t("testSubmissionModal.table.notVisited")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {statistics?.map((stat, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200  dark:text-white  "
                  >
                    <td className="px-4 py-4 border-r border-gray-200">
                      {stat.section}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200 text-center">
                      {stat.totalQuestions}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200 text-center">
                      {stat.answered}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200 text-center">
                      {stat.notAnswered}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-200 text-center">
                      {stat.markedForReview}
                    </td>
                    <td className="px-4 py-4 text-center">{stat.notVisited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="cursor-pointer bg-[#006AB7] hover:bg-cyan-600 text-white px-6"
          >
            {t("testSubmissionModal.buttons.close")}
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-[#006AB7] cursor-pointer hover:bg-cyan-600 text-white px-6"
          >
            {t("testSubmissionModal.buttons.submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
