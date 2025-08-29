import { TECH } from "../Constants";
import useFadeInAnimation from "./hooks/FadeInAnimation";

const Skills = () => {
  useFadeInAnimation();

  return (
    <div
      id="skills"
      className="w-full h-full flex flex-col sm:items-end items-center justify-center"
    >
      <h1 className="fade-in pr-10 mt-10 w-full text-end heading">Skills</h1>
      <div className="w-fit p-10 rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {TECH.map((tech) => (
            <div
              key={tech.name}
              title={tech.name}
              className="fade-in  tech-icon group relative flex flex-col cursor-pointer backdrop-blur-lg items-center justify-center rounded-xl"
            >
              {/* Glow element (behind the card) */}
              <div
                className="absolute  rounded-xl w-[80px] h-[80px] opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"
                style={{
                  background: tech.color,
                }}
              ></div>

              {/* Actual glass card */}
              <div className="relative transition-all hover:shadow-[0px_4px_0px_4px_#414141] ease-in-out duration-400 hover:translate-y-[-10px]  w-[120px] h-[120px] rounded-xl border bg-white/10 border-white/20 p-7 flex items-center justify-center">
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="sm:w-16 w-12 sm:h-16 h-12"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
