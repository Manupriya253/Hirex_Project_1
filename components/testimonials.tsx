"use client";

import { useState } from "react";
import useMasonry from "@/utils/useMasonry";
import Image, { StaticImageData } from "next/image";

import TestimonialImg01 from "@/public/images/testimonial-01.jpg";
import TestimonialImg02 from "@/public/images/testimonial-02.jpg";
import TestimonialImg03 from "@/public/images/testimonial-03.jpg";
import TestimonialImg04 from "@/public/images/testimonial-04.jpg";
import TestimonialImg05 from "@/public/images/testimonial-05.jpg";
import TestimonialImg06 from "@/public/images/testimonial-06.jpg";
import TestimonialImg07 from "@/public/images/testimonial-07.jpg";
import TestimonialImg08 from "@/public/images/testimonial-08.jpg";
import TestimonialImg09 from "@/public/images/testimonial-09.jpg";

const testimonials = [
  {
    img: TestimonialImg01,
    name: "Muaaz Fazlin",
    company: "Finance & Operation Manager at a leading Australian company ",
    content:
      "HireX isn’t just a company, it’s a family. We look out for each other, grow together, and create something meaningful every day. It’s the kind of place where people matter just as much as the work we do. The process was smooth and saved us weeks of effort.",
  },
  {
    img: TestimonialImg02,
    name: "Ashvika Selvarajan",
    company: "Team Lead at a leading Australian company",
    content:
      "I am proud to be part of a team that is dedicated to delivering exceptional service. Working here has given me the opportunity to grow professionally in a supportive environment where every contribution is valued and appreciated. The positive culture and commitment to excellence at Hirex inspire me to give my best every day.",
  },
  {
    img: TestimonialImg04,
    name: "Nimeesha Adolphus",
    company: "Assistant Accountant at Greenfields Exporters",
    content:
      "we don’t just find jobs we build futures with care, integrity, and unwavering commitment. Every interaction reflects our passion for connecting people with the right opportunities. Being part of Hirex feels less like work, and more like family.",
  },
    {
    img: TestimonialImg08,
    name: "Tanushree Hatharasinghe ",
    company: "Allocations consultant at a leading Australian company",
    content:
      "Working at HireX has been such a fulfilling experience. Despite the fast-paced nature of the job, the team’s friendly, down to earth vibe makes every day enjoyable. What I appreciate most is how much they genuinely care about our wellbeing and truly value the effort we put into our work, it makes all the difference.",
  },
  {
    img: TestimonialImg09,
    name: "Amanda Bandara ",
    company: "Account Support at a leading Australian company",
    content:
      "Working at Hirex has been a truly rewarding experience. The flexibility in work arrangements and the supportive leadership have made it easier to adapt and grow within the role. The training provided was well-structured and helped me gain confidence in a new market. I appreciate the opportunities for development and the competitive package offered. It’s a great environment to learn, contribute, and thrive.",
  },
  {
    img: TestimonialImg05,
    name: "Sadeshani SooriyaArachchi",
    company: " Junior Consultant Allocations at a leading Australian company ",
    content:
      " Hirex definitely knows how to make you feel a part of the family They are incredibly flexible and easy to work with, making ever experience smooth and supportive. It truly is a team that respects your time, talent and well being!",
  },
   {
    img: TestimonialImg06,
    name: "Rashen Perera",
    company: "Account Support at a leading Australian company",
    content:
      "Hirex has been very supportive and accommodating with transitioning into a new industry/ market. They opened the pathway for new opportunities and experiences, providing excellent training methods to ease the transition..",
  },
  {
    img: TestimonialImg07,
    name: "Ransika Liyanage ",
    company: "Junior allocations consultant at a leading Australian company",
    content:
      "Hirex provides a truly collaborative and supportive work environment, making you feel valued from day one. Their flexibility, efficiency, and genuine respect for their team’s time, skills, and well-being set them apart. It’s a pleasure working with a company that prioritizes both professionalism and a people-first culture.",
  },
 
  {
    img: TestimonialImg03,
    name: "Jayani Silva",
    company: "Junior Consultant at a leading Australian company",
    content:
      "I’m grateful to be part of the team at Hirex Pvt Ltd. From day one, I’ve felt supported and encouraged in my role as a Junior Allocation Consultant. The company culture is friendly, and everyone is focused on helping each other succeed.",
  },
  
];

export default function Testimonials() {
  const masonryContainer = useMasonry();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 ">
      <div className="border-t py-12 md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="pb-4 font-nacelle text-3xl font-semibold text-gray-900 md:text-4xl">
            Hear from our Employees
          </h2>

          <p className="text-lg text-sky-800">
            Trusted by companies across Sri Lanka to deliver reliable, effective, and tailored workforce solutions.
          </p>
        </div>

        {/* Cards */}
        <div
          className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
          ref={masonryContainer}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: {
    img: StaticImageData;
    name: string;
    company: string;
    content: string;
  };
}) {
  const [expanded, setExpanded] = useState(false);

  const limit = 150;
  const isLong = testimonial.content.length > limit;
  const displayedContent = !expanded && isLong
    ? testimonial.content.slice(0, limit) + "..."
    : testimonial.content;

  return (
    <article
      className="relative rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-shadow max-w-md mx-auto flex flex-col justify-between "
      style={{ minHeight: 320 }}
    >
      <div className="mb-6 flex-grow">
        <p className="text-gray-800 leading-relaxed before:content-['“'] after:content-['”']">
          {displayedContent}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Image
          className="rounded-full object-cover border-2 border-sky-400"
          src={testimonial.img}
          width={48}
          height={48}
          alt={testimonial.name}
        />
        <div className="text-sm font-semibold text-gray-900 ">
          <div>{testimonial.name}</div>
          <div className="text-gray-500 text-xs">{testimonial.company}</div>
        </div>
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 self-start text-sm font-semibold text-sky-600 hover:text-sky-800 transition"
          aria-expanded={expanded}
        >
          {expanded ? "See less ▲" : "See more ▼"}
        </button>
      )}
    </article>
  );
}
