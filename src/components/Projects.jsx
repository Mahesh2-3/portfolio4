import { useState } from "react";
import { projects } from "../Constants";
import useFadeInAnimation from "./hooks/FadeInAnimation";
import { IoMdClose } from "react-icons/io";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegEye } from "react-icons/fa";

const ProjectCard = ({ project, onShowTech }) => {
  return (
    <div className="project-card fade-in group w-[350px] h-[28rem] font-normal [perspective:1000px]">
      <div className="relative w-full hover:translate-y-[-15px] cursor-pointer h-full duration-700 [transform-style:preserve-3d]">
        {/* Front Side */}
        <div className="absolute inset-0 glass-bg shadow-lg flex flex-col items-start justify-between p-6 overflow-hidden [backface-visibility:hidden]">
          <a
            href={project.github}
            target="_blank"
            className="absolute w-12 h-12 cursor-pointer p-3 top-3 right-3 bg-gradient-to-tr from-[#6b6868] via-[#302d2d] to-black rounded-full"
          >
            <img src="/tech/github.png" className="object-cover" alt="github" />
          </a>
          <img
            src={project.img}
            alt="project preview"
            className="w-full h-52 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-xs text-white/50 font-normal line-clamp-6 overflow-ellipsis text-start">
            {project.desc}
          </p>
          <div className="w-full text-sm mt-3 flex gap-4 items-center justify-between">
            <a
              href={project.link}
              target="_blank"
              className="text-blue-400 flex items-center gap-2 hover:text-blue-300"
            >
              Live <FaRegEye />
            </a>
            <button
              className="text-xs cursor-pointer"
              onClick={() => onShowTech(project.tech)}
            >
              Tech Used →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  useFadeInAnimation();
  const [showModal, setShowModal] = useState(false);
  const [techData, setTechData] = useState([]);

  const handleShowTech = (tech) => {
    setTechData(tech);
    setShowModal(true);
  };

  return (
    <div className="w-full px-15 h-full flex flex-col sm:items-start items-center">
      <h1 className="heading my-20 mb-10 fade-in">My Work</h1>
      <div className="grow-1 flex sm:justify-start  justify-center flex-wrap gap-10 ">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onShowTech={handleShowTech}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white/10 border backdrop-blur-md border-white/20 p-4 rounded-xl sm:w-[600px] h-[90vh] w-full max-h-[80vh] shadow-2xl">
            <h2 className="text-xl font-bold mb-4 pl-4">Technologies Used</h2>
            <SyntaxHighlighter
              language="json"
              style={vscDarkPlus}
              className="rounded-md text-sm h-[90%] p-4 hide-scrollbar overflow-x-auto overflow-y-auto"
            >
              {JSON.stringify(techData, null, 2)}
            </SyntaxHighlighter>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 fixed top-0 right-4 cursor-pointer"
            >
              <IoMdClose size={25} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
