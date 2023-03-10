import { BannerHero, StackHero } from "~/assets/KasperLunaLogo";

export default function Hero() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-[-10rem] transform-gpu overflow-hidden blur-[70px] sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            className="fill-sky-800"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-x-0  top-[-10rem] transform-gpu overflow-hidden pt-[40rem] blur-[70px] sm:top-[-20rem] ">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            className="fill-sky-700"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <main>
        <svg height={0}>
          <defs>
            <linearGradient id="Gradient">
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="95%" stopColor="#c5c7c7" />
            </linearGradient>
            <linearGradient id="GradientLight">
              <stop offset="50%" stopColor="#0f0f0f0" />
              <stop offset="95%" stopColor="#000000" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              {/*  hide bannerhero when screen is smaller than md */}
              <div className="hidden stroke-black dark:stroke-white sm:hidden md:block lg:block">
                <BannerHero />
              </div>
              {/* Show only when BannerHero is Hidden */}
              <div className="stroke-black dark:stroke-white sm:block md:hidden lg:hidden">
                <StackHero />
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                <b>Software Engineer</b> Experienced in Frontend & Backend
                System Design, Project Management, and Development
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#About"
                  className="animate-bounce rounded-3xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
