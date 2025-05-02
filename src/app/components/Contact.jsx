"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { XlTitle } from "./Text";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      className="w-full md:h-screen  divide-x-3 divide-solid divide-black grid grid-cols-6 md:grid-cols-4 content-center md:gap-8 gap-2"
    >
      <div>
        <XlTitle
          content={"contact"}
          className={"lg:text-9xl transtaleX-1/2 rotate-90"}
        />
      </div>
      <form
        ref={form}
        className="md:col-span-3 grid span-cols-5 md:grid-cols-2  gap-8"
        onSubmit={sendEmail}
      >
        <div className=" grid gap-3">
          <div className="grid gap-2">
            <label className="font-bold text-xl tracking-tight">Name</label>
            <input
              className="px-4 py-1 border-gray-500 rounded-full border-solid border"
              placeholder="Name...."
              type="text"
              name="user_name"
            />
          </div>
          <div className="grid gap-2">
            <label className="font-bold text-xl tracking-tight">Email</label>
            <input
              className="px-4 py-1 border-gray-500 rounded-full border-solid border"
              placeholder="Email...."
              type="email"
              name="user_email"
            />
          </div>
        </div>
        <div className="md:vr grid gap-3">
          <div className="grid gap-2">
            <label className="font-bold text-xl tracking-tight">Message</label>
            <textarea
              className="px-4 py-1 border-gray-500 rounded-xl border-solid border"
              placeholder="Message...."
              name="message"
            />
          </div>
          <input
            type="submit"
            className="px-4 py-1 place-self-start border-gray-500 bg-amber-500 rounded-full border-solid border"
            value="Send"
          />
        </div>
      </form>
    </section>
  );
};
export default Contact;
