import { useRef, useState } from "react";
import StarfieldBackground from "./Animations/Stars";
import { MdOutlineRocket, MdOutlineRocketLaunch } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const ContactMe = () => {
  const rocketRef = useRef(null);
  const [isLaunched, setIsLaunched] = useState(false);

  const handleHover = () => {
    if (!isLaunched) {
      rocketRef.current.style.transform = "rotateZ(45deg)";
      rocketRef.current.style.transition = "transform 0.3s ease-in-out";
    }
  };

  const handleLeave = () => {
    if (!isLaunched) {
      rocketRef.current.style.transform = "rotateZ(0deg)";
      rocketRef.current.style.transition = "transform 0.3s ease-in-out";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLaunched(true);

    // rocket animation (icon only)
    rocketRef.current.style.transform = "translateX(300px)";
    rocketRef.current.style.transition = "transform 1s ease-in-out";

    // reset after animation
    setTimeout(() => {
      rocketRef.current.style.transform = "translateX(0px)";
      setIsLaunched(false);
    }, 5000);
  };

  const doubleGradient =
    "linear-gradient(90deg, #04c91b 0%, #04c91b 50%, #9333ea 50%, #db2777 100%)";

  return (
    <div className="relative w-full h-[100vh]">
      <StarfieldBackground />
      <div className="absolute inset-0 p-3">
        <h1 className="heading mb-20 mt-15 fade-in z-[10] relative sm:pl-10 pl-5">
          Get In Touch
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col fade-in relative top-20 font-normal justify-evenly gap-4 p-6 bg-white/5 border border-white/20 rounded-2xl sm:max-w-[600px] w-full mx-auto h-[500px] backdrop-blur-sm"
        >
          <input
            type="text"
            placeholder="Your Good Name"
            className="w-full rounded-lg border border-white/20 p-3"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border border-white/20 p-3"
          />
          <textarea
            placeholder="Your Message"
            className="w-full rounded-lg border border-white/20 p-3 h-[100px]"
          />
          <button
            type="submit"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="flex items-center overflow-hidden justify-center gap-2 font-semibold text-white p-2 h-[50px] cursor-pointer transition-all ease-in-out duration-300 rounded-md"
            style={{
              backgroundImage: doubleGradient, // KEEP the same gradient
              backgroundSize: "200% 100%", // double width so we can slide
              backgroundRepeat: "no-repeat",
              backgroundPosition: isLaunched ? "left center" : "right center",
              transition: "background-position 1000ms ease-in-out",
              willChange: "background-position",
            }}
          >
            <span>Send Message</span>
            <FaCheck
              size={20}
              style={{
                visibility: isLaunched ? "visible" : "hidden",
                transform: `scale(${isLaunched ? 1 : 0})`,
                transition: "transform 0.3s ease-in-out",
                transitionDelay: isLaunched ? "1s" : "0s",
              }}
            />

            <span
              id="rocket"
              className="relative translate-x-[-30px]"
              ref={rocketRef}
            >
              {isLaunched ? (
                <MdOutlineRocketLaunch size={20} />
              ) : (
                <MdOutlineRocket size={20} />
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactMe;
