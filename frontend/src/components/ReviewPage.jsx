import React from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

function ReviewPage() {
  const allReview = useSelector(
    (state) => state.review?.allReview
  ) ?? [];

  const latestReview = Array.isArray(allReview)
    ? allReview.slice(0, 6)
    : [];

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-5">
        Real Reviews from Real Learners
      </h1>

      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] px-5 mb-[30px]">
        Discover how our Virtual Courses is transforming learning experiences
        through real feedback from students and professionals worldwide.
      </span>

      <div className="w-full min-h-screen flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-2.5 mb-10">
        {latestReview.map((item, index) => (
          <ReviewCard
            key={item._id || index}
            rating={item?.rating}
            image={item?.user?.photoUrl}
            text={item?.comment}
            name={item?.user?.name}
            role={item?.user?.role}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
