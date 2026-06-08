"use client";

import { useMemo, useState } from "react";

import { reviews as initialReviews } from "@/data/reviews";
import { Review } from "@/types/review";

import ReviewStats from "./ReviewStats";
import RatingDistribution from "./RatingDistribution";
import TopRatedTurfs from "./TopRatedTurfs";
import ReviewList from "./ReviewList";
import ViewReviewModal from "./ViewReviewModal";
import ReviewActivity from "./ReviewActivity";

export default function ReviewPageContent() {
  const [reviewList, setReviewList] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [viewModal, setViewModal] = useState(false);

  const averageRating = useMemo(() => {
    if (reviewList.length === 0) return 0;

    const total = reviewList.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return Number((total / reviewList.length).toFixed(1));
  }, [reviewList]);

  const handleApprove = (id: number) => {
    setReviewList((prev) =>
      prev.map((review) =>
        review.id === id
          ? { ...review, status: "Approved" }
          : review
      )
    );
  };

  const handleDelete = (id: number) => {
    setReviewList((prev) =>
      prev.filter((review) => review.id !== id)
    );
  };

  return (
    <div className="space-y-8">
      <ReviewStats
        reviews={reviewList}
        averageRating={averageRating}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <RatingDistribution reviews={reviewList} />
        <TopRatedTurfs />
      </div>

      <ReviewList
        reviews={reviewList}
        onView={(review) => {
          setSelectedReview(review);
          setViewModal(true);
        }}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />

      <ReviewActivity />

      <ViewReviewModal
        open={viewModal}
        onClose={() => setViewModal(false)}
        review={selectedReview}
      />
    </div>
  );
}