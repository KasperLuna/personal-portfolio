"use client";
import Link from "next/link";
import Script from 'next/script'
import { useState, type FormEvent } from "react";
import { Spinner } from "~/assets/Spinner";
import Footer from "./Footer";
import { type ContactFormData } from "~/constants";

type RenderParameters = {
  sitekey: string
  theme?: 'light' | 'dark'
  callback?(token: string): void
}

declare global {
  interface Window {
    onloadTurnstileCallback(): void
    turnstile: {
      render(container: string | HTMLElement, params: RenderParameters): void
    }
  }
}



export default function Contact() {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (!formData.get("cf-turnstile-response")) {
      setStatus("error");
      setIsSubmitting(false);
      return;
    }

    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      "cf-turnstile-response": formData.get("cf-turnstile-response") as string,
    };

    void fetch("/api/contact-form", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error sending message");
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const className = {
    idle: "hidden",
    error: "mt-5 w-full rounded-3xl bg-red-300 p-2 text-center font-semibold text-red-900",
    success: "mt-5 w-full rounded-3xl bg-green-300 py-2 px-3 text-center font-semibold text-green-900",
  }[status];

  const message = {
    idle: "",
    error: "Something went wrong. Please try again later.",
    success: "Message sent! I'll try my best to get back to you as soon as possible :) Have a Great Day!",
  }[status];


  return (
    <div
      id={"Contact"}
      className="relative isolate flex min-h-[90vh] flex-col justify-between gap-4 overflow-hidden bg-white px-6 dark:bg-slate-900"
    >
      {/* Cloudflare Turnstile Scripts */}
      <Script id="cf-turnstile-callback">
        {`window.onloadTurnstileCallback = function () {
          window.turnstile.render('#my-widget', {
            sitekey: '${process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}',
          })
        }`}
      </Script>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async={true}
        defer={true}
      />
      <div className="pointer-events-none absolute inset-x-0 top-[-5rem] -z-10 transform-gpu overflow-hidden pl-[40rem] pt-[15vw] opacity-80 blur-[45px] sm:blur-[70px]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2"
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
      <div className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden pt-[10rem] opacity-80 blur-[55px] sm:blur-[70px]">
        <svg
          className="relative  left-[calc(50%-30rem)] -z-10 h-[42.375rem] max-w-none -translate-x-1/2 rotate-[30deg]"
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

      <div className="z-20 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight  text-slate-600 dark:text-slate-200 sm:text-4xl">
            Let&apos;s Talk!{" "}
          </h2>
          <p className="mt-2 text-lg leading-8  text-gray-600 dark:text-gray-400">
            You can always reach me at{" "}
            <Link href="mailto:mail@kasperluna.com" className="text-blue-400">
              mail@kasperluna.com
            </Link>
            , but you can leave a message here too :)
          </p>
        </div>
        <form
          className="mx-auto mt-12 max-w-xl sm:mt-10"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="johndoe@gmail.com"
                  required
                  disabled={status === "success"}
                  className="focus:ring-insetdark:bg-slate-800 block w-full rounded-3xl border-0 dark:border-white dark:border-opacity-20 border-opacity-20 py-2 px-3.5 text-gray-600 shadow-md ring-1 ring-inset ring-white ring-opacity-20 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 dark:bg-slate-800 dark:text-gray-400 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400"
              >
                Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  placeholder="John Doe"
                  required
                  disabled={status === "success"}
                  className="block w-full rounded-3xl border-0 py-2 px-3.5 text-gray-600 dark:border-white dark:border-opacity-20 border-opacity-20 shadow-md ring-1 ring-inset ring-white ring-opacity-20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-gray-400 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  required
                  disabled={status === "success"}
                  placeholder="Hi Kasper! I want to discuss a project with you."
                  className="block w-full rounded-3xl border-0 dark:border-white dark:border-opacity-20 border-opacity-20 py-2 px-3.5 text-gray-900 shadow-md ring-1 ring-inset ring-white ring-opacity-20 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-gray-400 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex sm:col-span-2 items-center justify-center">
              <div id={"my-widget"} className="cf-turnstile min-h-[70px]" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY} />
            </div>

          </div>

          <div className="mt-10">
            {status == "idle" && (
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full flex-row justify-between rounded-3xl bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <div></div>
                <p className="place-self-center">Send!</p>
                <div>
                  {isSubmitting && (
                    <Spinner className="w-4 animate-spin fill-black dark:fill-white" />
                  )}
                </div>
              </button>
            )}
            <div className={className}>{message}</div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
