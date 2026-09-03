import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ourStory from "../assets/0541_001.jpg";
import banner from "../assets/CFMC-Historical-1.jpg"
import outside from "../assets/CFMC-Historical-3.jpeg";
import community from "../assets/CFMC-Facility-4.jpg";
import chapter from "../assets/Carrollton Primary Logo tansparent bg.png"
import sketch from "../assets/First Building.png";
import scripture from "../assets/Historical Carrollton.png";

type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: string;
  alt?: string;
  /** Letterbox instead of crop — for portrait or archival scans. */
  contain?: boolean;
};

const milestones: Milestone[] = [
  {
    year: "1829",
    title: "The Beginning",
    body: "Carrollton First Methodist Church was founded in 1829, just a few years after Carroll County was chartered. In its earliest years, Carrollton Methodists gathered for worship in homes and later in the county courthouse. Like many Methodist congregations of the time, the church was shaped by the circuit-riding and mission-centered spirit of early Methodism, connecting believers across growing communities through worship, preaching, and service.",
    image: scripture,
    alt: "An open Bible and study notes",
  },
  {
    year: "1847",
    title: "A First House of Worship",
    body: "In 1847, Carrollton Methodists built the first house of worship in the town, generously sharing the space with other Christian congregations. The earliest Methodist church building in Carrollton stood on the north side of Alabama Street and North Park Street, where a churchyard and cemetery became sacred ground for generations of worshipers.",
    image: sketch,
    alt: "Archival clipping of the original First Methodist Church, Carrollton, Ga.",
    contain: true,
  },
  {
    year: "1904",
    title: "The Stone Church",
    body: "As Carrollton grew, the congregation eventually established its long-standing home at 206 Newnan Street. In 1904, a stone church was constructed on the current site, and it remains the historic sanctuary today.",
    image: outside,
    alt: "Historic photograph of the church and its bell tower",
  },
  {
    year: "1906 – 2016",
    title: "Growth & Milestones",
    body: "For nearly two centuries, Carrollton First Methodist has remained rooted in the heart of Carrollton. The church's historic sanctuary and surrounding campus have been improved, expanded, and adapted many times to meet the needs of a growing congregation and changing community. These milestones include the installation of a pipe organ in 1906, the construction of the First Methodist Church School Building Annex in 1954, the addition of the Education Building and Fellowship Hall in 1989, and a major sanctuary reconfiguration and renovation in 2016.",
    image: ourStory,
    alt: "The Young Men's Bible Class gathered on the church steps in 1939",
  },
  {
    year: "2023",
    title: "A New Chapter",
    body: "In 2023, following a season of discernment, the congregation entered a new chapter and continued its ministry as Carrollton First Methodist Church after disaffiliating from The United Methodist Church. Through seasons of growth, challenge, and change, the church's calling has remained steady: to worship God, make disciples of Jesus Christ, serve the community, and share the hope of the gospel.",
    image: chapter,
    alt: "The congregation gathered for worship in the sanctuary",
    contain: true,
  },
  {
    year: "",
    title: "Today & Beyond",
    body: "Today, Carrollton First Methodist Church remains rooted in the historic Methodist tradition and deeply connected to the Carrollton community. With gratitude for the generations who came before, the church looks to the future with faith, hope, and a continued commitment to Christ-centered ministry.",
    image: community,
  }
];

export default function Story() {
  return (
    <div className="bg-church-warm">
      {/* Header */}
      <section
        className="pt-40 pb-20 px-6 text-white text-center relative"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/75" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Our Story</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-church-blue mb-6">
            Faithful Through the Generations
          </h2>
          <p className="text-xl md:text-2xl text-church-dark/70 leading-relaxed font-serif">
            Everyone has a story. Our church has one too — a story of people
            gathering to worship, serving their neighbors, walking through
            change, and trusting God along the way. For generations, Carrollton
            First Methodist Church has been part of this community, and our
            story is still being written today.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 pb-24 px-6 max-w-7xl mx-auto">
        <div className="space-y-16 md:space-y-20">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative pl-8 md:pl-12 border-l-2 border-church-accent/30"
            >
              <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-church-accent" />
              <div
                className={
                  item.image
                    ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
                    : "max-w-3xl"
                }
              >
                <div>
                  <span className="text-church-accent font-serif text-xl mb-1 block">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-serif text-church-blue mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-church-dark/70 leading-relaxed">
                    {item.body}
                  </p>
                </div>
                {/* `contain` entries are logos, not photos: the artwork has no
                    built-in margin, so pad the box to keep it off the edges.
                    Photos stay full-bleed. */}
                {item.image && (
                  <div
                    className={`rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-church-blue/5 ${
                      item.contain ? "p-8 md:p-10" : ""
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className={`w-full h-full ${
                        item.contain ? "object-contain" : "object-cover"
                      }`}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Today Section
      <section className="py-24 px-6 bg-church-blue text-white mt-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={community}
                alt="Carrollton First Methodist Church community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="handwritten text-church-accent mb-4 block">
              Where We Are Now
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Today & Beyond
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Today, Carrollton First Methodist Church remains rooted in the
              historic Methodist tradition and deeply connected to the
              Carrollton community. With gratitude for the generations who came
              before, the church looks to the future with faith, hope, and a
              continued commitment to Christ-centered ministry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/join"
                className="btn-outline inline-flex items-center gap-2"
              >
                Join Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
