import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Grip, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Logowhite from "../assets/Carrollton Alternative Logo white.png";
import Logo from "../assets/Carrollton Alternative Logo transparent bg.png";
import { EVENTS_CALENDAR_URL } from "../lib/links";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type NavChild = { name: string; path: string };
type NavItem = { name: string; path: string; children?: NavChild[] };

const isExternal = (path: string) => /^https?:\/\//.test(path);

const navItems: NavItem[] = [
  {
    name: "About Us",
    path: "/about",
    children: [
      { name: "What We Believe", path: "/about/what-we-believe" },
      { name: "Our Story", path: "/about/our-story" },
      { name: "Staff", path: "/about/staff" },
      { name: "Join Us", path: "/join" },
    ],
  },
  {
    name: "Ministries",
    path: "/ministries",
    children: [
      { name: "Kids", path: "/ministries/kids" },
      { name: "Students", path: "/ministries/students" },
      { name: "Sunday School", path: "/ministries/sunday-school" },
      { name: "Groups & Studies", path: "/ministries/groups-studies" },
      { name: "Missions & Outreach", path: "/ministries/missions-outreach" },
      { name: "First School", path: "https://carrolltonfirstschool.com" },
    ],
  },
  {
    name: "Events",
    path: EVENTS_CALENDAR_URL,
  },
  {
    name: "Watch & Listen",
    path: "https://www.youtube.com/@CarrolltonFirstMethodist",
  },
  {
    name: "Give",
    path: "/give",
    children: [
      {
        name: "Give Online",
        path: "/give",
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        scrolled
          ? "bg-white shadow-md py-3"
          : "bg-linear-to-b from-black/60 to-transparent py-6",
      )}
    >
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105">
          <img
            src={Logowhite}
            alt="Carrollton First Methodist Church Logo"
            className={cn(
              "h-full w-auto transition-opacity duration-300",
              scrolled ? "opacity-0 absolute inset-0" : "opacity-100",
            )}
          />
          <img
            src={Logo}
            alt="Carrollton First Methodist Church Logo"
            className={cn(
              "h-full w-auto transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0 absolute inset-0",
            )}
          />
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <div
            key={item.path}
            className="relative"
            onMouseEnter={() => item.children && handleMouseEnter(item.name)}
            onMouseLeave={item.children ? handleMouseLeave : undefined}
          >
            {(() => {
              const linkClass = cn(
                "flex items-center gap-1 text-sm font-semibold uppercase tracking-widest transition-all hover:text-church-accent",
                scrolled ? "text-church-dark" : "text-white drop-shadow-md",
                location.pathname === item.path && "text-church-accent",
              );
              const label = (
                <>
                  {item.name}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180",
                      )}
                    />
                  )}
                </>
              );
              // Top-level items can point offsite (e.g. the Realm calendar), so
              // match the child links and open those in a new tab.
              return isExternal(item.path) ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {label}
                </a>
              ) : (
                <Link to={item.path} className={linkClass}>
                  {label}
                </Link>
              );
            })()}
            <AnimatePresence>
              {item.children && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-52 bg-white rounded-md shadow-lg overflow-hidden"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.map((child) =>
                    isExternal(child.path) ? (
                      <a
                        key={child.path}
                        href={child.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm text-church-dark hover:bg-gray-50 hover:text-church-accent transition-colors border-b border-gray-100 last:border-0"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.name}
                      </a>
                    ) : (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-3 text-sm text-church-dark hover:bg-gray-50 hover:text-church-accent transition-colors border-b border-gray-100 last:border-0"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.name}
                      </Link>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-md transition-colors",
            scrolled
              ? "text-church-blue hover:bg-gray-100"
              : "text-white hover:bg-white/20 drop-shadow-md",
          )}
        >
          <Grip size={28} />
        </button>
      </div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — dims the exposed page and closes the drawer on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[55]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-1/3 bg-church-blue z-[60] flex flex-col p-10 overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <img
                  src={Logowhite}
                  alt="Carrollton First Methodist Church Logo"
                  className="h-12 w-auto"
                />
                <button onClick={() => setIsOpen(false)} className="text-white">
                  <X size={32} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenMobileItem(
                              openMobileItem === item.name ? null : item.name,
                            )
                          }
                          className="flex items-center justify-between w-full text-4xl md:text-3xl font-serif text-white hover:text-church-accent transition-colors py-3"
                        >
                          {item.name}
                          <ChevronDown
                            size={24}
                            className={cn(
                              "transition-transform duration-200",
                              openMobileItem === item.name && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {openMobileItem === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 border-l border-white/30 mb-2"
                            >
                              {item.children.map((child) =>
                                isExternal(child.path) ? (
                                  <a
                                    key={child.path}
                                    href={child.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setOpenMobileItem(null);
                                    }}
                                    className="block text-xl font-serif text-white/80 hover:text-church-accent transition-colors py-2"
                                  >
                                    {child.name}
                                  </a>
                                ) : (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setOpenMobileItem(null);
                                    }}
                                    className="block text-xl font-serif text-white/80 hover:text-church-accent transition-colors py-2"
                                  >
                                    {child.name}
                                  </Link>
                                ),
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : isExternal(item.path) ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setIsOpen(false);
                          setOpenMobileItem(null);
                        }}
                        className="block text-4xl md:text-3xl font-serif text-white hover:text-church-accent transition-colors py-3"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenMobileItem(null);
                        }}
                        className="block text-4xl md:text-3xl font-serif text-white hover:text-church-accent transition-colors py-3"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-10 border-t border-white/10 text-white/60 text-sm">
                <p>Carrollton First Methodist Church</p>
                <p>206 Newnan St, Carrollton, GA 30117</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
