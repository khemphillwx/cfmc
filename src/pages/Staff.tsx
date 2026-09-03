import { motion } from "motion/react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// Headshots in assets/staff/ are pre-cropped to a uniform 3:4 frame — face
// centered, eye line at 35% from the top, face height 34% of the frame — so the
// grid reads evenly. Regenerate from the originals in assets/ if they change.
import travis from "../assets/staff/travis-sneed.jpg";
import jackson from "../assets/staff/jackson-rivers.jpg";
import melanie from "../assets/staff/melanie-adams.jpg";
import ann from "../assets/staff/ann-hladilek.jpg";
import mark from "../assets/staff/mark-barnes.jpg";
import eddie from "../assets/staff/eddie-hulsey.jpg";
import tracy from "../assets/staff/tracy-rainwater.jpg";
import travisg from "../assets/staff/travis-george.jpg";
import gilbert from "../assets/staff/gilbert-huey.jpg";
import sandy from "../assets/staff/sandy-alewine.jpg";
import brooke from "../assets/staff/brooke-burson.jpg";
import katie from "../assets/staff/kate-huckeba.jpg";


export default function Staff() {
  const staff = [
    {
      name: "Travis Sneed",
      role: "Senior Pastor",
      email: "travis@carrolltonfirst.com",
      image: travis,
    },
    {
      name: "Jackson Rivers",
      role: "Student Pastor",
      email: "jackson@carrolltonfirst.com",
      image: jackson,
    },
    {
      name: "Melanie Adams",
      role: "Children's Ministries Director",
      email: "melanie@carrolltonfirst.com",
      image: melanie,
    },
    {
      name: "Ann Hladilek",
      role: "Church Administrator",
      email: "ann@carrolltonfirst.com",
      image: ann,
    },
    {
      name: "Kate Huckeba",
      role: "Financial Secretary",
      email: "katie@carrolltonfirst.com",
      image: katie,
    },
    {
      name: "Mark Barnes",
      role: "Music Director",
      email: "mark@carrolltonfirst.com",
      image: mark,
    },
    {
      name: "Brooke Burson",
      role: "Communications Director",
      email: "brooke@carrolltonfirst.com",
      image: brooke,
    },
    {
      name: "Travis George",
      role: "Facilities Manager",
      email: "facilities@carrolltonfirst.com",
      image: travisg,
    },
    {
      name: "Gilbert Huey",
      role: "Facilities Manager",
      email: "facilities@carrolltonfirst.com",
      image: gilbert,
    },
    {
      name: "Sandy Alewine",
      role: "Custodian",
      image: sandy,
    },
    {
      name: "Eddie Hulsey",
      role: "Organist",
      image: eddie,
    },
    {
      name: "Tracy Rainwater",
      role: "Pianist",
      image: tracy,
    },
  ];

  return (
    <div className="bg-church-warm">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            Meet Our Staff
          </h1>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-0 hover:grayscale transition-all duration-500"
                />
              </div>
              <div className="p-8 flex flex-grow flex-col">
                <h3 className="text-2xl font-serif text-church-blue mb-1">
                  {member.name}
                </h3>
                <p className="text-church-accent font-serif text-sm uppercase tracking-widest mb-4 flex-grow">
                  {member.role}
                </p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-church-dark/60 hover:text-church-blue text-sm flex items-center gap-2 transition-colors break-all"
                  >
                    <Mail size={14} className="shrink-0" />
                    {member.email}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-church-blue mb-8">
            Want to get in touch?
          </h2>
          <p className="text-church-dark/70 mb-12">
            Our staff is here to serve you. If you have questions about our
            ministries or need pastoral care, please don't hesitate to reach
            out.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:info@carrolltonfirst.com"
              className="btn-primary flex items-center gap-2"
            >
              <Mail size={18} /> Email the Office
            </a>
            <a
              href="tel:7708327069"
              className="btn-secondary flex items-center gap-2"
            >
              <Phone size={18} /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
