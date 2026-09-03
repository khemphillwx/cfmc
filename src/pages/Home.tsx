import Hero from "../components/Hero";
import RecentSermons from "../components/RecentSermons";
import { Link } from "react-router-dom";
import whoweare from "../assets/CFMC-Vibrant-Community.jpg";

export default function Home() {
  return (
    <div className="bg-church-warm">
      <Hero />

      {/* Sermons Section — pulled live from the church YouTube channel */}
      <RecentSermons count={3} />

      {/* About Teaser */}
      <section className="py-24 bg-church-blue text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={whoweare}
                alt="Brett welcoming people to Carrollton First Methodist Church"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="handwritten text-church-accent mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Historic Faith & Vibrant Community
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-10">
              Carrollton First Methodist Church is a place where timeless
              traditions meet a warm, welcoming community. We are dedicated to
              discipleship, growth, and hospitality, providing a space for
              families to connect and flourish.
            </p>
            <Link to="/about" className="btn-outline inline-block">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif text-church-blue mb-8">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-church-dark/70 mb-12">
            We'd love to welcome you to our next service. Whether you're a
            lifelong Methodist or just exploring, there's a place for you here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/join" className="btn-primary px-10 py-4 text-lg">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
