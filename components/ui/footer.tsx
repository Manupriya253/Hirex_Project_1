import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

export default function Footer() {
  const links = [
    { label: "Refer a friend", href: "https://www.hirex.lk" },
    { label: "Contact", href: "mailto:info@hirex.lk" },
  ];

  return (
   <footer className="bg-[#f9f9f9] text-[#333] relative overflow-hidden shadow-inner">
      {/* Torn red border */}
      <div className="h-3 bg-[url('/images/torn-top.svg')] bg-repeat-x bg-top bg-cover" />

      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Logo + Description + Social */}
            <div className="relative -mt-10"> 
            {/* -mt-2 moves the whole block slightly up */}

            <Link href="/" className="inline-block mb-3 ml-[-50px]">
              {/* ml-[-8px] shifts logo a bit left */}
              <Image src={logo} alt="HireX Logo" width={165} height={3} />
            </Link>
            {/* NEW "FOLLOW US" heading */}
            <h1 className="mt35 text-xs uppercase font-bold tracking-wide text-gray-400">Follow Us</h1>

            <div className="flex gap-4 mt-4">
                {/* Social icons */}
                  <a
                    href="https://www.linkedin.com/in/hirex-pvt-ltd-209288374?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="bg-[#0A66C2] text-white p-2 rounded-full hover:bg-[#084a93] transition"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512">
                      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341A53.74 53.74 0 1 1 107.57 53.7a53.73 53.73 0 0 1-53.73 53.73zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.6 0-37.6 15.9-43.8 31.3-2.3 5.5-2.8 13.1-2.8 20.8V448h-92.4V148.9h92.4v40.8c12.3-19 34.4-46.1 83.7-46.1 61.2 0 107.1 39.9 107.1 125.5V448z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/share/19MSs1WiTY/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="bg-[#1877F2] text-white p-2 rounded-full hover:bg-[#145dbf] transition"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.2V12h2.2v-1.7c0-2.18 1.3-3.4 3.3-3.4.96 0 1.96.17 1.96.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.35V12h2.4l-.38 2.9h-2.02v7.05A10 10 0 0 0 22 12Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/hirex_pvt_ltd?igsh=ZDl5eWhrMzdtbWhk&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white p-2 rounded-full hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5a3.75 3.75 0 0 0 3.75-3.75v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.25 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm-4.25 1a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 2a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z" />
                    </svg>
                  </a>

                  <a
                  href="https://www.tiktok.com/@hirex.pvt.ltd?_t=ZS-8xzj1MSg66C&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 48 48" fill="currentColor">
                    <path d="M41,15.1c-3.2,0-5.9-2.6-5.9-5.9h-5.9v21.5c0,3.2-2.6,5.9-5.9,5.9s-5.9-2.6-5.9-5.9s2.6-5.9,5.9-5.9c0.5,0,0.9,0.1,1.3,0.2v-6.2
                    c-0.4,0-0.9-0.1-1.3-0.1c-6.8,0-12.3,5.5-12.3,12.3S17.2,42,24,42s12.3-5.5,12.3-12.3V20c1.8,1.1,3.9,1.7,6.1,1.7V15.1z" />
                  </svg>
                </a>


              <a
                href="https://www.threads.com/@hirex_pvt_ltd?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
              >
               <svg
                aria-label="Threads"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current"
              >
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
              </svg>
              </a>

                
              </div>


              <p className="text-sm text-gray-600 max-w-xs mt-4">
                Empowering businesses and professionals through trust, innovation, and collaboration.
              </p>
            </div>


        {/* Column 2: Company Info */}
        <div className="text-sm text-gray-400 leading-relaxed pl-4 md:pl-10 lg:pl-14 pt-4">
          <h4 className="font-semibold mb-4 uppercase text-xs tracking-wide text-black">Company</h4>
          <p><strong>HireX (Pvt) Ltd</strong></p>
          <p>No. 512/1/1, Mihira Mawatha,<br />Bokundara Road, Arawwala, Pannipitiya Colombo</p>
    
          <p>
            Web: <a href="https://hirex.lk" className="hover:underline">hirex.lk</a><br />
            Email: <a href="mailto:info@hirex.lk" className="hover:underline">info@hirex.lk</a>
          </p>
        </div>

        {/* Column 3: More Links */}
        <div className="text-sm text-gray-600 pl-6 md:pl-16 lg:pl-20 pt-4">
          <h4 className="font-semibold mb-4 uppercase text-xs tracking-wide text-black " >More</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {links.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-white transition">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
       <div className="pt-1">
        <h4 className="text-sm font-semibold text-[#1f2937] uppercase mb-2 pt-4">Get Updates</h4>
        <p className="text-sm text-gray-600 mb-2 leading-tight">
          Get early access to new arrivals and exclusive deals.
        </p>
        <form className="flex  w-[310px] pt-4">
        <input
          type="email"
          placeholder="Your email"
          className="h-13.2 flex-1 px-2 text-xs bg-white text-[#1f2937] border border-gray-400 rounded-0-md focus:outline-none"
        />
        <button
          type="submit"
          className="h-13 px-2 text-xs bg-[#1a1414] hover:bg-[#b0adad] font-semibold text-white rounded-0-md transition"
        >
          Sign Me Up
        </button>
      </form>

      </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-700 mt-12 pt-6 pb-4">
        &copy; {new Date().getFullYear()} HireX (Pvt) Ltd. All rights reserved.
      </div>
    </footer>
  );
}
