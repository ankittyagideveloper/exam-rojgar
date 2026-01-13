import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";

export function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl dark:bg-[#2C2C2C]">
        {/* Message Content */}
        <div className="px-6 py-6">
          <p className="text-gray-700 dark:text-white">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
          <Button
            onClick={onCancel}
            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-6 cursor-pointer"
          >
            {t("confirmationModal.buttons.no")}
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-[#006AB7] hover:bg-cyan-600 text-white px-6 cursor-pointer"
          >
            {t("confirmationModal.buttons.yes")}
          </Button>
        </div>
      </div>
    </div>
  );
}
