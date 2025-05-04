import Terminal from "../components/terminal/terminal";

const pages = {
  about: "Information about us",
  contact: "Contact details",
  projects: "List of projects",
  clear: "Clears the terminal"
};

export default function Home() {
  return <Terminal pages={pages} />;
}