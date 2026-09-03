import React from "react";
import { motion } from "motion/react";
import { BookOpen, Users, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import groupsHero from "../assets/Carrollton FMC_Aug2026-77.jpg";
import groups2 from "../assets/CFMC-Groups-and-Studies-2.jpg";
import groups3 from "../assets/CFMC-Groups-and-Studies-3.jpg";
import groups4 from "../assets/CFMC-Groups-and-Studies-4.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Grow in Scripture",
    description:
      "Deepen your understanding of the Bible through guided studies that connect God's Word to everyday life.",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "Find your people. Our groups foster genuine friendships where you encourage and support one another along the way.",
  },
  {
    icon: Heart,
    title: "Every Stage of Life",
    description:
      "Whether you're new to faith or have followed Jesus for decades, there is a group made for where you are right now.",
  },
];

export default function Groups() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section
        className="pt-40 pb-20 px-6 text-white text-center relative"
        style={{
          backgroundImage: `url(${groupsHero})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 25%",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/75" />
        <div className="relative max-w-4xl mx-auto">
          <span className="handwritten text-church-accent mb-4 block italic">
            Journey Together
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            Groups &amp; Studies
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <span className="handwritten text-church-accent mb-2 block">
          You Belong Here
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
          Grow Together in Faith
        </h2>
        <p className="text-lg text-church-dark/70 leading-relaxed">
          Throughout the year, we offer a variety of groups and Bible studies
          designed to help people grow in their faith, build meaningful
          relationships, and connect with others in our church family. As a
          welcoming community, we believe that spiritual growth happens best
          when people journey together, encouraging and supporting one another
          along the way. Whether you are new to church, looking to deepen your
          understanding of Scripture, seeking fellowship and encouragement, or
          simply hoping to find a place to belong, there are opportunities for
          every stage of life. Our groups meet throughout the week and provide a
          warm, inviting environment where everyone is welcome to learn, share,
          and grow in faith together.
        </p>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
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
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-church-blue text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="handwritten text-church-accent mb-2 block">
              In Community
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Life in Groups &amp; Studies
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[groupsHero, groups2, groups3, groups4].map((src, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={src}
                  alt={`Groups and Studies ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <span className="handwritten text-church-accent mb-4 block">
          Find Your Group
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
          Ready to Get Connected?
        </h2>
        <p className="text-lg text-church-dark/70 leading-relaxed mb-10">
          We'd love to help you find the right group for your season of life.
          Reach out and we'll point you in the right direction.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScEcrasMk314zHohdwNi6pbC9B2rbT-A120VlBeCaQU2-XE3A/viewform"
          className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
          target="_blank"
        >
          Find Your Group <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}
