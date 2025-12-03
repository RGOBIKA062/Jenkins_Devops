import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import FiltersBar from '@/components/FiltersBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { eventsAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const StudentFeed = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('trending');
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    sortBy: 'newest',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
      return;
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsAPI.getAllEvents();
        // Handle both direct array and nested data format
        const eventsList = Array.isArray(response) 
          ? response 
          : response.data?.events || [];
        setEvents(eventsList);
        setFilteredEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to load events. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated, toast]);

  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter((event) =>
        activeFilters.some(
          (filter) =>
            event.category?.toLowerCase().includes(filter.toLowerCase()) ||
            event.tags?.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
        )
      );
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'trending') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => new Date(a.deadline || new Date()) - new Date(b.deadline || new Date()));
    }

    setFilteredEvents(filtered);
  }, [searchQuery, activeFilters, sortBy, events]);

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
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Student Feed</h1>
              <p className="text-muted-foreground mt-1">Discover events and opportunities tailored for you</p>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="gap-2">
              <Plus className="w-4 h-4" />
              My Dashboard
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <FiltersBar 
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No events found matching your criteria</p>
              <Button variant="outline" onClick={() => setSelectedFilters({ category: 'all', sortBy: 'newest' })}>
                Reset Filters
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id || event.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <EventCard 
                  id={event._id || event.id}
                  title={event.title}
                  organizer={event.organizer?.organizerName || event.organizerName || "Unknown"}
                  description={event.description}
                  date={event.startDate ? new Date(event.startDate).toLocaleDateString() : "TBD"}
                  time={event.startTime || "TBD"}
                  location={event.location?.address || event.address || "TBD"}
                  tags={event.tags || event.skillsRequired || []}
                  imageUrl={event.bannerImage || event.imageUrl}
                  attendees={event.registeredCount || 0}
                  registrationUrl={event.registrationUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StudentFeed;
