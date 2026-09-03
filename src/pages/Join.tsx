import React from "react";
import { motion } from "motion/react";
import { MapPin, Clock, HelpCircle, ArrowRight } from "lucide-react";
import travis from "../assets/CFMC-Travis.jpg";
import join from "../assets/Carrollton FMC_Aug2026-147.jpg";

export default function Join() {
  const faqs = [
    {
      question: "Where do I park?",
      answer:
        "For worship, guests are encouraged to park in the spaces closest to the church or in adjacent lots on John Wesley Plaza or Old City Hall Avenue so your first visit is simple and convenient. The Carrollton city parking deck also provides convenient parking across the street from the sanctuary.",
    },
    {
      question: "Where do I take my children?",
      answer:
        "Children are always welcome at CFMC! During our 11:00 AM worship service, we offer care for infants through preschool age in our nursery, and young children through third grade may participate in Children’s Church following the children’s message in the worship service.",
    },
    {
      question: "What do I wear?",
      answer:
        "Typically, our congregation dresses in business casual or traditional Sunday attire, but we want you to feel comfortable! Whether you’re wearing a suit or jeans, you are welcome here.",
    },
    {
      question: "Is the church affiliated with a Methodist denomination?",
      answer:
        "Carrollton First Methodist Church is an independent Methodist congregation. We are shaped by the historic Wesleyan tradition and committed to helping people know Christ, grow in faith, and serve others in God’s love.",
    },
  ];

  return (
    <div className="bg-church-warm">
      {/* Header */}
      <section className="pt-40 pb-20 px-6 bg-church-blue text-white text-center flex justify-center items-center relative"
      style={{
          backgroundImage: `url(${join})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 20%",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/75" />
        <div className="relative max-w-4xl flex justify-center items-center">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Join Us</h1>
        </div>
      </section>

      {/* Video — mute=0 keeps the sound on, which means browsers block the
          autoplay and show the poster frame until the viewer presses play. Set
          mute=1 if starting automatically matters more than audio. */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-church-blue">
            <iframe
              src="https://www.youtube.com/embed/wq6vH9PLrzY?autoplay=1&mute=0&playsinline=1&rel=0&cc_load_policy=0"
              title="Join Us at Carrollton First Methodist Church"
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-12 rounded-2xl shadow-sm border border-black/5 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-church-blue/10 text-church-blue rounded-full flex items-center justify-center mb-8">
              <BookOpen size={32} />
            </div>
            <h2 className="text-3xl font-serif text-church-blue mb-4">
              Sunday School
            </h2>
            <span className="text-church-accent font-serif text-xl mb-6">
              10:00 AM
            </span>
            <p className="text-church-dark/70 leading-relaxed">
              Sunday School is a space to connect, explore Scripture, and grow
              in your faith alongside others. Through real conversations and
              practical teaching, we explore Scripture in ways that speak to
              everyday life.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-12 rounded-2xl shadow-sm border border-black/5 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-church-blue/10 text-church-blue rounded-full flex items-center justify-center mb-8">
              <Clock size={32} />
            </div>
            <h2 className="text-3xl font-serif text-church-blue mb-4">
              Traditional Worship
            </h2>
            <span className="text-church-accent font-serif text-xl mb-6">
              11:00 AM
            </span>
            <p className="text-church-dark/70 leading-relaxed mb-8">
              Our traditional worship service blends timeless hymns, meaningful
              Scripture, and a relevant message in a warm, welcoming setting.
              Join us as we celebrate God's presence together.
            </p>
            <div className="mt-auto">
              <span className="text-sm font-medium text-church-blue uppercase tracking-widest">
                Main Sanctuary
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="py-24 bg-church-blue text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={travis}
                alt="Rev. Travis - Our Pastor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="handwritten text-church-accent mb-4 block">
              Our Pastor
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Meet Rev. Travis
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              A native of Dacula, Georgia, the Rev. Travis Sneed first sensed a
              call to ministry while serving in Zambia, Africa, in 2001 – a call
              to help people by connecting them to the hope of Jesus Christ.
              Since then, he has served and led churches across metro Atlanta
              and eastern North Carolina since 2009.
            </p>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              He earned a Bachelor’s degree from the University of Georgia in
              2007 and a Master of Divinity from Candler School of Theology at
              Emory University in 2012. Travis and his wife, Emily, have been
              married since 2007 and are the proud parents of five children.
            </p>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Travis has been leading Carrollton First Methodist Church since
              December 2024.
            </p>
            <a
              href="mailto:travis@carrolltonfirst.com"
              className="btn-outline inline-flex items-center gap-2"
            >
              Email Travis <ArrowRight size={18} />
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

      {/* Next Steps */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-church-blue mb-12">
            Next Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScsk0ZFYJS6spBXuc8GqMuwixdo7Soiy0L9kQROY-L5jNM3IA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 border border-black/5 rounded-xl hover:bg-church-warm transition-colors cursor-pointer group"
            >
              <h3 className="text-xl font-serif text-church-blue mb-4 group-hover:text-church-accent transition-colors">
                Connect Card
              </h3>
              <p className="text-church-dark/60">
                Let us know you're here so we can give you a proper welcome.
              </p>
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScEcrasMk314zHohdwNi6pbC9B2rbT-A120VlBeCaQU2-XE3A/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 border border-black/5 rounded-xl hover:bg-church-warm transition-colors cursor-pointer group"
            >
              <h3 className="text-xl font-serif text-church-blue mb-4 group-hover:text-church-accent transition-colors">
                Grow
              </h3>
              <p className="text-church-dark/60">
                Find a community to grow with beyond Sunday mornings.
              </p>
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScA-gaFOAYHn4lwnvl49Q7hi7jqYqQX853YDOOzS-t_UF1JKw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 border border-black/5 rounded-xl hover:bg-church-warm transition-colors cursor-pointer group"
            >
              <h3 className="text-xl font-serif text-church-blue mb-4 group-hover:text-church-accent transition-colors">
                Serve
              </h3>
              <p className="text-church-dark/60">
                Use your gifts to bless our church and the Carrollton community.
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function BookOpen({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
