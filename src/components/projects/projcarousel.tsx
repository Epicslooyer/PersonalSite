"use client";
import React from "react";
import { useTheme } from "next-themes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Project from "./proj";

const projects = [
  {
    title: "Project 1",
    description: [
      "A full-stack web application built with Next.js and TypeScript.",
      "Features include real-time updates, authentication, and responsive design.",
      "Implements modern web development practices and best practices.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    image: "/path/to/project1-image.jpg",
    githubLink: "https://github.com/yourusername/project1",
    siteLink: "https://project1.com",
  },
  {
    title: "Project 1",
    description: [
      "A full-stack web application built with Next.js and TypeScript.",
      "Features include real-time updates, authentication, and responsive design.",
      "Implements modern web development practices and best practices.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    image: "/path/to/project1-image.jpg",
    githubLink: "https://github.com/yourusername/project1",
    siteLink: "https://project1.com",
  },
  {
    title: "Project 3",
    description: ["This is another project for testing scrollability."],
    tags: ["Example"],
    image: "/placeholder.jpg",
    githubLink: "#",
    siteLink: "#",
  },
  {
    title: "Project 4",
    description: ["Another one to push carousel limits."],
    tags: ["Placeholder"],
    image: "/placeholder.jpg",
    githubLink: "#",
    siteLink: "#",
  },
];

export default function ProjectCarousel() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [setApi] = React.useState();

  return (
    <div className={`w-full flex justify-start px-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        <div className="w-[370px]">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        plugins={[]}
      >
        <CarouselContent className="-ml-4">
          {projects.map((project, index) => (
            <CarouselItem key={index} className="pl-4 basis-auto ">
              <div className="p-1 w-full sm:w-[350px]">
                <Project {...project} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={`${isDark ? "text-gray-100" : "text-gray-900"}`} />
        <CarouselNext className={`${isDark ? "text-gray-100" : "text-gray-900"}`} />      </Carousel>
    </div>
    </div>
  );
}
