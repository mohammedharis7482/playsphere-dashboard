"use client";

import Modal from "@/components/ui/Modal";

interface DeleteBookingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName?: string;
}

export default function DeleteBookingModal({
  open,
  onClose,
  onConfirm,
  customerName,
}: DeleteBookingModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Booking"
    >
      <div className="space-y-6">
        <div>
          <p className="text-gray-700">
            Are you sure you want to delete this booking?
          </p>

          {customerName && (
            <p className="mt-2 text-sm text-gray-500">
              Customer:{" "}
              <span className="font-semibold">
                {customerName}
              </span>
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              px-5
              py-3
              font-medium
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-3
              font-medium
              text-white
              hover:bg-red-700
            "
          >
            Delete Booking
          </button>
        </div>
      </div>
    </Modal>
  );
}