import React from "react";
import { ExternalLink, HandHeart } from "lucide-react";
import giveHero from "../assets/offering.png";
import generosityBg from "../assets/CFMC-Baby Dedication.jpg";
// Web-sized copies of the Aug 2026 shoot; originals kept in assets/.
// All four are exactly 3:2, so the 3/2 tiles below crop nothing.
import give1 from "../assets/give/give-1.jpg";
import give2 from "../assets/give/CFMC-2026-53.jpg";
import give3 from "../assets/give/give-3.jpg";
import give4 from "../assets/give/give-4.jpg";

const GIVE_ONLINE_URL = "https://onrealm.org/carrolltonfirst/-/form/give/now";

const photos = [
  { src: give1, alt: "Acolytes walking down the aisle toward the altar" },
  { src: give2, alt: "The congregation gathered for Sunday worship" },
  { src: give3, alt: "A blessing of the backpacks during worship" },
  { src: give4, alt: "Church members being welcomed at the front of the sanctuary" },
];

export default function Give() {
  return (
    <div className="bg-church-warm">
      {/* Hero */}
      <section
        className="pt-40 pb-20 px-6 text-white text-center relative"
        style={{
          backgroundImage: `url(${giveHero})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 40%",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/75" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif">
            Giving
          </h1>
        </div>
      </section>

      {/* Giving form — embedded straight from Realm.
          The height is fixed because the frame is cross-origin, so the page
          cannot measure the form's content to resize itself. */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-white">
            <iframe
              src={GIVE_ONLINE_URL}
              title="Give online to Carrollton First Methodist Church"
              className="w-full h-[1100px] md:h-[950px]"
              // `payment` is what lets Apple Pay / Google Pay work inside a frame.
              allow="payment"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-center text-church-dark/60 text-sm mt-6">
            Trouble with the form above?{" "}
            <a
              href={GIVE_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-church-blue underline decoration-church-accent/40 underline-offset-4 hover:text-church-accent transition-colors inline-flex items-center gap-1"
            >
              Open it in a new tab <ExternalLink size={14} />
            </a>
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <span className="handwritten text-church-accent mb-2 block">
          Why We Give
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-8">
          Partnering in God's Work
        </h2>
        <p className="text-lg text-church-dark/70 leading-relaxed mb-6">
          Giving is one of the ways we worship God, grow in faith, and take part
          in the ministry and mission of Carrollton First Methodist Church.
          Through your generosity, lives are touched, faith is nurtured,
          children and students are spiritually formed, worship is offered,
          missions are supported, and our church continues to serve Carrollton
          and beyond. When we give, we are not simply supporting a budget. We
          are participating in God's work through the life of the church.
        </p>
        <p className="text-lg text-church-dark/70 leading-relaxed mb-12">
          Whether you give regularly, occasionally, or are making a first-time
          gift, thank you. Your generosity helps make ministry possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="aspect-[3/2] rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* A Note About Generosity */}
      <section
        className="py-24 text-white px-6 relative"
        style={{
          backgroundImage: `url(${generosityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/85" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 mx-auto">
            <HandHeart className="text-church-accent" size={32} />
          </div>
          <span className="handwritten text-church-accent mb-4 block">
            From the Heart
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            A Note About Generosity
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-8">
            Christian giving is not rooted in obligation, guilt, or pressure. It
            is a response to the grace and goodness of God. We give because God
            has first given to us, and we trust that what we offer can be used
            to bless others, strengthen the church, and share the hope of
            Christ.
          </p>
          <p className="text-xl text-white/70 leading-relaxed">
            Thank you for your faithfulness, your generosity, and your partnership in the ministry of Carrollton First Methodist Church.
          </p>
        </div>
      </section>
    </div>
  );
}
