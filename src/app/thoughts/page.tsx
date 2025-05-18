"use client";
import TechLoader from "../TechLoader";
import SpotlightBackground from "../SpotlightBackground";
import Navbar from "../Navbar";
import { useRef, useState } from "react";

export default function ThoughtsPage() {
  const nameRef = useRef<HTMLHeadingElement>(null!);
  const [spotOnName, setSpotOnName] = useState(false);
  return (
    <TechLoader>
      <Navbar />
      <SpotlightBackground
        nameRef={nameRef}
        setSpotOnNameAction={setSpotOnName}
      />
      <div className="relative min-h-screen w-full flex items-center justify-center z-30">
        <div className="w-full flex flex-col items-center justify-center bg-transparent">
          <div className="w-full max-w-xl rounded-2xl bg-transparent shadow-none p-6 md:p-10 flex flex-col items-center">
            {/* İçerik boş, sadece başlık örneği */}
            <h1
              ref={nameRef}
              className={`dm-sans text-2xl font-bold tracking-tight text-center uppercase transition-colors duration-300 ${
                spotOnName ? "text-[#00ff66]" : "text-white"
              }`}
            >
              Thoughts
            </h1>
          </div>
        </div>
      </div>
    </TechLoader>
  );
}