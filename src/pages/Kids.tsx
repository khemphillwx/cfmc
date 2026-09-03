import React from "react";
import { motion } from "motion/react";
import { ArrowRight, HelpCircle } from "lucide-react";
// Margin-trimmed copy of "Logo Cleanup.png" — that file carries ~500px of
// transparent padding around the mark, which no CSS can remove. This version
// has solid white letterforms and no dark subtext, so it sits directly on navy.
import glow from "../assets/logos/glow-logo.png";
import kids1 from "../assets/CFMC-Kid-1.jpg";
import kids2 from "../assets/CFMC-Kid-2.jpg";
import kids3 from "../assets/CFMC-Kid-3.jpg";
// Face-centered 3:4 crop from assets/staff/ — the 6000x4000 original is
// landscape with her face off-center, so it frames badly in a portrait box.
import melanie from "../assets/CFMC-2026-25.jpg";

const photos = [
  { src: kids1, alt: "Children gathered at GLOW" },
  { src: kids2, alt: "Kids taking part in a GLOW activity" },
  { src: kids3, alt: "Children worshiping together at GLOW" },
];

const faqs = [
  {
    question:
      "What opportunities are available for children on Sunday mornings?",
    answer:
      "We welcome kids of all ages for Sunday School at 10:00 AM and age-appropriate ministries during the worship service!",
  },
  {
    question: "What ages can attend Sunday School?",
    answer:
      "Sunday School is available for children from preschool through fifth grade. Our GLOW ministry offers engaging, age-appropriate lessons and activities.",
  },
  {
    question: "Is nursery care available?",
    answer:
      "Yes. A nursery is available for our youngest children during both Sunday School and the worship service. Our nursery team provides a caring and nurturing environment where children can feel safe and loved.",
  },
  {
    question: "Are children welcome in the worship service?",
    answer:
      "Absolutely! Children are always welcome in worship! During the service, kids are invited to come forward for a special children’s message. Afterward, families may choose for their children to remain in the sanctuary or participate in one of our ministries such as Children’s Church or The Bridge.",
  },
  {
    question: "What is Children’s Church?",
    answer:
      "Following the children’s message, children in third grade and younger may be escorted to Children’s Church for the remainder of the worship service. Children’s Church provides an engaging, age-appropriate opportunity to learn about God and God’s Word.",
  },
  {
    question: "What is The Bridge?",
    answer:
      "The Bridge is a special Sunday morning ministry created specifically for fourth- and fifth-grade students. Students are dismissed following the children’s message and gather in a separate location from Children’s Church for activities, conversation, and lessons designed for their stage of faith and development.",
  },
  {
    question: "Does my child have to leave worship after the children’s message?",
    answer:
      "No. Participation in Children’s Church and The Bridge is optional. Children are always welcome to remain with their families in the sanctuary for the entire worship service.",
  },
];

export default function Kids() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          {/* The logo is the page heading — kept inside an h1 so the document
              still has one, with the wordmark carried by the alt text. The
              letterforms are solid white, so the mark sits straight on the
              navy with no tile behind it. */}
          <h1>
            <img
              src={glow}
              alt="GLOW — First Kids"
              className="w-72 md:w-[30rem] h-auto mx-auto"
            />
          </h1>
        </div>
      </section>

      {/* About GLOW */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
              Lighting Up the Path to Faith
            </h2>
            <p className="text-lg text-church-dark/70 leading-relaxed">
              At GLOW, (Grow, Love, Obey and Worship God) we strive to create a
              joyful and nurturing environment where kids can explore their
              faith through engaging lessons, fun activities, and meaningful
              worship. Our dedicated team is committed to helping each child
              grow in their relationship with God and build lasting friendships.
              Join us at GLOW, where we light up the path to faith and
              fellowship for our youngest members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
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

      {/* Director — mirrors the Meet Rev. Travis section on the Join Us page */}
      <section className="py-24 bg-church-blue text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={melanie}
                alt="Melanie Adams - Director of Children's Ministries"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="handwritten text-church-accent mb-4 block">
              Our Director
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Meet Melanie
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              After growing up in Carrollton, Melanie Adams attended Berry
              College, where she earned a degree in Psychology and Child
              Development. Since 1990, she has passionately served children in
              Kentucky, Alabama, and Georgia in a variety of settings, helping
              those facing poverty, abuse, developmental delays, and other
              challenges discover their strengths and reach their fullest
              potential.
            </p>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              After teaching Pre-K at Oak Mountain Academy for 13 years, Melanie
              joined Carrollton First Methodist Church as the Director of
              Children’s Ministries in 2018 and founded the church’s weekday
              preschool, First School, in 2021.
            </p>
            <a
              href="mailto:melanie@carrolltonfirst.com"
              className="btn-outline inline-flex items-center gap-2"
            >
              Email Melanie <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-church-blue">
            Common Questions
          </h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-black/5 shadow-sm"
            >
              <div className="flex gap-4">
                <HelpCircle className="text-church-accent shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-serif text-church-blue mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-church-dark/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — white keeps the last section clear of the navy footer */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="handwritten text-church-accent mb-4 block">
            We'd Love to Meet You
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
            Bring Your Kids This Sunday
          </h2>
          <p className="text-lg text-church-dark/70 leading-relaxed mb-10">
            Whether it's your first time or you're ready to get more involved,
            there's a place for your family here. Come as you are — we'll take
            care of the rest.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeGFi0eMeUoG5PLkYXP5q76aFAZJzc8AgezcGIUOJUNhaQX2w/viewform"
            className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
            target="_blank"
          >
            Plan Your Visit <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
