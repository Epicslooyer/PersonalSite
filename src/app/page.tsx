"use client"
import Terminal from "../components/terminal/terminal";
import About from "./pages/About";
import { useMediaQuery } from "react-responsive";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const pages = {
  about: <About />,
  contact: <Contact />,
  projects: <Projects />,
  help: `## Quick commands:
:help - Display help menu and commands
:about - About me
:projects - Show my projects
:contact - Contact info
:experimental - Run in browser experimental projects
  `
};

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  return <Terminal pages={pages} isMobile={isMobile} />;
}