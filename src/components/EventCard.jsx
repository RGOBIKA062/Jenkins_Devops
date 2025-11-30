import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Bookmark, Share2, ExternalLink, Twitter, Linkedin, Facebook, Copy, MessageSquare } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
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
  const { toast } = useToast();

  const shareFor = React.useCallback((type) => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const url = `${origin}/student?title=${encodeURIComponent(title)}`;
      const text = `${title} — ${date} • ${time} @ ${location} — ${organizer}`;
      const encodedText = encodeURIComponent(text);
      const encodedUrl = encodeURIComponent(url);

      switch (type) {
        case "whatsapp": {
          const wa = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
          window.open(wa, "_blank");
          break;
        }
        case "twitter": {
          const tw = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
          window.open(tw, "_blank");
          break;
        }
        case "facebook": {
          const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          window.open(fb, "_blank", "noopener,noreferrer");
          break;
        }
        case "linkedin": {
          const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
          window.open(li, "_blank");
          break;
        }
        case "copy": {
            if (navigator?.clipboard?.writeText) {
              navigator.clipboard.writeText(url);
              toast({ title: "Link copied", description: "Event link copied to clipboard." });
            } else {
              const tmp = document.createElement("input");
              document.body.appendChild(tmp);
              tmp.value = url;
              tmp.select();
              document.execCommand("copy");
              document.body.removeChild(tmp);
              toast({ title: "Link copied", description: "Event link copied to clipboard." });
            }
            break;
          }
        case "native": {
          if (navigator?.share) {
            navigator.share({ title, text, url }).catch(() => {});
          } else {
            if (navigator?.clipboard?.writeText) navigator.clipboard.writeText(url);
            toast({ title: "Sharing not available", description: "Link copied to clipboard instead." });
          }
          break;
        }
        default:
          break;
      }
    } catch (e) {
      console.error("Share failed", e);
    }
  }, [title, date, time, location, organizer]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const toggleBookmark = React.useCallback((e) => {
    e.stopPropagation();
    setBookmarked((v) => !v);
    // TODO: persist to backend (Supabase) or localStorage later
  }, []);
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
            /* Bookmark with tooltip and toggle */
            /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, {
                  size: "icon",
                  variant: "ghost",
                  onClick: toggleBookmark,
                  "aria-pressed": bookmarked,
                  className: `rounded-xl border-border hover:border-primary hover:bg-orange-light transform transition-all duration-150 ${bookmarked ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"}`,
                  children: /* @__PURE__ */ jsx(Bookmark, { className: `w-4 h-4 ${bookmarked ? "text-primary" : ""}` })
              }) }), /* tooltip content */ /* @__PURE__ */ jsx(TooltipContent, { sideOffset: 6, children: bookmarked ? "Bookmarked" : "Save" })] }) }),

            /* Share dropdown with tooltip and better hover */
            /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* TooltipTrigger wraps a single span which contains the dropdown so Radix gets a single child */ /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("span", { className: "inline-flex", children: [/* Dropdown inside span */ /* @__PURE__ */ jsxs(DropdownMenu, {
                children: [
                  /* Trigger button */ /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, {
                    size: "icon",
                    variant: "ghost",
                    className: "rounded-xl border-border hover:border-primary hover:bg-orange-light transform transition-all duration-150 hover:scale-105 text-muted-foreground hover:text-primary",
                    "aria-label": "Share",
                    title: "Share",
                    children: /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" })
                  }) }),
                  /* Menu content */ /* @__PURE__ */ jsxs(DropdownMenuContent, { sideOffset: 6, align: "end", className: "w-48", children: [
                    /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Share" }),
                    /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => shareFor("whatsapp"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [/* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-emerald-500" }), "WhatsApp"] }) }),
                    /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => shareFor("twitter"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [/* @__PURE__ */ jsx(Twitter, { className: "w-4 h-4 text-sky-500" }), "Twitter"] }) }),
                    /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => shareFor("facebook"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [/* @__PURE__ */ jsx(Facebook, { className: "w-4 h-4 text-blue-600" }), "Facebook"] }) }),
                    /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => shareFor("linkedin"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [/* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4 text-sky-700" }), "LinkedIn"] }) }),
                    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => shareFor("native"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [/* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }), "Use device share"] }) }),
                    /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => shareFor("copy"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [/* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }), "Copy link"] }) })
                  ] })
                ]
              }), /* end dropdown */ /* @__PURE__ */ jsx(TooltipContent, { sideOffset: 6, children: "Share" })] }) }), /* end TooltipTrigger */] }) }),
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
