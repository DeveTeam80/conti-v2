import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useSmooth } from "../hooks/useSmooth";

interface Project {
  id: number;
  title: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Continental Heights",
    image: "assets/images/horizon/about-ch-01.png",
  },
  {
    id: 2,
    title: "Continental Horizon",
    image: "/assets/images/horizon/Continental Heights_Base_Cam-01.jpg.jpeg",
  },
  {
    id: 3,
    title: "Sahar Business Center",
    image: "/assets/images/sahar.png",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  progress,
}) => {
  const spacing = 0.45;
  const baseAngle = (index - (total - 1) / 2) * spacing;

  const carouselRotation = useTransform(progress, [0, 1], [1.5, -0.45]);

  const angle = useTransform(carouselRotation, (rot) => rot + baseAngle);

  const radius = 1200;
  const x = useTransform(angle, (a) => Math.sin(a) * radius);
  const y = useTransform(angle, (a) => (1 - Math.cos(a)) * radius - 50);
  const rotate = useTransform(angle, (a) => (a * 180) / Math.PI);

  const opacity = useTransform(angle, [-1.5, -0.8, 0.8, 1.5], [0, 1, 1, 0]);
  const scale = useTransform(angle, [-1.5, 0, 1.5], [0.7, 1, 0.7]);

  return (
    <motion.article
      className="absolute w-[320px] md:w-[420px] aspect-[4/5] overflow-hidden shadow-2xl bg-[#faf8f4] border border-white/5"
      style={{
        x,
        y,
        rotate,
        opacity,
        scale,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* <div className="absolute top-8 left-8 z-20 text-white/70 text-xs font-medium tracking-wider">
        {project.date}
      </div> */}
      <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
          {project.title}
        </h3>
      </div>
    </motion.article>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSmooth(scrollYProgress, 0.08);

  return (
    <div className="bg-[#faf8f4] text-white min-h-screen">
      {/* Sticky Carousel Section */}
      <section ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          {/* Background Arc Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 1241"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="720"
                cy="1200"
                r="1000"
                stroke="white"
                strokeWidth="1"
              />
              <circle
                cx="720"
                cy="1200"
                r="800"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Fixed Title during scroll */}
          <motion.div
            className="absolute top-20 z-10 text-center"
            style={{
              opacity: useTransform(
                smoothProgress,
                [0, 0.1, 0.9, 1],
                [0, 1, 1, 0],
              ),
              y: useTransform(smoothProgress, [0, 0.2], [20, 0]),
            }}
          >
            <h2 className="text-6xl md:text-8xl font-light uppercase text-brown-deep">
              Our <span className="text-gradient-gold">Projects</span>
            </h2>
          </motion.div>

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={PROJECTS.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
