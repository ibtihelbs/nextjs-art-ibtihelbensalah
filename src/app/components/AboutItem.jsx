"use client";
import { urlFor } from "@/sanity/imageUrl";
import { PortableText } from "@portabletext/react";
import { XlTitle } from "./Text";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const AboutItem = ({ item, index }) => {
  console.log(item);
  const { scrollYProgress } = useScroll({
    target: null, // No need for a ref
    offset: ["start end", "end start"], // Adjust offsets for smooth animations
    layoutEffect: false, // Disable layout effect for better performance
  });

  // Define transformations
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [-10, 0] : [10, 0]
  );
  return (
    <motion.div
      key={index}
      style={{
        scale,
        rotate,
      }}
      className="sticky top-1/4 w-4/5 h-[250px] overflow-hidden gap-4 grid grid-cols-2"
    >
      <div className="relative">
        <Image
          src={urlFor(item.image).width().height().url()}
          alt={item.title}
          fill
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="vr grid content-start gap-2 bg-white p-3">
        <XlTitle
          content={item.title}
          className={"bg-black text-white w-full"}
        />
        <p>{item.content}</p>
        <div className="prose max-w-none">
          <PortableText value={item.content} />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutItem;
