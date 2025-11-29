import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return /* @__PURE__ */ jsx(
    motion.nav,
    {
      initial: { y: -100 },
      animate: { y: 0 },
      transition: { duration: 0.5 },
      className: "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border",
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground text-lg", children: "ACE" }),
          /* @__PURE__ */ jsx("span", { className: "font-display font-bold text-xl text-foreground hidden sm:block", children: "AllCollegeEvent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "hidden md:block text-sm font-medium text-foreground/80 hover:text-primary transition-colors", children: "Get Started" }),
          /* @__PURE__ */ jsx(Link, { to: "/organizer", className: "hidden md:block text-sm font-medium text-foreground/80 hover:text-primary transition-colors", children: "Organizer" }),
          user ? /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", className: "rounded-full", children: /* @__PURE__ */ jsx(UserIcon, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
              /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-none", children: user.email }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-none text-muted-foreground", children: "Signed in" })
              ] }) }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => navigate("/student"), children: "Student Feed" }),
              /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => navigate("/organizer"), children: "Organizer Dashboard" }),
              /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => navigate("/faculty"), children: "Faculty Dashboard" }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleLogout, className: "text-destructive", children: [
                /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "Log out" })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                asChild: true,
                className: "hidden sm:inline-flex",
                children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: "Login" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-6",
                children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: "Sign Up" })
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
};
var Navbar_default = Navbar;
export {
  Navbar_default as default
};
