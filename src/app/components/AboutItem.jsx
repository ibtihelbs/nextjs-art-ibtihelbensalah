"use client";
import { urlFor } from "@/sanity/imageUrl";
import { Title } from "./Text";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutItem = ({ item, index }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Define transformations
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index % 2 === 0 ? [5, 0, -3] : [-5, 0, 3]
  );

  // Helper to render content blocks
  const renderContent = () => {
    // If content is an array of blocks (rich text from Sanity)
    if (Array.isArray(item.content)) {
      return item.content.map((block) => {
        if (block._type === "block") {
          return (
            <p key={block._key} className="text-base leading-relaxed">
              {block.children?.map((child) => child.text).join("")}
            </p>
          );
        }
        return null;
      });
    }

    // If content is a simple string
    if (typeof item.content === "string") {
      return item.content
        .split(".")
        .filter(Boolean)
        .map((sentence, i) => (
          <p key={i} className="text-base leading-relaxed">
            {sentence.trim()}.
          </p>
        ));
    }

    return <p>No content available</p>;
  };

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        rotate,
      }}
      className="sticky top-[10vh] p-3 gap-5 bg-white md:h-[80vh] overflow-hidden  grid grid-cols-6"
    >
      <div className="col-span-1 ">
        <Title
          className="text-start lg:text-[140px] w-full text-gray-200"
          content={`0${index + 1}`}
        />
      </div>

      {item.image?.asset?._ref && (
        <div className=" relative hidden md:block md:col-span-3 rounded-lg overflow-hidden">
          <Image
            src={urlFor(item.image).width(800).height(600).url()}
            alt={item.title || "About image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      )}

      <div className="vr grid content-start gap-4 md:col-span-2 col-span-5">
        <Title
          content={item.title}
          className="bg-black text-white text-start lg:text-6xl xl:text-7xl w-full px-4 py-2 rounded-lg"
        />

        <div className="grid gap-3 text-gray-700">{renderContent()}</div>
      </div>
    </motion.div>
  );
};

export default AboutItem;
