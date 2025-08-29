import { Experiences } from "../Constants";
import useFadeInAnimation from "./hooks/FadeInAnimation";

const ExperienceItem = ({ experience, index }) => {
  return (
    <div className="relative fade-in font-normal flex gap-15">
      <div className="sm:relative absolute z-5 top-[-20px] w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-[0px_0px_15px_0px_#c229b4] flex items-center justify-center font-bold text-xl rounded-full ">
        {index + 1}
      </div>
      <div className="content max-w-[500px] glass-bg">
        <div className="flex items-center justify-between ">
          <h1 className="sm:text-lg text-md font-semibold">
            {experience.role}
          </h1>
          <span className="sm:text-sm text-xs text-primary">
            {experience.duration}
          </span>
        </div>
        <div className="text-primary mb-5">{experience.company}</div>
        <ul className="list-disc px-5 sm:text-md text-sm space-y-1 text-secondary">
          {experience.points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  useFadeInAnimation();
  return (
    <div className="w-full h-full mt-30 sm:px-10 px-5 flex flex-col sm:items-start items-center">
      <h1 className="heading fade-in mb-20 fade-in">Experience</h1>
      <div className="flex flex-col gap-10">
        {Experiences.map((exp, index) => (
          <ExperienceItem key={index} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
