"use client";
import { urlFor } from "@/sanity/imageUrl";
import { XlTitle } from "./Text";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const AboutItem = ({ item, index }) => {
  const { scrollYProgress } = useScroll({
    target: null, // No need for a ref
    offset: ["start end", "end start"], // Adjust offsets for smooth animations
    layoutEffect: false, // Disable layout effect for better performance
  });
  // Define transformations
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    index % 2 === 0 ? [10, 0, -5] : [-10, 0, 5]
  );

  return (
    <motion.div
      key={item._id}
      style={{
        scale,
        rotate,
      }}
      className="sticky top-1/12 p-3 gap-5 bg-white md:h-[80vh]  overflow-hidden border-solid   grid grid-cols-6"
    >
      <XlTitle
        className={" text-start lg:text-[140px] w-full"}
        content={`0${index + 1}`}
      />
      <div className="relative hidden md:block md:col-span-2">
        <Image
          src={urlFor(item.image).width().height().url()}
          alt={item.title}
          fill
          className="object-cover w-full h-auto"
        />
      </div>
      <div className=" grid content-start gap-4  md:col-span-5 ">
        <XlTitle
          content={item.title}
          className={"bg-black text-white text-start lg:text-[140px] w-full"}
        />

        <div className="vr grid gap-3">
          {item.content.split(".").map((p, i) => (
            <p key={i}> {p} </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutItem;
