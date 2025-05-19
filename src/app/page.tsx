"use client";

import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiChevronDown, FiMinus } from "react-icons/fi";
import StoryModal from "./StoryModal";
import TechLoader from "./TechLoader";
import SpotlightBackground from "./SpotlightBackground";

const description =
  "Backend-focused, modern web applications developer. Passionate about Node.js, TypeScript, and cloud technologies.";
const linkedin = "https://www.linkedin.com/in/ercanyarmacieng/";
const github = "https://github.com/ercanvas";
const email = "yarmaciercanyasin@gmail.com";

const about = `Detail-oriented and innovative Full Stack Developer with experience in building responsive websites, web applications, and scalable SSR/SSG and SAAS solutions. Skilled in leveraging modern technologies such as the MERN stack and Python scripting, with a strong command of cross-platform mobile development using React Native and Flutter. Proficient in using industry-standard tools including Visual Studio Code, PyCharm, JetBrains IDEs, MongoDB Compass, Postman, Docker, and Git for efficient development, testing, and deployment workflows. Known for delivering clean, maintainable code and developing high-performance, user-centric applications.`;

const workExperience = `WORK EXPERIENCE\nFreelancer 2020 - Present\n- Developed a user feedback system and database integration for a social media platform.\n- Built a restaurant management system using QT generator, including price management, calculations and UI design.\n- Created a chess game and opponent bot using Flask.\n- Developed websites for educational material.\n- Developed website for streaming that includes YouTube live channels and global - local channels.\n- Developed a web game where global users can interact through a built in chat/voice channel. The game includes GPS for location tracking, a step counter inspired application but also has a feature for vehicles.\n- Developed a water planting robot with a system operated software.`;

const skills = `SKILLS\nTechnical Skills\n- Programming Language: Python, PHP, Go.\n- Web Technologies: HTML, CSS, JavaScript\n- Database Management: MariaDB, HeidiSQL\n- Development Tools: Laragon, Flask, QT Creator\n- Project Experience: FinTech app development, social media site development\n\nSoft Skills\n- Problem-Solving\n- Teamwork and collaboration\n- Adaptability`;

const academic = `ACADEMIC HISTORY\nEge University - Bergama Vocational School\n2021 - 2025\nAssociate Degree in Computer Programming\n\nYasemin Erman Balsu Anatolian High School\n2016 - 2020`;

const language = `LANGUAGE\nTURKISH\nNative Language\nENGLISH\nCEFR B2 Level English Certified`;

const sections = [
  { key: "about", title: "About", content: about },
  { key: "work", title: "Work Experience", content: workExperience },
  { key: "skills", title: "Skills", content: skills },
  { key: "academic", title: "Academic History", content: academic },
  { key: "language", title: "Languages", content: language },
];

