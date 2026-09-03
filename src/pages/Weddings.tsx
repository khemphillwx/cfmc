import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Download, Mail, MapPin, Phone } from "lucide-react";
// All four are resized for the web in assets/weddings/; the originals were
// being downscaled 8-14x by the browser, which aliases and reads as low
// resolution. Aspect ratios are preserved (2:3 portrait, 3:2 landscape), so
// none of these are cropped.
import wedding1 from "../assets/weddings/exterior.jpg";
import wedding3 from "../assets/weddings/sanctuary.jpg";
import ceremony1 from "../assets/weddings/ceremony-1.jpg";
import ceremony2 from "../assets/weddings/ceremony-2.jpg";

// NOTE: these two PDFs must be placed in public/documents/ under exactly these
// names, or the download buttons will 404.
const PACKET_URL = "/documents/CFMC-Wedding-Information-Packet.pdf";
const APPLICATION_URL = "/documents/CFMC-Wedding-Application.pdf";

const ceremonyPhotos = [
  {
    src: ceremony1,
    alt: "A bride and groom share their first kiss at the altar",
  },
  {
    src: ceremony2,
    alt: "A wedding ceremony in progress before a full sanctuary",
  },
];

const packetContents = [
  "Wedding dates and scheduling",
  "Sanctuary and facility use",
  "Clergy and premarital preparation",
  "Music and musicians",
  "Flowers, candles, and decorations",
  "Photography and videography",
  "Rehearsals and wedding-day procedures",
  "Fees and payment schedules",
];

export default function Weddings() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif">Weddings</h1>
        </div>
      </section>

      {/* A Sacred Place */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-2/5">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:mx-0">
              <img
                src={wedding1}
                alt="The front steps and columns of the Carrollton First Methodist Church sanctuary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
              A Sacred Place for a Beautiful Beginning
            </h2>
            <p className="text-lg text-church-dark/70 leading-relaxed mb-6">
              Your wedding is more than a ceremony, it’s a sacred covenant and
              the beginning of a new life together! At Carrollton First
              Methodist Church, we are honored to help couples celebrate this
              meaningful occasion in a setting filled with beauty, history, and
              faith.
            </p>
            <p className="text-lg text-church-dark/70 leading-relaxed">
              Located in the heart of downtown Carrollton, Georgia, our historic
              sanctuary provides a timeless and reverent setting for your
              wedding day. With its beautiful stone architecture, traditional
              stained glass, and classic worship space, the sanctuary offers a
              memorable backdrop for ceremonies both intimate and grand.
            </p>
          </div>
        </div>
      </section>

      {/* The Sanctuary */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="w-full lg:w-2/5">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:mx-0">
                <img
                  src={wedding3}
                  alt="The sanctuary decorated with flowers for a wedding ceremony"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <p className="text-lg text-church-dark/70 leading-relaxed mb-6">
                Carrollton First Methodist Church has welcomed generations of
                families for worship, weddings, and other significant moments in
                life. The sanctuary accommodates up to 450 guests, offering
                ample space for your family and friends to gather as you
                exchange vows.
              </p>
              <p className="text-lg text-church-dark/70 leading-relaxed">
                Couples who choose to marry at CFMC will also have access to
                designated areas for the wedding party to prepare before the
                ceremony. Additional information regarding available spaces,
                scheduling, music, decorations, photography, and church policies
                is included in our Wedding Information Packet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beginning Your Wedding Plans */}
      <section className="py-24 px-6 bg-church-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Beginning Your Wedding Plans
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            We want the planning process to be as clear and helpful as possible.
            Before submitting an application, please download and carefully
            review the Wedding Information Packet. It contains important details
            about:
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {packetContents.map((item, index) => (
              <li key={index} className="flex gap-3 items-start">
                <Check className="text-church-accent shrink-0 mt-1" size={18} />
                <span className="text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The ceremony shots break out past the text column so they carry
            their full detail; they alternate with the copy below. */}
        <figure className="max-w-6xl mx-auto my-16">
          <motion.div
            whileHover={{ y: -8 }}
            className="aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={ceremonyPhotos[0].src}
              alt={ceremonyPhotos[0].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </figure>

        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-white/70 leading-relaxed">
            After reviewing the packet, complete the Wedding Application and
            submit it to the church office. Please remember that submitting an
            application does not guarantee a wedding date. Your date will be
            confirmed after the application has been reviewed and the deposit
            has been paid.
          </p>
        </div>

        <figure className="max-w-6xl mx-auto my-16">
          <motion.div
            whileHover={{ y: -8 }}
            className="aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={ceremonyPhotos[1].src}
              alt={ceremonyPhotos[1].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </figure>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a
              href={PACKET_URL}
              download
              className="btn-outline inline-flex items-center gap-2"
            >
              <Download size={18} /> Wedding Information Packet
            </a>
            <a
              href={APPLICATION_URL}
              download
              className="btn-outline inline-flex items-center gap-2"
            >
              <Download size={18} /> Wedding Application
            </a>
          </div>

          <p className="text-xl text-white/70 leading-relaxed text-center">
            We would be grateful for the opportunity to share in this important
            moment and to help you begin your marriage surrounded by prayer,
            beauty, and the love of those closest to you.
          </p>
        </div>
      </section>

      {/* Contact — white keeps the last section clear of the navy footer */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
            Contact Us
          </h2>
          <p className="text-lg text-church-dark/70 leading-relaxed mb-12">
            For questions about weddings, available dates, or the application
            process, please contact the Carrollton First Methodist Church
            office.
          </p>

          <div className="flex flex-col items-center gap-4 text-church-dark/70">
            <p className="font-serif text-xl text-church-blue">
              Carrollton First Methodist Church
            </p>
            <div className="flex gap-3 items-start">
              <MapPin className="text-church-accent shrink-0 mt-1" size={20} />
              <span>
                206 Newnan Street
                <br />
                Carrollton, Georgia 30117
              </span>
            </div>
            <a
              href="tel:7708327069"
              className="flex gap-3 items-center hover:text-church-blue transition-colors"
            >
              <Phone className="text-church-accent shrink-0" size={20} />
              (770) 832-7069
            </a>
            <a
              href="mailto:info@carrolltonfirst.com"
              className="flex gap-3 items-center hover:text-church-blue transition-colors"
            >
              <Mail className="text-church-accent shrink-0" size={20} />
              info@carrolltonfirst.com
            </a>
          </div>

          <div className="mt-12">
            <a
              href="mailto:info@carrolltonfirst.com"
              className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
            >
              Contact the Church Office <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
