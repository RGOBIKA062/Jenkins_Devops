import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Award, FileText, Video } from "lucide-react";
import EventCard from "@/components/EventCard";
const FacultyDashboard = () => {
  const facultyStats = [
    { label: "Active Students", value: "156", icon: Users, color: "text-blue-500" },
    { label: "Courses", value: "4", icon: BookOpen, color: "text-green-500" },
    { label: "Research Projects", value: "12", icon: FileText, color: "text-purple-500" },
    { label: "Publications", value: "28", icon: Award, color: "text-primary" }
  ];
  const facultyEvents = [
    {
      title: "Faculty Development Program",
      organizer: "Academic Affairs",
      description: "Advanced teaching methodologies and digital tools for modern education.",
      date: "March 18, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Faculty Lounge, Admin Block",
      tags: ["Professional Development", "Teaching", "Workshop"],
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
    },
    {
      title: "Research Collaboration Meet",
      organizer: "R&D Department",
      description: "Network with researchers from top institutions. Explore collaboration opportunities.",
      date: "March 22, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Conference Hall A",
      tags: ["Research", "Networking", "Collaboration"],
      imageUrl: "https://images.unsplash.com/photo-1581093458791-9d42e3c3e82b?w=800"
    },
    {
      title: "Grant Writing Workshop",
      organizer: "Research Cell",
      description: "Learn to write winning research proposals for national and international grants.",
      date: "March 28, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Library Seminar Hall",
      tags: ["Research", "Funding", "Workshop"],
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"
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
            /* @__PURE__ */ jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground mb-3", children: [
              "Faculty ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Dashboard" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Manage courses, research, and professional development" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: facultyStats.map((stat, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: index * 0.1 },
          children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border rounded-2xl hover:shadow-lg transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-xl bg-orange-light flex items-center justify-center ${stat.color} mb-4`, children: /* @__PURE__ */ jsx(stat.icon, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-foreground mb-1", children: stat.value }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: stat.label })
          ] })
        },
        stat.label
      )) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border rounded-3xl bg-gradient-to-r from-primary/5 to-primary/10", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-4", children: "Quick Actions" }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Video, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Schedule Lecture" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Upload Material" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(GraduationCap, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Grade Assignments" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Submit Research" })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Professional Development Opportunities" }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: facultyEvents.map((event, index) => /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.1 },
                children: /* @__PURE__ */ jsx(EventCard, { ...event })
              },
              index
            )) })
          ]
        }
      )
    ] })
  ] });
};
var FacultyDashboard_default = FacultyDashboard;
export {
  FacultyDashboard_default as default
};
