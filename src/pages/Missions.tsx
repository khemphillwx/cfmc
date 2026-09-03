import React from "react";
import { motion } from "motion/react";
import {
  Globe,
  Heart,
  HandHeart,
  ArrowRight,
  CalendarDays,
  Mail,
} from "lucide-react";
import { EVENTS_CALENDAR_URL } from "../lib/links";
// From assets/missions/ — EXIF rotation baked in and resized for the web. The
// originals (CFMC-Missions-1..6.jpeg) are untouched in assets/.
import missions2 from "../assets/missions/CFMC-Missions-2.jpg";
import missions4 from "../assets/missions/CFMC-Missions-4.jpg";
import missions6 from "../assets/missions/CFMC-Missions-6.jpg";
// Partner logos. Only wired up where the artwork clearly matches the partner
// name — see the note in `partners` below.
import openHandsLogo from "../assets/logos/open-hands.jpeg";
import circlesLogo from "../assets/logos/circle-west-georgia-cropped.png";
import tshLogo from "../assets/logos/bridge.jpeg";
import campusOutreachLogo from "../assets/logos/campus-outreach.jpeg";

const MISSIONS_EMAIL = "missions@carrolltonfirst.com";

const features = [
  {
    icon: Globe,
    title: "Global Missions",
    description:
      "We partner with missionaries and organizations around the world to share the love of Christ and meet needs far beyond our community.",
  },
  {
    icon: Heart,
    title: "Local Outreach",
    description:
      "From food drives to community service projects, we are committed to loving and serving the people right here in Carrollton and West Georgia.",
  },
  {
    icon: HandHeart,
    title: "Hands-On Serving",
    description:
      "Whether you have a few hours or a full week, there are meaningful opportunities for every person to get involved and make a real difference.",
  },
];

// All three are 3:4 portraits, so the 3/4 tiles below crop nothing. The other
// three photos from this shoot are still in assets/missions/ if you want to
// swap any of them back in.
const risePhotos = [
  { src: missions2, alt: "Volunteers filling meal bags with rice" },
  { src: missions4, alt: "Church members sealing meal packages together" },
  { src: missions6, alt: "A volunteer and a child packing meals side by side" },
];

/** `logo` is optional — a card falls back to the name alone if one is missing. */
const partners: { name: string; logo?: string }[] = [
  { name: "Open Hands United Christian Ministry", logo: openHandsLogo },
  { name: "THS Resource Bridge", logo: tshLogo },
  { name: "Circles of West Georgia", logo: circlesLogo },
  { name: "Campus Outreach", logo: campusOutreachLogo },
];

export default function Missions() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif">
            Missions &amp; Outreach
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-24 pb-12 px-6 max-w-4xl mx-auto text-center">
        <span className="handwritten text-church-accent mb-2 block">
          Called to Serve
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
          Faith That Moves Us to Action
        </h2>
        <p className="text-lg text-church-dark/70 leading-relaxed">
          At Carrollton First Methodist, we believe that following Jesus means
          caring for our neighbors — both near and far. Our Missions &amp;
          Outreach ministry exists to put our faith into action by meeting real
          needs, serving our local community, and partnering with global efforts
          to bring hope and healing in the name of Christ. Whether it's packing
          meals, building homes, or supporting missionaries across the world, we
          are committed to being the hands and feet of Jesus wherever He calls
          us to go.
        </p>
      </section>

      {/* Features */}
      <section className="pt-12 pb-24 px-6 max-w-7xl mx-auto">
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

      {/* Rise Against Hunger */}
      <section className="py-24 bg-church-blue text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif">
              Serving Together
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {risePhotos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
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

      {/* Partners + Get Involved */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue">
              Ministry Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col items-center justify-center text-center gap-6"
              >
                {/* object-contain: logos are never cropped or stretched. */}
                {partner.logo && (
                  <div className="h-20 w-full flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-serif text-church-blue">
                  {partner.name}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <span className="handwritten text-church-accent mb-4 block">
              Get Involved
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-church-dark/70 leading-relaxed mb-10">
              There is a place for you in our mission. Reach out and let us help
              you find the right opportunity to serve right where God has placed
              you, or browse the church calendar for upcoming events.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`mailto:${MISSIONS_EMAIL}`}
                className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
              >
                <Mail size={18} /> Email the Missions Team
              </a>
              <a
                href={EVENTS_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-10 py-4 text-lg inline-flex items-center gap-2"
              >
                <CalendarDays size={18} /> View Upcoming Events
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
