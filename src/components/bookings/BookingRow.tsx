import {
    Eye,
    Pencil,
    Trash2,
  } from "lucide-react";
  
  import { Booking } from "@/types/booking";
  
  import BookingAvatar from "./BookingAvatar";
  import BookingStatusBadge from "./BookingStatusBadge";
  import PaymentStatusBadge from "./PaymentStatusBadge";
  
  interface Props {
    booking: Booking;
  
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
  }
  
  export default function BookingRow({
    booking,
    onView,
    onEdit,
    onDelete,
  }: Props) {
    return (
      <tr className="border-b hover:bg-slate-50">
        <td className="py-4">
          <div>
            <BookingAvatar
              name={booking.customerName}
            />
  
            <p className="mt-1 text-xs text-slate-500">
              {booking.customerPhone}
            </p>
          </div>
        </td>
  
        <td>
          <div>
            <p className="font-medium">
              {booking.turfName}
            </p>
  
            <p className="text-xs text-slate-500">
              {booking.duration} Hour
            </p>
          </div>
        </td>
  
        <td>
          <div>
            <p>{booking.date}</p>
  
            <p className="text-xs text-slate-500">
              {booking.startTime}
            </p>
          </div>
        </td>
  
        <td>
          ₹
          {booking.amount.toLocaleString()}
        </td>
  
        <td>
          <BookingStatusBadge
            status={booking.status}
          />
        </td>
  
        <td>
  <PaymentStatusBadge
    status={booking.paymentStatus}
  />
</td>
  
        <td>
          <div className="flex justify-center gap-3">
            <button onClick={onView}>
              <Eye size={18} />
            </button>
  
            <button onClick={onEdit}>
              <Pencil size={18} />
            </button>
  
            <button onClick={onDelete}>
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    );
  }