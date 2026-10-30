"use client";
import Terminal from "../components/terminal/terminal";
import About from "./pages/About";
import { useMediaQuery } from "react-responsive";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Experience from "./pages/Experience";
import Lab from "@/components/lab/Lab";

const pages = {
  about: <About />,
  contact: <Contact />,
  projects: <Projects />,
  experience: <Experience />,
  lab: <Lab />,
  help: <Help />,
};

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return <Terminal pages={pages} isMobile={isMobile} />;
}
