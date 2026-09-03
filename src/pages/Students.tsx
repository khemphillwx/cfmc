import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import studentsWorship from "../assets/CFMC-Youth-Worship.jpg";
// Face-centered 3:4 crop from assets/staff/ — CFMC-Jackson.jpg is a wide stage
// shot where Jackson is a small figure, so it can't serve as the portrait here.
import jackson from "../assets/CFMC-Jackson.jpg";

// Google Maps search links — replace with exact pins/addresses when available.
const gatherings = [
  {
    title: "Sunday Night Worship",
    schedule: "Sundays | 5:30–7:30 PM",
    location: "The Solid Rock Building",
    map: "https://www.google.com/maps/search/?api=1&query=Carrollton+First+Methodist+Church+Solid+Rock+Building+Carrollton+GA",
    description:
      "Sunday Night Worship is the heart of our student ministry each week. Students gather for dinner, games, worship led by our student band, and a biblical message designed to help them grow in their faith. It’s a welcoming environment where students can build meaningful friendships, have fun, and encounter Jesus.",
  },
  {
    title: "Tuesday Morning Devotions",
    schedule: "Tuesdays | 7:15 AM",
    location: "Chick-fil-A on Highway 27",
    map: "https://www.google.com/maps/search/?api=1&query=Chick-fil-A+Highway+27+Carrollton+GA",
    description:
      "TMD is a great way for students to begin their week with encouragement and community. Each Tuesday morning, students enjoy Chick-fil-A breakfast, spend time in fellowship, and hear a brief devotional before school. Transportation is provided to both Carrollton City and Carroll County schools.",
  },
  {
    title: "D-Groups",
    schedule: "Various Times & Locations Throughout the Week",
    location: null,
    map: null,
    description:
      "Discipleship Groups (D-Groups) are age-specific small groups where students grow in their relationship with Christ through Bible study, prayer, accountability, and authentic friendships. Groups meet throughout the week in homes and other locations.",
  },
];

export default function Students() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Students</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="handwritten text-church-accent mb-2 block">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-church-blue leading-snug">
              Making Disciples Who Make Disciples that Love, Care, and Serve in
              the name of Jesus
            </h2>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={studentsWorship}
              alt="Students gathered for Sunday Night Worship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Weekly Gatherings */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue">
              When We Gather
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {gatherings.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-church-warm p-10 rounded-2xl shadow-sm border border-black/5 flex flex-col"
              >
                <h3 className="text-2xl font-serif text-church-blue mb-4">
                  {item.title}
                </h3>

                <div className="flex gap-3 mb-2">
                  <Clock
                    className="text-church-accent shrink-0 mt-1"
                    size={18}
                  />
                  <span className="text-church-dark/70 text-sm">
                    {item.schedule}
                  </span>
                </div>

                {item.location && (
                  <div className="flex gap-3 mb-6">
                    <MapPin
                      className="text-church-accent shrink-0 mt-1"
                      size={18}
                    />
                    <a
                      href={item.map ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-church-blue underline decoration-church-accent/40 underline-offset-4 hover:text-church-accent transition-colors"
                    >
                      {item.location}
                    </a>
                  </div>
                )}

                <p className="text-church-dark/70 leading-relaxed flex-grow">
                  {item.description}
                </p>

                {item.title === "D-Groups" && (
                  <p className="text-church-dark/70 leading-relaxed mt-4">
                    If you’re interested in joining a D-Group,{" "}
                    <a
                      href="mailto:jackson@carrolltonfirst.com"
                      className="text-church-blue underline decoration-church-accent/40 underline-offset-4 hover:text-church-accent transition-colors"
                    >
                      contact Jackson
                    </a>{" "}
                    for more information.
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Pastor — mirrors the Meet Melanie / Meet Rev. Travis sections */}
      <section className="py-24 bg-church-blue text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={jackson}
                alt="Jackson Rivers - Student Pastor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="handwritten text-church-accent mb-4 block">
              Our Student Pastor
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Meet Jackson
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Jackson first sensed God’s call to ministry while serving in
              college ministry at the University of West Georgia in 2018. That
              calling soon led him into student ministry, where he has
              faithfully served for the past eight years.
            </p>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              He earned a Bachelor’s degree from the University of West Georgia
              in 2019 and a Master of Divinity from Liberty University in 2022.
              Jackson and his wife, Erica, have been married since 2019 and are
              the proud parents of three children.
            </p>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Jackson is passionate about helping the next generation know,
              follow, and share Jesus. His heart is to make disciples who make
              disciples, equipping students to live out their faith and impact
              the world for Christ.
            </p>
            <a
              href="mailto:jackson@carrolltonfirst.com"
              className="btn-outline inline-flex items-center gap-2"
            >
              Email Jackson <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA — white keeps the last section clear of the navy footer */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
            Get Connected!
          </h2>
          <p className="text-lg text-church-dark/70 leading-relaxed mb-10">
            Text us and we’ll help your student find their place in our ministry.
          </p>
          {/* Gloo connect number — sms: opens the messaging app */}
          <a
            href="sms:+18335514737"
            className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
          >
            Text 'Solid Rock' <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
