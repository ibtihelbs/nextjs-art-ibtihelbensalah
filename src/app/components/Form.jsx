const Form = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-lg bg-white rounded-md border border-gray-300 p-6 text-center">
        <form
          id="sib-form"
          method="POST"
          action="https://sibforms.com/serve/MUIFAMfCUAddv2hC41DKeQHQMit38n1_fizyxzMcSaZ6c6312J2tIrQVV5ckTh8YCOdH9itC8mqbVzWrYhDsHzQSjlsUzpsDarcWDZ0j8QSM-Ge3VOoKs6ppLY7U02JGD7e0pYd3TC9BhX_c5YIIztv627onR0TFPY1TZFQjKDlMvQHwn8jSoHHCM5aKsgKRcpH54WA8wLjCzDtV"
        >
          <div className="py-2 text-left">
            <h2 className="text-2xl font-bold ">Newsletter</h2>
          </div>
          <div className="py-2 text-left">
            <p className="text-base ">
              Subscribe to newsletter for more update.
            </p>
          </div>
          <div className="py-2">
            <label
              htmlFor="EMAIL"
              className="block text-start text-sm font-bold "
            >
              Email
            </label>
            <input
              type="text"
              id="EMAIL"
              name="EMAIL"
              placeholder="EMAIL"
              autoComplete="off"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <label className="block mt-1 text-xs text-gray-500">
              abc@xyz.com
            </label>
          </div>
          <div className="py-2 text-left">
            <button
              type="submit"
              className="w-full p-2 bg-yellow-500 rounded-full hover:bg-yellow-200 font-bold"
            >
              Subscribe
            </button>
          </div>
          <input
            type="text"
            name="email_address_check"
            value=""
            className="hidden"
            readOnly
          />
          <input type="hidden" name="locale" value="fr" />
          <input type="hidden" name="html_type" value="simple" />
        </form>
      </div>
    </div>
  );
};

export default Form;
