import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FiltersBar from "@/components/FiltersBar";
import EventCard from "@/components/EventCard";
import { Sparkles } from "lucide-react";
import CreateEventModal from "../components/CreateEventModal";
const StudentFeed = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const sampleEvents = [
    {
      title: "AI & Machine Learning Workshop",
      organizer: "Google Developer Student Club",
      description: "Learn cutting-edge AI techniques from industry experts. Hands-on projects with TensorFlow and PyTorch.",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Engineering Auditorium, Block A",
      tags: ["AI/ML", "Workshop", "Beginner Friendly"],
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
      attendees: 245
    },
    {
      title: "Startup Funding & Pitch Competition",
      organizer: "Entrepreneurship Cell",
      description: "Present your startup ideas to top VCs. Win funding up to \u20B910 lakhs and mentorship opportunities.",
      date: "March 20, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Innovation Hub, 3rd Floor",
      tags: ["Startup", "Competition", "Funding"],
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      attendees: 180
    },
    {
      title: "Summer Internship Fair 2025",
      organizer: "Career Development Center",
      description: "Meet recruiters from 50+ top companies. On-spot interviews for summer internships.",
      date: "March 25, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Main Campus Ground",
      tags: ["Internship", "Career", "Placement"],
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      attendees: 520
    },
    {
      title: "Robotics & IoT Hackathon",
      organizer: "IEEE Student Branch",
      description: "24-hour hackathon to build innovative IoT solutions. Prize pool worth \u20B92 lakhs.",
      date: "April 1-2, 2025",
      time: "10:00 AM onwards",
      location: "CS Lab, Building B",
      tags: ["Robotics", "IoT", "Hackathon"],
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      attendees: 156
    },
    {
      title: "Cybersecurity Bootcamp",
      organizer: "CyberSec Club",
      description: "Learn ethical hacking, penetration testing, and security best practices from certified professionals.",
      date: "April 5-7, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "IT Lab 301",
      tags: ["Cybersecurity", "Workshop", "Certification"],
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      attendees: 98
    },
    {
      title: "Research Paper Writing Workshop",
      organizer: "Research & Development Cell",
      description: "Master the art of academic writing. Get published in international journals.",
      date: "April 10, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Library Seminar Hall",
      tags: ["Research", "Academic", "Writing"],
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
      attendees: 67
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "mb-8",
          children: [
            /* header row: title + create button */ /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground", children: [
                  "Discover Your Next",
                  /* @__PURE__ */ jsx("span", { className: "text-primary", children: " Opportunity" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mt-2", children: "AI-powered recommendations tailored for your career goals" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(CreateEventModal, {}) })
            ] }),
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          className: "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 mb-8",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "AI Recommendations" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Based on your interests in AI/ML and Robotics" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-3 overflow-x-auto pb-2", children: ["AI Workshop Today", "ML Internship", "Research Opportunity", "Startup Challenge"].map((rec) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex-shrink-0 px-4 py-2 bg-background border border-border rounded-xl text-sm font-medium hover:border-primary hover:bg-orange-light transition-all cursor-pointer",
                children: rec
              },
              rec
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(FiltersBar, { activeFilters, onFilterChange: setActiveFilters }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: sampleEvents.map((event, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: index * 0.1 },
          children: /* @__PURE__ */ jsx(EventCard, { ...event })
        },
        index
      )) })
    ] })
  ] });
};
var StudentFeed_default = StudentFeed;
export {
  StudentFeed_default as default
};
