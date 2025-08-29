import useFadeInAnimation from "./hooks/FadeInAnimation";

import { useState } from "react";

const GlowingCard = ({ word, src }) => {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    // Only enable click flip on small devices
    if (window.innerWidth <= 768) {
      setFlipped(!flipped);
    }
  };

  return (
    <div
      className="group w-72 fade-in h-96 cursor-pointer font-normal [perspective:1000px]"
      onClick={handleToggle}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] 
          ${flipped ? "[transform:rotateY(180deg)]" : ""}
          group-hover:[transform:rotateY(180deg)]`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 glass-bg shadow-lg flex items-center justify-center [backface-visibility:hidden] rounded-2xl">
          <img width={80} height={80} src={src} alt="image" />
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-white font-bold uppercase tracking-widest">
            {word}
          </span>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  useFadeInAnimation();
  return (
    <div
      style={{ padding: "40px" }}
      id="about-me"
      className="w-full h-full flex flex-col justify-around"
    >
      <div className="mb-20">
        <h1 className="heading fade-in">About Me</h1>
        <div className="fade-in mt-10 tracking-wide sm:w-[60%] w-full text-primary">
          HI there, I'm <span className="font-bold text-white">MAHESH</span>, I
          am a Full Stack Web Developer passionate about creating modern and
          impactful digital experiences. I love transforming ideas into
          interactive solutions that blend creativity with functionality. Always
          curious and learning, I aim to build projects that make a real
          difference.
        </div>
      </div>
      <div className="flex flex-wrap gap-6 ">
        <GlowingCard word={"FRONTEND DEVELOPER"} src={"/frontend.png"} />
        <GlowingCard word={"BACKEND DEVELOPER"} src={"/backend.png"} />
      </div>
    </div>
  );
};

export default About;
