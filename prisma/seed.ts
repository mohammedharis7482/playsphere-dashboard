import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.turf.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "PlaySphere Admin",
      email: "admin@playsphere.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const turfOne = await prisma.turf.create({
    data: {
      name: "PlaySphere Arena",
      location: "Calicut Stadium Road",
      city: "Calicut",
      description: "Premium 5s football turf with floodlights.",
      imageUrl: "/images/turfs/turf-1.jpg",
      price: 1200,
      status: "ACTIVE",
    },
  });

  const turfTwo = await prisma.turf.create({
    data: {
      name: "Champions Turf",
      location: "Mavoor Road",
      city: "Calicut",
      description: "Spacious turf suitable for evening matches.",
      imageUrl: "/images/turfs/turf-2.jpg",
      price: 1000,
      status: "ACTIVE",
    },
  });

  const turfThree = await prisma.turf.create({
    data: {
      name: "Elite Sports Turf",
      location: "Kozhikode Beach Road",
      city: "Calicut",
      description: "Well-maintained turf for premium bookings.",
      imageUrl: "/images/turfs/turf-3.jpg",
      price: 1500,
      status: "MAINTENANCE",
    },
  });

  const turfs = [turfOne, turfTwo, turfThree];

  const customerOne = await prisma.customer.create({
    data: {
      name: "Arjun Nair",
      phone: "9876543210",
      email: "arjun@example.com",
    },
  });

  const customerTwo = await prisma.customer.create({
    data: {
      name: "Rahul M",
      phone: "9876543211",
      email: "rahul@example.com",
    },
  });

  const customerThree = await prisma.customer.create({
    data: {
      name: "Shahid Ali",
      phone: "9876543212",
      email: "shahid@example.com",
    },
  });

  const customerFour = await prisma.customer.create({
    data: {
      name: "Vishnu P",
      phone: "9876543213",
      email: "vishnu@example.com",
    },
  });

  const customerFive = await prisma.customer.create({
    data: {
      name: "Favas K",
      phone: "9876543214",
      email: "favas@example.com",
    },
  });

  const customers = [
    customerOne,
    customerTwo,
    customerThree,
    customerFour,
    customerFive,
  ];

  for (let i = 0; i < 10; i++) {
    const turf = turfs[i % turfs.length];
    const customer = customers[i % customers.length];

    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() - i);

    const startTime = new Date(bookingDate);
    startTime.setHours(17 + (i % 4), 0, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    const status =
      i % 4 === 0
        ? "PENDING"
        : i % 4 === 1
          ? "CONFIRMED"
          : i % 4 === 2
            ? "COMPLETED"
            : "CANCELLED";

    const booking = await prisma.booking.create({
      data: {
        turfId: turf.id,
        customerId: customer.id,
        userId: admin.id,
        bookingDate,
        startTime,
        endTime,
        amount: turf.price,
        status,
      },
    });

    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: turf.price,
        method: i % 2 === 0 ? "UPI" : "CASH",
        status:
          status === "CANCELLED"
            ? "REFUNDED"
            : status === "PENDING"
              ? "PENDING"
              : "PAID",
        transactionId: `TXN-${1000 + i}`,
      },
    });
  }

  await prisma.review.createMany({
    data: [
      {
        turfId: turfOne.id,
        customerId: customerOne.id,
        rating: 5,
        comment: "Excellent turf and smooth booking experience.",
      },
      {
        turfId: turfTwo.id,
        customerId: customerTwo.id,
        rating: 4,
        comment: "Good ground quality and lighting.",
      },
      {
        turfId: turfOne.id,
        customerId: customerThree.id,
        rating: 5,
        comment: "Best turf in Calicut.",
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        title: "New Booking",
        message: "A new booking has been created for PlaySphere Arena.",
        type: "BOOKING",
      },
      {
        title: "Payment Received",
        message: "UPI payment received successfully.",
        type: "PAYMENT",
      },
      {
        title: "Turf Maintenance",
        message: "Elite Sports Turf is currently under maintenance.",
        type: "TURF",
      },
      {
        title: "New Review",
        message: "A customer added a new 5-star review.",
        type: "SYSTEM",
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });