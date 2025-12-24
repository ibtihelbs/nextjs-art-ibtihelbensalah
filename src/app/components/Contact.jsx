"use client";
import React, { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Title } from "./Text";

export const Contact = () => {
  const form = useRef(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC,
        }
      )
      .then(() => {
        setStatusMessage({ success: true, message: "Message sent!" });
        form.current?.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error.text);
        setStatusMessage({
          success: false,
          message: "Failed to send message. Please try again.",
        });
      });
  };

  return (
    <section
      id="contact"
      className="w-full md:h-screen divide-x-3 divide-solid divide-black grid grid-cols-6 md:grid-cols-4 content-center md:gap-8 gap-2"
    >
      <div>
        <Title
          content={"contact"}
          className={"lg:text-9xl transtaleX-1/2 rotate-90"}
        />
      </div>
      <form
        ref={form}
        className="md:col-span-3 grid col-span-5 md:grid-cols-2 gap-8"
        onSubmit={sendEmail}
      >
        <div className="grid gap-3">
          <div className="grid gap-2">
            <label
              htmlFor="user_name"
              className="font-bold text-xl tracking-tight"
            >
              Name
            </label>
            <input
              id="user_name"
              className="px-4 py-1 border-gray-500 rounded-full border-solid border"
              placeholder="Name...."
              type="text"
              name="user_name"
              required
              minLength={2}
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="user_email"
              className="font-bold text-xl tracking-tight"
            >
              Email
            </label>
            <input
              id="user_email"
              className="px-4 py-1 border-gray-500 rounded-full border-solid border"
              placeholder="Email...."
              type="email"
              name="user_email"
              required
            />
          </div>
        </div>
        <div className="md:vr grid gap-3">
          <div className="grid gap-2">
            <label
              htmlFor="message"
              className="font-bold text-xl tracking-tight"
            >
              Message
            </label>
            <textarea
              id="message"
              className="px-4 py-1 border-gray-500 rounded-xl border-solid border"
              placeholder="Message...."
              name="message"
              required
              minLength={10}
            />
          </div>
          <input
            type="submit"
            className="px-4 py-1 place-self-start border-gray-500 bg-amber-500 rounded-full border-solid border"
            value="Send"
          />
          {statusMessage && (
            <p
              className={`text-sm font-medium mt-2 ${
                statusMessage.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage.message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Contact;
