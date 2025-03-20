import React from "react";

const Form = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-md border border-gray-300 p-6 text-center">
        <form
          id="sib-form"
          method="POST"
          action="https://sibforms.com/serve/MUIFAMfCUAddv2hC41DKeQHQMit38n1_fizyxzMcSaZ6c6312J2tIrQVV5ckTh8YCOdH9itC8mqbVzWrYhDsHzQSjlsUzpsDarcWDZ0j8QSM-Ge3VOoKs6ppLY7U02JGD7e0pYd3TC9BhX_c5YIIztv627onR0TFPY1TZFQjKDlMvQHwn8jSoHHCM5aKsgKRcpH54WA8wLjCzDtV"
        >
          <div className="py-2 text-left">
            <h2 className="text-2xl font-bold text-gray-800">Newsletter</h2>
          </div>
          <div className="py-2 text-left">
            <p className="text-base text-gray-800">
              Inscrivez-vous à notre newsletter pour suivre nos actualités.
            </p>
          </div>
          <div className="py-2">
            <label
              htmlFor="EMAIL"
              className="block text-sm font-bold text-gray-800"
            >
              Veuillez renseigner votre adresse email pour vous inscrire
            </label>
            <input
              type="text"
              id="EMAIL"
              name="EMAIL"
              placeholder="EMAIL"
              autoComplete="off"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <label className="block mt-1 text-xs text-gray-500">
              Veuillez renseigner votre adresse email pour vous inscrire. Ex. :
              abc@xyz.com
            </label>
          </div>
          <div className="py-2 text-left">
            <button
              type="submit"
              className="w-full p-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 font-bold"
            >
              S'INSCRIRE
            </button>
          </div>
          <input
            type="text"
            name="email_address_check"
            value=""
            className="hidden"
          />
          <input type="hidden" name="locale" value="fr" />
          <input type="hidden" name="html_type" value="simple" />
        </form>
      </div>
    </div>
  );
};

export default Form;
