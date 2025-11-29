import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, DollarSign, Users, Award, Calendar, Briefcase, TrendingUp, Star } from "lucide-react";
import EventCard from "@/components/EventCard";
const FreelancerDashboard = () => {
  const freelancerStats = [
    { label: "Active Projects", value: "6", icon: Laptop, color: "text-blue-500" },
    { label: "Revenue (This Month)", value: "\u20B945K", icon: DollarSign, color: "text-green-500" },
    { label: "Client Rating", value: "4.9", icon: Star, color: "text-yellow-500" },
    { label: "Completed Jobs", value: "23", icon: Award, color: "text-primary" }
  ];
  const freelancerEvents = [
    {
      title: "Freelance Networking Meetup",
      organizer: "Freelancer Community",
      description: "Connect with fellow freelancers, share experiences, and find collaboration opportunities.",
      date: "March 20, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Co-working Space, Tech Park",
      tags: ["Networking", "Freelance", "Community"],
      imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800"
    },
    {
      title: "Client Acquisition Workshop",
      organizer: "Business Development Center",
      description: "Learn strategies to find high-paying clients and build long-term relationships.",
      date: "March 27, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Innovation Hub",
      tags: ["Workshop", "Business", "Growth"],
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
    },
    {
      title: "Upskilling for Freelancers: AI Tools",
      organizer: "Tech Skills Academy",
      description: "Master AI tools to enhance productivity and deliver better results to clients.",
      date: "April 3, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Virtual Event",
      tags: ["Upskilling", "AI", "Tools"],
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800"
    }
  ];
  const availableGigs = [
    { title: "Website Redesign", budget: "\u20B925K-35K", duration: "2 weeks", skills: ["UI/UX", "React"] },
    { title: "Mobile App Development", budget: "\u20B980K-1.2L", duration: "1 month", skills: ["Flutter", "Firebase"] },
    { title: "Data Analysis Project", budget: "\u20B915K-20K", duration: "1 week", skills: ["Python", "Data Viz"] },
    { title: "Content Writing", budget: "\u20B98K-12K", duration: "5 days", skills: ["SEO", "Blog Writing"] }
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
              "Freelancer ",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Workspace" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "Grow your freelance business and find new opportunities" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: freelancerStats.map((stat, index) => /* @__PURE__ */ jsx(
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
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Browse Gigs" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Manage Schedule" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Client Meetings" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { className: "h-auto py-4 flex-col gap-2 bg-background hover:bg-primary hover:text-primary-foreground rounded-xl", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Invoices" })
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
              /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-6", children: "Available Gigs" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: availableGigs.map((gig, index) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-light rounded-xl border border-primary/20 hover:border-primary transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground", children: gig.title }),
                  /* @__PURE__ */ jsx("span", { className: "text-primary font-bold text-sm", children: gig.budget })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Duration: ",
                  gig.duration
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: gig.skills.map((skill) => /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-background rounded-lg text-foreground", children: skill }, skill)) })
              ] }, index)) }),
              /* @__PURE__ */ jsx(Button, { className: "w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl", children: "View All Gigs" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            children: /* @__PURE__ */ jsxs(Card, { className: "p-6 border-border rounded-3xl h-full", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-6", children: "Revenue Insights" }),
              /* @__PURE__ */ jsx("div", { className: "h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-border mb-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx(TrendingUp, { className: "w-12 h-12 text-primary mx-auto mb-2" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-foreground", children: "Revenue Growing" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "+34% from last month" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-light rounded-xl text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary mb-1", children: "\u20B945K" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "This Month" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-light rounded-xl text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary mb-1", children: "\u20B92.3L" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total Earned" })
                ] })
              ] })
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
            /* @__PURE__ */ jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Growth & Networking Events" }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: freelancerEvents.map((event, index) => /* @__PURE__ */ jsx(
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
var FreelancerDashboard_default = FreelancerDashboard;
export {
  FreelancerDashboard_default as default
};
