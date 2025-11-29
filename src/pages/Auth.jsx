import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [signupUserType, setSignupUserType] = useState("student");
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      });
      if (error)
        throw error;
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in."
      });
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", data.user.id).single();
      if (profile?.user_type) {
        navigate(`/${profile.user_type}`);
      } else {
        navigate("/student");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Invalid email or password."
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signupFullName
          }
        }
      });
      if (error)
        throw error;
      if (data.user) {
        await supabase.from("profiles").update({ user_type: signupUserType }).eq("id", data.user.id);
      }
      toast({
        title: "Account created!",
        description: "You've successfully signed up. You can now log in."
      });
      navigate(`/${signupUserType}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create account."
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-primary/5", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-4rem)]", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "w-full max-w-lg",
        children: /* @__PURE__ */ jsxs(Card, { className: "border-2 border-primary/20 shadow-2xl", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "AllCollegeEvent" }),
            /* @__PURE__ */ jsx(CardDescription, { className: "text-center text-base", children: "Join the ultimate event discovery platform" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [
            /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-6", children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "login", className: "text-base", children: "Login" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", className: "text-base", children: "Sign Up" })
            ] }),
            /* @__PURE__ */ jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "login-email", children: "Email" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "login-email",
                    type: "email",
                    placeholder: "you@example.com",
                    value: loginEmail,
                    onChange: (e) => setLoginEmail(e.target.value),
                    required: true,
                    className: "h-11"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "login-password", children: "Password" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "login-password",
                    type: "password",
                    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                    value: loginPassword,
                    onChange: (e) => setLoginPassword(e.target.value),
                    required: true,
                    className: "h-11"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full h-11 text-base font-semibold",
                  disabled: loading,
                  children: loading ? "Logging in..." : "Login"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "signup-name", children: "Full Name" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "signup-name",
                    type: "text",
                    placeholder: "John Doe",
                    value: signupFullName,
                    onChange: (e) => setSignupFullName(e.target.value),
                    required: true,
                    className: "h-11"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "signup-email", children: "Email" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "signup-email",
                    type: "email",
                    placeholder: "you@example.com",
                    value: signupEmail,
                    onChange: (e) => setSignupEmail(e.target.value),
                    required: true,
                    className: "h-11"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "signup-password", children: "Password" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "signup-password",
                    type: "password",
                    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                    value: signupPassword,
                    onChange: (e) => setSignupPassword(e.target.value),
                    required: true,
                    minLength: 6,
                    className: "h-11"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "signup-type", children: "I am a..." }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "signup-type",
                    value: signupUserType,
                    onChange: (e) => setSignupUserType(e.target.value),
                    className: "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "student", children: "Student" }),
                      /* @__PURE__ */ jsx("option", { value: "organizer", children: "Event Organizer" }),
                      /* @__PURE__ */ jsx("option", { value: "faculty", children: "Faculty Member" }),
                      /* @__PURE__ */ jsx("option", { value: "industry", children: "Industry Professional" }),
                      /* @__PURE__ */ jsx("option", { value: "freelancer", children: "Freelancer" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full h-11 text-base font-semibold",
                  disabled: loading,
                  children: loading ? "Creating account..." : "Sign Up"
                }
              )
            ] }) })
          ] }) })
        ] })
      }
    ) })
  ] });
};
var Auth_default = Auth;
export {
  Auth_default as default
};
