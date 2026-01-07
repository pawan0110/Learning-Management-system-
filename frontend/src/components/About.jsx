import React from "react";
import learning from "../assets/learning-team.jpg";
import VideoPlayer from "./VideoPlayer";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";

function About() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-10 px-4">

        {/* Image */}
        <div className="lg:w-[45%] md:w-[80%] w-full flex items-center justify-center relative">
          <img
            src={learning}
            alt="CodeNex learning platform"
            className="w-[90%] rounded-2xl shadow-lg"
          />
          <VideoPlayer />
        </div>

        {/* Content */}
        <div className="lg:w-[50%] md:w-[70%] w-full flex flex-col gap-6">

          {/* Label */}
          <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            About CodeNex
            <TfiLayoutLineSolid className="w-8 h-8 opacity-50" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Learn Smarter with <span className="text-amber-400">CodeNex</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed max-w-xl">
            <strong>CodeNex</strong> is a modern learning platform built to bridge
            the gap between theory and real-world skills. We empower students and
            professionals with structured courses, real-time progress tracking,
            and hands-on learning experiences designed for today’s fast-evolving
            tech landscape.
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <BiSolidBadgeCheck className="w-5 h-5 text-green-600" />
              Structured Learning Paths
            </div>
            <div className="flex items-center gap-3">
              <BiSolidBadgeCheck className="w-5 h-5 text-green-600" />
              Industry-Ready Instructors
            </div>
            <div className="flex items-center gap-3">
              <BiSolidBadgeCheck className="w-5 h-5 text-green-600" />
              Progress & Performance Tracking
            </div>
            <div className="flex items-center gap-3">
              <BiSolidBadgeCheck className="w-5 h-5 text-green-600" />
              Learn Anytime, Anywhere
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
