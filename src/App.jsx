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

  // refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const [showNav, setshowNav] = useState(false);
  const [progress, setprogress] = useState(0);

  // store section heights
  const [sectionHeights, setSectionHeights] = useState({
    home: 0,
    about: 0,
    skills: 0,
    projects: 0,
    experience: 0,
    contact: 0,
  });

  // Text animation
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

  // measure section heights dynamically
  useEffect(() => {
    const updateHeights = () => {
      setSectionHeights({
        home: homeRef.current?.clientHeight || 0,
        about: aboutRef.current?.clientHeight || 0,
        skills: skillsRef.current?.clientHeight || 0,
        projects: projectsRef.current?.clientHeight || 0,
        experience: experienceRef.current?.clientHeight || 0,
        contact: contactRef.current?.clientHeight || 0,
      });
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    setTimeout(() => {
      TextAnimation();
    }, 1000);

    return () => {
      timeouts.current.forEach(clearTimeout);
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  // GSAP model animation
  useEffect(() => {
    if (!modelRef.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: mainref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => setprogress(self.progress.toFixed(2)),
        },
      })
      .to(modelRef.current, {
        x: "25vw",
        y: `${sectionHeights.about}px`,
        ease: "none",
      })
      .to(modelRef.current, {
        x: "-25vw",
        y: `${sectionHeights.skills + sectionHeights.about}px`,
        ease: "none",
      })
      .to(modelRef.current, {
        x: "25vw",
        y: `${
          sectionHeights.projects + sectionHeights.about + sectionHeights.skills
        }px`,
        ease: "none",
      })
      .to(modelRef.current, {
        x: "25vw",
        y: `${
          sectionHeights.experience +
          sectionHeights.about +
          sectionHeights.skills +
          sectionHeights.projects
        }px`,
        ease: "none",
      })
      .to(modelRef.current, {
        x: "0vw",
        y: `${
          sectionHeights.experience +
          sectionHeights.about +
          sectionHeights.skills +
          sectionHeights.projects +
          sectionHeights.contact
        }px`,
        ease: "none",
      });
  }, [sectionHeights]);

  return (
    <div
      ref={mainref}
      className="lg:w-[80%] mx-auto w-full relative z-0 h-fit overflow-x-hidden bg-black"
    >
      <div
        ref={homeRef}
        id="home"
        style={{ margin: "0 auto" }}
        className=" relative h-[100vh] z-[5] pb-20 flex flex-col items-center"
      >
        <div
          id="Name"
          style={{ transform: "translateY(350px)" }}
          className="font-bold font-primary absolute z-10 md:text-9xl text-7xl text-[#fff] transition-all ease-in-out select-none duration-700 blink-cursor"
        ></div>

        <ul className="navList flex sm:flex-nowrap flex-wrap z-[10] gap-y-3.5 bottom-16 items-center w-full absolute font-secondary justify-around md:text-xl sm:text-2xl text-xl">
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
        <div
          ref={modelRef}
          className="w-full h-full transition-all ease-in-out z-[1] relative "
        >
          {/* <Canvas style={{ background: "transparent" }} gl={{ alpha: true }}>
            <Character progress={progress} />
          </Canvas> */}
        </div>
      </div>

      <section
        ref={aboutRef}
        id="about"
        className="min-h-[100vh] relative z-[5]"
      >
        <About />
      </section>
      <section
        ref={skillsRef}
        id="skills"
        className="min-h-[100vh] relative z-[5]"
      >
        <Skills />
      </section>
      <section
        ref={projectsRef}
        id="projects"
        className="min-h-[125vh] relative z-[5]"
      >
        <Projects />
      </section>
      <section
        ref={experienceRef}
        id="experience"
        className="min-h-[100vh] relative z-[5]"
      >
        <Experience />
      </section>
      <section
        ref={contactRef}
        id="get-in-touch"
        className="min-h-[100vh] relative z-[5] "
      >
        <ContactMe />
      </section>
    </div>
  );
}
