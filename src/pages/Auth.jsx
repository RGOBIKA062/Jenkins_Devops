import React, { useState, useEffect, useRef } from "react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [signupUserType, setSignupUserType] = useState("student");
  const [carouselApi, setCarouselApi] = useState(null);
  const autoplayRef = useRef(null);

  // Try to load up to 3 named assets from src/assets matching caurosel1/2/3
  const _slideModules = import.meta.glob('../assets/caurosel*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });
  const slideUrls = Object.values(_slideModules).slice(0, 3);

  useEffect(() => {
    if (!carouselApi) return;
    autoplayRef.current = setInterval(() => {
      try {
        carouselApi.scrollNext();
      } catch (e) {
        /* ignore */
      }
    }, 3500);
    return () => clearInterval(autoplayRef.current);
  }, [carouselApi]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      });
      if (error) throw error;
      toast({ title: "Welcome back!", description: "You've successfully logged in." });
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", data.user.id).single();
      navigate(profile?.user_type ? `/${profile.user_type}` : "/student");
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message || "Invalid email or password." });
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
        options: { emailRedirectTo: redirectUrl, data: { full_name: signupFullName } }
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from("profiles").update({ user_type: signupUserType }).eq("id", data.user.id);
      }
      toast({ title: "Account created!", description: "You've successfully signed up. You can now log in." });
      navigate(`/${signupUserType}`);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message || "Failed to create account." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-4rem)] flex items-start justify-center gap-8">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex w-full max-w-sm mr-8">
                <div className="w-full overflow-hidden rounded-3xl relative md:h-[650px] lg:h-[750px]">
            <Carousel opts={{ loop: true }} setApi={setCarouselApi}>
              <CarouselContent>
                {slideUrls.length > 0 ? (
                  slideUrls.map((src, i) => (
                    <CarouselItem key={i}>
                      <div className="h-full w-full flex items-center justify-center bg-white">
                        <img src={src} alt={`carousel ${i + 1}`} className="max-h-full max-w-full object-contain" />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <>
                    <CarouselItem className="pl-0">
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/60 to-primary/30 text-white text-2xl font-semibold">caurosel1</div>
                    </CarouselItem>
                    <CarouselItem className="pl-0">
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-secondary/60 to-secondary/30 text-white text-2xl font-semibold">caurosel2</div>
                    </CarouselItem>
                    <CarouselItem className="pl-0">
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/60 to-accent/30 text-white text-2xl font-semibold">caurosel3</div>
                    </CarouselItem>
                  </>
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden md:block" />
              <CarouselNext className="hidden md:block" />
            </Carousel>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mt-0">
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">AllCollegeEvent</CardTitle>
              <CardDescription className="text-center text-base">Join the ultimate event discovery platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="text-base">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="text-base">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="h-11" />
                    </div>
                    <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input id="signup-name" type="text" placeholder="John Doe" value={signupFullName} onChange={(e) => setSignupFullName(e.target.value)} required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={6} className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-type">I am a...</Label>
                      <select id="signup-type" value={signupUserType} onChange={(e) => setSignupUserType(e.target.value)} className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="student">Student</option>
                        <option value="organizer">Event Organizer</option>
                        <option value="faculty">Faculty Member</option>
                        <option value="industry">Industry Professional</option>
                        <option value="freelancer">Freelancer</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>{loading ? "Creating account..." : "Sign Up"}</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