export default function Home() {
  const [open, setOpen] = useState<string | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyUrl, setStoryUrl] = useState<string | undefined>(undefined);
  const [animating, setAnimating] = useState(false);
  const [segments, setSegments] = useState(0);
  const nameRef = useRef<HTMLHeadingElement>(null!);
  const [spotOnName, setSpotOnName] = useState(false);
  const [bgHidden, setBgHidden] = useState(false);

  useEffect(() => {
    if (storyUrl) {
      setAnimating(true);
      setSegments(0);
      let i = 0;
      const total = 24;
      const interval = setInterval(() => {
        i++;
        setSegments(i);
        if (i === total) {
          clearInterval(interval);
          setTimeout(() => setAnimating(false), 300);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setAnimating(false);
      setSegments(0);
    }
  }, [storyUrl]);

  return (
    <TechLoader>
      {/* Sağ üstte toggle butonu */}
      {/* Masaüstü: Hide background butonu */}
      <button
        className="hidden md:block fixed top-6 right-6 z-50 px-5 py-2 rounded-full bg-black/80 text-white dm-sans font-bold shadow-lg hover:bg-black transition"
        onClick={() => setBgHidden((v) => !v)}
      >
        {bgHidden ? "Show background" : "Hide background"}
      </button>
      {/* Mobil: Hide background ikon butonu */}
      <button
        className="md:hidden fixed top-6 right-6 z-50 bg-[#18181b] text-white rounded-full p-3 shadow-lg"
        onClick={() => setBgHidden((v) => !v)}
        aria-label={bgHidden ? "Show background" : "Hide background"}
      >
        {bgHidden ? <FaEye /> : <FaEyeSlash />}
      </button>
      {/* Spotlight arka planı sadece bgHidden false ise */}
      {!bgHidden && (
        <SpotlightBackground nameRef={nameRef} setSpotOnNameAction={setSpotOnName} />
      )}
      <div className={`relative min-h-screen w-full flex items-center justify-center z-30 ${bgHidden ? "bg-black" : "bg-transparent"}`}>
        <div className={`w-full flex flex-col items-center justify-center ${bgHidden ? "bg-black" : "bg-transparent"}`}>
          <div className={`w-full max-w-xl rounded-2xl ${bgHidden ? "bg-black" : "bg-transparent"} shadow-none p-6 md:p-10 flex flex-col items-center`}>
            <StoryModal
              open={storyOpen}
              onCloseAction={() => setStoryOpen(false)}
              onSendAction={(blob) => {
                const url = URL.createObjectURL(blob);
                setStoryUrl(url);
                setStoryOpen(false);
              }}
              videoUrl={storyUrl}
              onDeleteAction={() => {
                setStoryUrl(undefined);
                setStoryOpen(false);
              }}
            />
            <main className={`flex flex-col items-center gap-8 w-full ${bgHidden ? "text-white" : ""}`}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`relative rounded-full p-1 mb-2 cursor-pointer transition-all ${storyUrl ? "" : "bg-[#23232b]"}`}
                  onClick={() => setStoryOpen(true)}
                  title={storyUrl ? "View Story" : "Add Story"}
                  style={{ boxShadow: storyUrl ? "0 0 0 4px #23232b" : undefined }}
                >
                  {storyUrl && (
                    <svg
                      className="absolute inset-0 w-full h-full z-10"
                      width="124" height="124" viewBox="0 0 124 124"
                      style={{ pointerEvents: "none" }}
                    >
                      {(!animating
                        ? Array.from({ length: 1 })
                        : Array.from({ length: segments })
                      ).map((_, idx) => {
                        if (!animating) {
                          // Tek parça halka
                          return (
                            <circle
                              key="full"
                              cx="62"
                              cy="62"
                              r="60"
                              stroke="url(#story-gradient)"
                              strokeWidth="6"
                              fill="none"
                            />
                          );
                        }
                        // Segmentli animasyon
                        const angle = (360 / 24) * idx;
                        const r = 60;
                        const x1 = 62 + r * Math.cos(((angle - 7.5) * Math.PI) / 180);
                        const y1 = 62 + r * Math.sin(((angle - 7.5) * Math.PI) / 180);
                        const x2 = 62 + r * Math.cos(((angle + 7.5) * Math.PI) / 180);
                        const y2 = 62 + r * Math.sin(((angle + 7.5) * Math.PI) / 180);
                        return (
                          <path
                            key={idx}
                            d={`M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2}`}
                            stroke="url(#story-gradient)"
                            strokeWidth="6"
                            fill="none"
                            style={{ opacity: 1, transition: "opacity 0.2s" }}
                          />
                        );
                      })}
                      <defs>
                        <linearGradient id="story-gradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a21caf" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  <img
                    src="/images/ercan_yasin.jpg"
                    alt="Ercan Yasin Yarmacı"
                    className="relative rounded-full w-28 h-28 border-4 border-[#18181b] object-cover z-20"
                  />
                </div>
                <h1
                  ref={nameRef}
                  className={`dm-sans text-2xl font-bold tracking-tight text-center uppercase transition-colors duration-300 ${spotOnName && !bgHidden ? "text-[#00ff66]" : bgHidden ? "text-white" : "text-white"}`}
                >
                  ERCAN YASIN YARMACI
                </h1>
                <h2 className={`dm-sans text-base font-semibold text-center uppercase ${bgHidden ? "text-white" : "text-black"}`}>JAVASCRIPT/SOFTWARE DEVELOPER</h2>
                <p className={`manrope text-center text-base max-w-md ${bgHidden ? "text-white" : "text-black"}`}>{description}</p>
                <div className="flex flex-col gap-2 mt-2 w-full items-center">
                  <a href={`mailto:${email}`} className="dm-sans flex items-center gap-2 bg-[#23232b] hover:bg-[#292933] px-4 py-2 rounded-full text-sm font-medium transition w-fit text-white" title="Send Email">
                    <FaEnvelope className="text-[#a21caf]" />
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#0a66c2] text-2xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-[#f5f5f5] text-2xl"
                >
                  <FaGithub />
                </a>
              </div>
              <div className="flex flex-col gap-3 w-full mt-8">
                {sections.map((section) => (
                  <div key={section.key} className="bg-[#23232b] rounded-lg shadow">
                    <button
                      className="dm-sans w-full flex items-center justify-between px-5 py-4 text-lg font-semibold focus:outline-none hover:bg-[#292933] transition text-white"
                      onClick={() =>
                        setOpen(open === section.key ? null : section.key)
                      }
                      aria-expanded={open === section.key}
                      aria-controls={`section-${section.key}`}
                    >
                      <span className="text-white">{section.title}</span>
                      {open === section.key ? (
                        <FiMinus className="text-xl text-white" />
                      ) : (
                        <FiChevronDown className="text-xl text-white" />
                      )}
                    </button>
                    {open === section.key && (
                      <div
                        id={`section-${section.key}`}
                        className="manrope px-5 pb-5 text-white whitespace-pre-line text-base animate-fadeIn"
                      >
                        {section.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
            <footer className="mt-12 text-xs text-[#f8fafc] text-center">
              © {new Date().getFullYear()} Ercan Yasin Yarmacı
            </footer>
          </div>
        </div>
      </div>
    </TechLoader>
  );
}
