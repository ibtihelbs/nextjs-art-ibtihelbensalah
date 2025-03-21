"use client";
import { useState } from "react";

export function EmbeddedForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subscribeUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const response = await fetch("/api/newsletter", {
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const json = await response.json();
    const { data, error } = json;
    if (error) {
      setIsLoading(false);
      setMessage(error);
      return;
    }
    setMessage("You have successfully subscribed.");
    setIsLoading(false);
    return data;
  };

  if (message) {
    return <p className="text-red-500 p-4 text-center">{message}</p>;
  }

  if (isLoading) {
    return <h1 className="text-xl font-bold text-center p-4">Loading...</h1>;
  }

  return (
    <form
      onSubmit={subscribeUser}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center ">
        Subscribe to our newsletter!
      </h2>
      <div className="space-y-4">
        <label className="block">
          <span className=" text-sm font-medium block mb-1">First name</span>
          <input
            name="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 text-sm font-medium block mb-1">
            Last name
          </span>
          <input
            name="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 text-sm font-medium block mb-1">
            Email
          </span>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>
      </div>
      <button
        type="submit"
        value=""
        name="subscribe"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default EmbeddedForm;
