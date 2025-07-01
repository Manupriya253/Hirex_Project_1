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
    name: "Nimesh Perera",
    company: "Operations Manager at Colombo Logistics",
    content:
      "Hirex.lk helped us fill critical roles quickly with qualified professionals. The process was smooth and saved us weeks of effort.",
  },
  {
    img: TestimonialImg02,
    name: "Malini Fernando",
    company: "HR Director at Global Apparel",
    content:
      "Their outsourced manpower service is exceptional. We scaled operations seamlessly during peak season with their reliable workforce.",
  },
  {
    img: TestimonialImg03,
    name: "Aravinda Jayasinghe",
    company: "CEO, TechZone Pvt Ltd",
    content:
      "Hirex.lk's HR advisory team gave us the guidance we needed to build a more engaged and productive team. Highly recommended.",
  },
  {
    img: TestimonialImg04,
    name: "Shanika Wijesooriya",
    company: "Recruitment Lead at Greenfields Exporters",
    content:
      "Their recruitment solutions are tailored to our needs. We found specialized talent in record time. Professional and dependable service.",
  },
  {
    img: TestimonialImg05,
    name: "Roshan De Silva",
    company: "General Manager, BlueWave Industries",
    content:
      "Excellent service. Their team understood our requirements and delivered quality candidates that perfectly fit our culture.",
  },
  {
    img: TestimonialImg06,
    name: "Dilani Karunarathne",
    company: "HR Specialist at CityBuild Group",
    content:
      "We used Hirex.lk to recruit across multiple locations. Their platform and team made the process fast and stress-free.",
  },
  {
    img: TestimonialImg07,
    name: "Kevin Rajapaksha",
    company: "Head of Procurement at Medisafe Supplies",
    content:
      "Reliable, professional, and results-driven. Hirex.lk delivered exactly what we needed to grow our team quickly.",
  },
  {
    img: TestimonialImg08,
    name: "Pramodhie Abeywickrama",
    company: "HR Executive at Vista Hotels",
    content:
      "We needed seasonal staffing on short notice. Hirex.lk exceeded expectations with their prompt and effective solutions.",
  },
  {
    img: TestimonialImg09,
    name: "Harsha Gunasekara",
    company: "Director at PrimeTech Solutions",
    content:
      "Their customized workforce solutions saved us time and hassle. I’ll continue partnering with them for all our hiring needs.",
  },
];

export default function Testimonials() {
  const masonryContainer = useMasonry();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#99C2E8,#FFFFFF,#B8F2F2,#FFFFFF,#99C2E8)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Hear from our customers
          </h2>
          <p className="text-lg text-indigo-200/65">
            Trusted by companies across Sri Lanka to deliver reliable, effective, and tailored workforce solutions.
          </p>
        </div>

        {/* Cards */}
        <div
          className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
          ref={masonryContainer}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <Testimonial testimonial={testimonial}>
                {testimonial.content}
              </Testimonial>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonial({
  testimonial,
  children,
}: {
  testimonial: {
    img: StaticImageData;
    name: string;
    company: string;
    content: string;
  };
  children: React.ReactNode;
}) {
  return (
    <article className="relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-xs transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
      <div className="flex flex-col gap-4">
        <p className="text-indigo-200/65 before:content-['“'] after:content-['”']">
          {children}
        </p>
        <div className="flex items-center gap-3">
          <Image
            className="inline-flex shrink-0 rounded-full"
            src={testimonial.img}
            width={36}
            height={36}
            alt={testimonial.name}
          />
          <div className="text-sm font-medium text-gray-200">
            <span>{testimonial.name}</span>
            <span className="block text-indigo-200/65 text-xs">{testimonial.company}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
