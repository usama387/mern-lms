import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSection() {
  const courses = [
    {
      title: "Fullstack Development",
      description: "Master MERN stack with modern architecture and DevOps",
      image:
        "/fullstack.avif",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Learn Python, TensorFlow, and neural networks implementation",
      image:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1448&q=80",
    },
    {
      title: "UI/UX Design",
      description: "Master Figma, Adobe XD, and user-centered design",
      image:
        "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-28 p-8 bg-gray-50">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 lg:w-2/5">
        <Carousel className="rounded-xl shadow-xl overflow-hidden">
          <CarouselContent>
            {courses.map((course, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-0">
                    <CardContent className="relative aspect-video p-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${course.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                      <div className="relative h-full flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-200">{course.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
        </Carousel>
      </div>

      {/* Text Content Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 space-y-6 animate-[slideIn_1s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Transform Your Career with{" "}
          <span className="text-blue-600">Smart Learning</span>
        </h1>
        <p className="text-lg text-gray-600">
          Join 500,000+ learners worldwide and master in-demand skills through
          our project-based courses with expert mentorship.
        </p>

        {/* Search Form */}
        <form className="flex items-center bg-white rounded-md shadow-lg overflow-hidden">
          <Input
            type="text"
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 placeholder-gray-400"
          />
          <Button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-r-full hover:bg-blue-700"
          >
            Search
          </Button>
        </form>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">✓</span>
            </div>
            <p className="font-medium">Industry-Ready Curriculum</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">⌛</span>
            </div>
            <p className="font-medium">Self-Paced Learning</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">💼</span>
            </div>
            <p className="font-medium">Career Support Services</p>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Explore Courses
        </button>
      </div>
    </div>
  );
}
