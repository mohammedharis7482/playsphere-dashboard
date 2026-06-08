
import SectionTitle from "@/components/ui/SectionTitle";
import BookingPageContent from "@/components/bookings/BookingPageContent";

export default function BookingsPage() {
  return (
    <>
      <SectionTitle
        title="Bookings"
        subtitle="Manage all turf bookings"
      />

      <div className="mt-8">
        <BookingPageContent />
      </div>
    </>
  );
}