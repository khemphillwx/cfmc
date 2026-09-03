import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { HeartHandshake, Cross, Sprout, Sunrise, HandHeart } from "lucide-react";
import discipleship from "../assets/CFMC-Discipleship.jpg";
import growth from "../assets/CFMC-Growth.jpg";
import community from "../assets/CFMC-Community.jpg";
import youth from "../assets/CFMC-Youth.jpg";
import groupsStudies from "../assets/CFMC-Groups-and-Studies-1.jpg";
import missions1 from "../assets/Carrollton FMC_Aug2026-172.jpg";
import missions2 from "../assets/CFMC-Missions-and-Outreach-1.jpg";

const missionPoints = [
  {
    icon: HeartHandshake,
    lead: "We are a welcoming community",
    body: "because we believe the church should feel like a place where people can come as they are and find grace, friendship, and belonging. Whether you have been part of church your whole life, are returning after time away, or are simply exploring faith, there is a place for you here.",
  },
  {
    icon: Cross,
    lead: "We are following Jesus",
    body: "because that was the first and primary call to the disciples. Jesus’ love shapes our worship, his teaching guides our decisions, and his example calls us to live with humility, compassion, courage, and faithfulness.",
  },
];

const beliefs = [
  {
    icon: Sprout,
    lead: "We are growing in faith",
    body: "because none of us has arrived. Through worship, Sunday School, small group studies, prayer, and life together, we seek to become more like Christ day by day.",
    image: groupsStudies,
    alt: "Small group study at Carrollton First Methodist",
  },
  {
    icon: Sunrise,
    lead: "We are sharing hope",
    body: "because the good news of Jesus is not meant to be kept to ourselves. In a world that often feels heavy, divided, and uncertain, we believe the church is called to bear witness to the hope, healing, forgiveness, and new life found in Jesus.",
    image: missions1,
    alt: "Sharing hope through outreach",
  },
  {
    icon: HandHeart,
    lead: "We are serving in love",
    body: "because faith is meant to move outward. We want to love our neighbors well, care for our community, support one another, and join God’s work in Carrollton and beyond.",
    image: missions2,
    alt: "Serving the Carrollton community in love",
  },
];

export default function About() {
  return (
    <div className="bg-church-warm">
      {/* Simple Header */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Who We Are</h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-serif text-church-blue mb-8">
              Discipleship, Growth, Community
            </h2>
            <p className="text-lg text-church-dark/70 leading-relaxed mb-6">
              Since 1829, Carrollton First Methodist Church has been a community of faith committed to
              making disciples of Jesus Christ and bearing witness to God’s love in the world. While that
              calling remains unchanged, we now articulate our mission with these words:
            </p>
            <p className="text-lg text-church-dark/70 font-bold leading-relaxed mb-6">
              To be a welcoming community following Jesus by growing in faith, sharing hope, and serving in love.
            </p>
            <p className="text-lg text-church-dark/70 leading-relaxed mb-10">
              That statement is more than words on a page, it is the heart of who we are and the direction we
              believe God is leading us.
            </p>
            <div className="flex gap-4">
              <Link to="/join" className="btn-primary">
                Join Us
              </Link>
              <Link to="/staff" className="btn-secondary">
                Our Staff
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={discipleship}
                alt="Discipleship Church Life"
                className="rounded-xl shadow-md w-full aspect-[4/5] object-cover"
              />
              <img
                src={growth}
                alt="Growth Church Life"
                className="rounded-xl shadow-md w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="space-y-4 pt-12">
              <img
                src={community}
                alt="Community Church Life"
                className="rounded-xl shadow-md w-full aspect-[4/3] object-cover"
              />
              <img
                src={youth}
                alt="Youth Church Life"
                className="rounded-xl shadow-md w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="handwritten text-church-accent mb-2 block">
              Our Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue">
              Our Identity & Calling
            </h2>
          </div>
          <div className="space-y-16 md:space-y-24">
            {beliefs.map((belief, i) => {
              const Icon = belief.icon;
              return (
                <div
                  key={belief.lead}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center`}
                >
                  <div>
                    <div className="w-14 h-14 bg-church-blue text-white rounded-xl flex items-center justify-center mb-6">
                      <Icon size={28} />
                    </div>
                    <p className="text-lg text-church-dark/70 leading-relaxed">
                      <span className="font-semibold text-church-blue">
                        {belief.lead}
                      </span>{" "}
                      {belief.body}
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src={belief.image}
                      alt={belief.alt}
                      className="rounded-2xl shadow-md w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-church-dark">
        <div className="max-w-5xl text-center mx-auto">
            <p className="text-lg text-white leading-relaxed mb-8">
              Carrollton First Methodist has been part of this community for
              generations, but we are not simply preserving a past. We are
              living into a future. We are grateful for our history, excited
              about what God is doing now, and committed to making room for
              those who are not yet here.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/join" className="btn-primary">
                Join Us
              </Link>
              <Link to="/about/our-story" className="btn-outline">
                Our Story
              </Link>
              <Link to="/about/what-we-believe" className="btn-outline">
                What We Believe
              </Link>
            </div>
          </div>
      </section>
    </div>
  );
}
