import About from "./components/About";
import Character from "./components/character";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import { navLinks } from "./Constants";
import Experience from "./components/Experience";
import ContactMe from "./components/ContactMe";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainref = useRef(null);
  const modelRef = useRef(null); // ref for 3D model
  const timeouts = useRef([]);
  const [showNav, setshowNav] = useState(false);
  const [progress, setprogress] = useState(0);
  const [height, setheight] = useState(0);

  const TextAnimation = () => {
    const name = "MAHESH";
    const element = document.getElementById("Name");
    if (!element) return;

    // Clear previous timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    // Reset text & shadow
    element.innerText = "";
    element.style.setProperty("--shadow-x", "0px");
    element.style.setProperty("--shadow-y", "0px");

    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      const timeout = setTimeout(() => {
        element.innerText += char;
        if (i === name.length - 1) {
          // Apply shadow only after full text
          element.style.setProperty("--shadow-x", "-3px");
          element.style.setProperty("--shadow-y", "3px");
          setTimeout(() => {
            element.style.transition = "transform 1s ease-in-out";
            element.style.transform = "translateY(50px)";
            setshowNav(true);
          }, 500);
        }
      }, i * 200);
      timeouts.current.push(timeout);
    }
  };

  useEffect(() => {
    console.log(window.innerHeight);
    setTimeout(() => {
      TextAnimation();
    }, 1000);
    return () => {
      // cleanup if component unmounts
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!modelRef.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: mainref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            setprogress(self.progress.toFixed(2));
          },
        },
      })
      .to(modelRef.current, { x: "25vw", y: "100vh", ease: "none" })
      .to(modelRef.current, { x: "-25vw", y: "210vh", ease: "none" })
      .to(modelRef.current, { x: "25vw", y: "300vh", ease: "none" })
      .to(modelRef.current, { x: "25vw", y: "400vh", ease: "none" })
      .to(modelRef.current, { x: "0vw", y: "525vh", ease: "none" });
  }, []);

  return (
    <div
      ref={mainref}
      className="lg:w-[80%] mx-auto w-full relative z-0 sm:h-[625vh] h-fit  bg-black"
    >
      <div
        id="home"
        style={{ margin: "0 auto" }}
        className=" relative h-[100vh] z-[5] flex flex-col items-center"
      >
        <div
          id="Name"
          style={{ transform: "translateY(350px)" }}
          className="font-bold font-primary absolute z-10 md:text-9xl text-7xl text-[#fff] transition-all ease-in-out select-none duration-700 blink-cursor"
        ></div>

        <ul className="navList flex sm:flex-nowrap flex-wrap z-[10] bottom-16 items-center w-full absolute font-secondary justify-around md:text-xl sm:text-xl text-lg">
          {navLinks.map((element, index) => (
            <li
              key={index}
              style={{
                transitionDelay: showNav ? `${index * 300}ms` : "0ms",
              }}
              className={`transition-all sm:w-fit w-[50%] text-[#ffffff] cursor-pointer duration-700 ease-in-out ${
                showNav
                  ? "opacity-100 translate-y-0"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <a
                href={element.src}
                className="relative group font-bold hover:text-white flex transition-all duration-300 items-center flex-col"
              >
                {element.name}
                <span className="left-1/2 -bottom-1 block h-[1px] w-0 bg-primary transition-all duration-500  ease-out group-hover:w-[130%] group-hover:left-[-5px]"></span>
              </a>
            </li>
          ))}
        </ul>
        <div ref={modelRef} className="w-full h-full z-[1] relative ">
          <Canvas style={{ background: "transparent" }} gl={{ alpha: true }}>
            <Character progress={progress} />
          </Canvas>
        </div>
      </div>
      <section id="about" className="min-h-[100vh] relative z-[5]">
        <About />
      </section>
      <section id="skills" className="min-h-[100vh] relative z-[5]">
        <Skills />
      </section>
      <section id="projects" className="min-h-[125vh relative z-[5]">
        <Projects />
      </section>
      <section id="experience" className="min-h-[100vh] relative z-[5]">
        <Experience />
      </section>
      <section id="get-in-touch" className="min-h-[100vh] relative z-[5] ">
        <ContactMe />
      </section>
    </div>
  );
}
