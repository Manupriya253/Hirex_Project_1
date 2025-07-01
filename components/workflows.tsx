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
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
           <span className="inline-flex bg-[linear-gradient(to_right,#004AAD,#3ED2D2)] bg-clip-text text-transparent">

                About Hirex.lk
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#99C2E8,#FFFFFF,#B8F2F2,#FFFFFF,#99C2E8)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Empowering Workforce Solutions
            </h2>
            <p className="text-lg text-indigo-200/65">
              At Hirex.lk, we specialize in connecting top-tier talent with leading local and international companies. Our core services ensure reliable, efficient, and strategic hiring solutions.
            </p>
          </div>

          {/* Spotlight items */}
         {/* Spotlight items */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-4">
            {/* Card 1 */}
            <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image
                  className="inline-flex"
                  src={WorflowImg01}
                  width={350}
                  height={288}
                  alt="Candidate Sourcing"
                />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      Candidate Sourcing
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    We identify and recruit skilled professionals tailored to meet the unique needs of businesses worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image
                  className="inline-flex"
                  src={WorflowImg02}
                  width={350}
                  height={288}
                  alt="Outsourced Manpower"
                />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      Outsourced Solutions
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    Flexible and efficient workforce solutions tailored to diverse organizational demands.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image
                  className="inline-flex"
                  src={WorflowImg03}
                  width={350}
                  height={288}
                  alt="HR Advisory"
                />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      HR Advisory Services
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    Expert guidance on human resource management to optimize your team’s potential and drive success.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px hover:after:opacity-20">
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
                <Image
                  className="inline-flex"
                  src={WorflowImg04}
                  width={350}
                  height={288}
                  alt="Foreign Recruitment"
                />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      Foreign Recruitment
                    </span>
                  </div>
                  <p className="text-indigo-200/65">
                    Facilitating global talent acquisition to help companies expand their reach with skilled international professionals.
                  </p>
                </div>
              </div>
            </div>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
