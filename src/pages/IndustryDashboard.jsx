import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Target, Calendar, Building2, Handshake } from "lucide-react";
import EventCard from "@/components/EventCard";
const IndustryDashboard = () => {
  const industryStats = [
    { label: "Active Collaborations", value: "8", icon: Handshake, color: "text-blue-500" },
    { label: "Campus Visits", value: "24", icon: Building2, color: "text-green-500" },
    { label: "Students Hired", value: "156", icon: Users, color: "text-purple-500" },
    { label: "Events Hosted", value: "12", icon: Calendar, color: "text-primary" }
  ];
  const industryEvents = [
    {
      title: "Campus Recruitment Drive 2025",
      organizer: "TechCorp Solutions",
      description: "Hire top talent for SDE, Data Analyst, and Product roles. On-campus interviews and assessments.",
      date: "March 25, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Placement Cell, Main Building",
      tags: ["Recruitment", "Placement", "Full-time"],
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
    },
    {
      title: "Industry-Academia Collaboration Summit",
      organizer: "Engineering Council",
      description: "Build partnerships with universities. Discuss research collaborations and internship programs.",
      date: "April 2, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Center",
      tags: ["Collaboration", "Partnership", "Research"],
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800"
    },
    {
      title: "Tech Talk: AI in Manufacturing",
      organizer: "Industry Professionals Network",
      description: "Share insights on AI implementation in manufacturing. Network with faculty and students.",
      date: "April 8, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Engineering Auditorium",
      tags: ["Tech Talk", "AI", "Manufacturing"],
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"
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
              "Industry Professional ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Hub" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Connect with top talent and build academic partnerships" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: industryStats.map((stat, index) => /* @__PURE__ */ jsx(
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
                /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Post Job Opening" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Schedule Visit" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "View Talent Pool" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Target, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Start Campaign" })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 mb-8", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border rounded-3xl h-full", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-6", children: "Top Talent Categories" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
                { skill: "Full Stack Development", count: "842", demand: "High" },
                { skill: "Data Science & AI", count: "567", demand: "Very High" },
                { skill: "Cloud & DevOps", count: "423", demand: "High" },
                { skill: "Cybersecurity", count: "298", demand: "Medium" }
              ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-light rounded-xl", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: item.skill }),
                  /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded-full ${item.demand === "Very High" ? "bg-primary text-primary-foreground" : item.demand === "High" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`, children: item.demand })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  item.count,
                  " qualified students"
                ] })
              ] }, index)) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border rounded-3xl h-full", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-6", children: "Upcoming Campus Drives" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
                { company: "Your Company", date: "March 25", roles: "SDE, Data Analyst" },
                { company: "TechStart Inc", date: "March 30", roles: "Product Manager" },
                { company: "InnovateCorp", date: "April 5", roles: "ML Engineer" }
              ].map((drive, index) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-light rounded-xl border border-primary/20", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: drive.company }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: drive.roles })
                  ] }),
                  /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-primary" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-primary font-medium", children: [
                  drive.date,
                  ", 2025"
                ] })
              ] }, index)) })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Networking & Collaboration Events" }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: industryEvents.map((event, index) => /* @__PURE__ */ jsx(
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
var IndustryDashboard_default = IndustryDashboard;
export {
  IndustryDashboard_default as default
};
