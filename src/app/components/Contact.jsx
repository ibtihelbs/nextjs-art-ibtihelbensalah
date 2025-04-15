"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { XlTitle } from "./Text";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
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
    <section className="w-full grid gap-8">
      <div>
        <XlTitle content={"contact"} className={"md:6xl"} />
        <hr className="border-2" />
      </div>
      <form
        ref={form}
        className="grid md:grid-cols-2 gap-8"
        onSubmit={sendEmail}
      >
        <div className=" grid gap-3">
          <div className="grid gap-2">
            <label>Name</label>
            <input
              className="px-4 py-1 border-gray-500 rounded-full border-solid border"
              placeholder="Name...."
              type="text"
              name="user_name"
            />
          </div>
          <div className="grid gap-2">
            <label>Email</label>
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
            <label>Message</label>
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
