import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import WorflowImg04 from "@/public/images/workflow-04.png";

import Spotlight from "@/components/spotlight";

export default function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex text-sky-700 font-semibold">
                About Hirex.lk
              </span>
            </div>
            <h2 className="pb-4 font-nacelle text-3xl font-semibold text-gray-900 md:text-4xl">
              Empowering Workforce Solutions
            </h2>
            <p className="text-lg text-sky-800">
              At Hirex.lk, we specialize in connecting top-tier talent with leading local and international companies. Our core services ensure reliable, efficient, and strategic hiring solutions.
            </p>
          </div>

          {/* Spotlight items */}
          <Spotlight className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card template */}
            {[{
              src: WorflowImg01,
              alt: "Candidate Sourcing",
              label: "Candidate Sourcing",
              text: "We identify and recruit skilled professionals tailored to meet the unique needs of businesses worldwide."
            }, {
              src: WorflowImg02,
              alt: "Outsourced Manpower",
              label: "Outsourced Solutions",
              text: "Flexible and efficient workforce solutions tailored to diverse organizational demands."
            }, {
              src: WorflowImg03,
              alt: "HR Advisory",
              label: "HR Advisory Services",
              text: "Expert guidance on human resource management to optimize your team’s potential and drive success."
            }, {
              src: WorflowImg04,
              alt: "Foreign Recruitment",
              label: "Foreign Recruitment",
              text: "Facilitating global talent acquisition to help companies expand their reach with skilled international professionals."
            }].map((item, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative w-full h-[220px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm ">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
