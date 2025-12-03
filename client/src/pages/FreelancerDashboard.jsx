import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Plus, Briefcase, DollarSign, CheckCircle, Clock } from 'lucide-react';

const FreelancerDashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
      return;
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Placeholder for API calls - replace with actual endpoints
        setProjects([]);
        setEarnings(0);
        setCompletedProjects(0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Freelancer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your projects and grow your portfolio</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Browse Opportunities
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold mt-2">{projects.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold mt-2">${earnings.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold mt-2">{completedProjects}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold mt-2">-</p>
                </div>
                <Clock className="w-8 h-8 text-primary opacity-20" />
              </div>
            </Card>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Welcome to your Freelancer Dashboard. Find and manage your projects here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              {projects.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No active projects yet</p>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Find Projects
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="p-6">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="portfolio" className="mt-6">
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Your portfolio will showcase your completed projects</p>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FreelancerDashboard;
