import React from "react";
import { motion } from "motion/react";
import { BookOpen, Users, Heart, ArrowRight } from "lucide-react";
// Web-sized copies of the Aug 2026 shoot; originals kept in assets/.
// All five are exactly 3:2, so the 3/2 tiles below crop nothing.
import ss1 from "../assets/sunday-school/sunday-school-1.jpg";
import ss2 from "../assets/sunday-school/sunday-school-2.jpg";
import ss3 from "../assets/sunday-school/sunday-school-3.jpg";
import ss4 from "../assets/sunday-school/sunday-school-4.jpg";
import ss5 from "../assets/sunday-school/sunday-school-5.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Biblical Teaching",
    description:
      "Each class digs into Scripture with age-appropriate lessons designed to build a lasting foundation of faith for every stage of life.",
  },
  {
    icon: Users,
    title: "All Ages Welcome",
    description:
      "From young children to senior adults, Sunday School offers a class where everyone belongs and grows together in community.",
  },
  {
    icon: Heart,
    title: "Real Connection",
    description:
      "More than a class — Sunday School is a family. Build friendships, support one another, and experience life together throughout the week.",
  },
];

/**
 * Two half-width tiles on the first row, three third-width on the second, so
 * both rows fill evenly on a 6-column grid.
 */
const photos = [
  { src: ss1, alt: "Senior adults seated together in a Sunday School class", span: "lg:col-span-3" },
  { src: ss2, alt: "Young adults gathered for a Sunday School class", span: "lg:col-span-3" },
  { src: ss3, alt: "Two boys reading a Bible together in class", span: "lg:col-span-2" },
  { src: ss4, alt: "Girls gathered around a table in a children's classroom", span: "lg:col-span-2" },
  { src: ss5, alt: "A young boy working on a craft during Sunday School", span: "lg:col-span-2" },
];

export default function SundaySchool() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            Sunday School
          </h1>
        </div>
      </section>

      {/* Features — soft gold wash carries the mid-page separation */}
      <section className="py-24 px-6 bg-church-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="handwritten text-church-accent mb-2 block">
              What We're About
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue">
              A Class for Every Season of Life
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-black/5 flex flex-col"
              >
                <div className="w-12 h-12 rounded-full bg-church-blue/10 flex items-center justify-center mb-6">
                  <item.icon className="text-church-blue" size={22} />
                </div>
                <h3 className="text-2xl font-serif text-church-blue mb-4">
                  {item.title}
                </h3>
                <p className="text-church-dark/70 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-16">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className={`${photo.span} aspect-[3/2] rounded-2xl overflow-hidden shadow-lg`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — white keeps the last section clear of the navy footer */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="handwritten text-church-accent mb-4 block">
            We'd Love to See You
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
            Join Us This Sunday
          </h2>
          <p className="text-lg text-church-dark/70 leading-relaxed mb-10">
            Sunday School meets at 10 o'clock each week. Whether
            you're new to the faith or have been walking with Jesus for decades,
            there's a class here for you.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScEcrasMk314zHohdwNi6pbC9B2rbT-A120VlBeCaQU2-XE3A/viewform"
            className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
            target="_blank"
          >
            Find Your Group <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
