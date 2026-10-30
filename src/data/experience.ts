export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Data Scientist",
    org: "Clockwork Energy",
    location: "Waterloo, ON",
    dates: "Jan 2026 — Present",
    bullets: [
      "Built a production root-cause engine that ranks likely EV-charger failures from telemetry on 2,000+ chargers and millions of OCPP events.",
      "Showed that a 1% lift in charging success corresponded to over $1,000 in extra energy dispensed per month.",
      "Traced abnormal heartbeat patterns that were generating nearly 600 false offline alerts and cut unnecessary operator dispatches.",
    ],
  },
  {
    role: "Research Assistant",
    org: "Tangent Lab, SFU",
    location: "Burnaby, BC",
    dates: "Jul 2024 — Dec 2024",
    bullets: [
      "Ran statistical analysis on gesture-recognition datasets and hit 98% accuracy at low latency.",
      "Dockerized a ROS1 simulation that wired a Leap Motion sensor to a Unitree Z1 arm, cutting setup time by ~80%.",
      "Shipped a real-time PyTorch CNN whose outputs drove a Q-learning controller for adaptive arm motion.",
    ],
  },
  {
    role: "STEAM & Coding Instructor",
    org: "Science Alive",
    location: "Vancouver, BC",
    dates: "May 2024 — Oct 2024",
    bullets: [
      "Wrote and taught Python and full-stack workshops for 150+ students.",
      "Standardized lesson plans and debugging guides so delivery stayed consistent across instructors.",
      "Worked with instructors and parents on progress reports; 95% positive feedback.",
    ],
  },
];
