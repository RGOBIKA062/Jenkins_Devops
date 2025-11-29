import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Bookmark, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const EventCard = ({
  title,
  organizer,
  description,
  date,
  time,
  location,
  tags,
  imageUrl,
  attendees = 0
}) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      whileHover: { y: -4 },
      transition: { duration: 0.3 },
      className: "group bg-card border border-border rounded-3xl overflow-hidden cursor-pointer",
      style: { boxShadow: "0 4px 24px -4px rgba(255, 122, 0, 0.1)" },
      children: [
        imageUrl && /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl,
              alt: title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: tags.map((tag) => /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "bg-orange-light text-foreground hover:bg-primary hover:text-primary-foreground transition-colors",
              children: tag
            },
            tag
          )) }),
          /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors", children: title }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
            organizer
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/80 mb-4 line-clamp-2", children: description }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxs("span", { children: [
                date,
                " \u2022 ",
                time
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsx("span", { children: location })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl",
                children: [
                  "Register Now",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 ml-2" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "icon",
                variant: "outline",
                className: "rounded-xl border-border hover:border-primary hover:bg-orange-light",
                children: /* @__PURE__ */ jsx(Bookmark, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "icon",
                variant: "outline",
                className: "rounded-xl border-border hover:border-primary hover:bg-orange-light",
                children: /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" })
              }
            )
          ] }),
          attendees > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-border", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-primary", children: [
              attendees,
              "+"
            ] }),
            " students interested"
          ] }) })
        ] })
      ]
    }
  );
};
var EventCard_default = EventCard;
export {
  EventCard_default as default
};
