import { XlTitle } from "./Text";
const Hero = () => {
  return (
    <section className="grid grid-cols-4 w-full min-h-[70vh] gap-6 ">
      <div className="col-span-3 grid grid-cols-3 gap-3">
        <div className="w-full h-full bg-red-300 col-span-2"></div>
        <div>
          <XlTitle content={"title lool lool"} className={"text-start"} />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            ut animi quam suscipit sequi vitae sapiente alias rerum natus
            aspernatur id enim obcaecati ullam nemo, iure sint quaerat eaque
            laudantium.
          </p>
          <div className="flex gap-2"></div>
          <button className=" border-solid border-2 rounded-full float-right px-4 py-1">
            {" "}
            read more...{" "}
          </button>
        </div>
        <div className="col-span-3 flex gap-3 whitespace-nowrap">
          <XlTitle
            content={"predule creative predule creative predule creative"}
            className={
              " text-6xl  overflow-hidden text-start whitespace-nowrap bg-yellow-400"
            }
          />
        </div>
      </div>
      <div className="bg-yellow-400 vr">dqdq</div>
    </section>
  );
};

export default Hero;
