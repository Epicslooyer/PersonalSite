import Terminal from "../components/terminal/terminal";
import About from "./pages/About";


const pages = {
  about: <About />,
  contact: "hi",
  projects: "hi",
  clear: "hi",
  help: `## Quick commands:
:help - Display help menu and commands
:about - About me
:projects - Show my projects
:contact - Contact info
:experimental - Run in browser experimental projects
:clear - Clear the terminal (similar to :q)
  `
};

export default function Home() {
  return <Terminal pages={pages} />;
}