import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logowhite from "../assets/Carrollton Alternative Logo white.png";
import { EVENTS_CALENDAR_URL } from "../lib/links";

export default function Footer() {
  return (
    <footer className="bg-church-blue text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-8">
            <img
              src={Logowhite}
              alt="Carrollton First Methodist Church Logo"
              className="h-16 w-auto"
            />
          </Link>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/CarrolltonFirstMC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-church-blue transition-all"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/carrolltonfirst/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-church-blue transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@CarrolltonFirstMethodist"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-church-blue transition-all"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-white/60">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/join" className="hover:text-white transition-colors">
                Join Us
              </Link>
            </li>
            <li>
              <Link
                to="/ministries/students"
                className="hover:text-white transition-colors"
              >
                Students
              </Link>
            </li>
            <li>
              <a
                href={EVENTS_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Events
              </a>
            </li>
            <li>
              <Link to="/give" className="hover:text-white transition-colors">
                Give
              </Link>
            </li>
            <li>
              <Link
                to="/weddings"
                className="hover:text-white transition-colors"
              >
                Weddings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Contact</h4>
          <ul className="flex flex-col gap-4 text-white/60">
            <li className="flex gap-3">
              <MapPin size={20} className="shrink-0 text-church-accent" />
              <span>206 Newnan St, Carrollton, GA 30117</span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="shrink-0 text-church-accent" />
              <span>(770) 832-7069</span>
            </li>
            <li className="flex gap-3">
              <Mail size={20} className="shrink-0 text-church-accent" />
              <span>info@carrolltonfirst.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Service Times</h4>
          <div className="text-white/60">
            <p className="font-medium text-white">Sundays</p>
            <p>10:00 AM — Sunday School</p>
            <p>11:00 AM — Traditional Worship</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <p>
          © {new Date().getFullYear()} Carrollton First Methodist Church. All
          rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            to="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
