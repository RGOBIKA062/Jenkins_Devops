import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FiltersBar from '@/components/FiltersBar';
import EventCard from '@/components/EventCard';
import { Sparkles, Loader, Code2, AlertCircle } from 'lucide-react';
import CreateEventModal from '../components/CreateEventModal';
import { useNavigate } from 'react-router-dom';

const StudentFeed = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Enhanced error handling with retry logic
      let retries = 0;
      const maxRetries = 3;
      let lastError = null;

      while (retries < maxRetries) {
        try {
          const response = await Promise.race([
            fetch('http://localhost:5000/api/events/all'),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Request timeout')), 10000)
            ),
          ]);

          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }

          const data = await response.json();

          if (!data?.data?.events || !Array.isArray(data.data.events)) {
            throw new Error('Invalid response format from server');
          }

          // Transform API events to match EventCard format
          const transformedEvents = data.data.events.map(event => ({
            id: event._id,
            title: event.title,
            organizer: event.organizer?.organizerName || 'Unknown',
            description: event.description,
            date: new Date(event.startDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            time: `${event.startTime || '00:00'} - ${event.endTime || '23:59'}`,
            location: event.location?.type === 'Online' 
              ? event.location?.meetingLink || 'Online'
              : `${event.location?.address || 'TBD'}, ${event.location?.city || 'TBD'}`,
            tags: event.tags || [],
            imageUrl: event.bannerImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
            attendees: event.registeredCount || 0,
            totalCapacity: event.totalCapacity,
            price: event.pricing?.amount,
            rating: event.ratings?.overallRating || 0,
            reviews: event.ratings?.totalRatings || 0,
            features: event.features || {},
            wishlistCount: event.wishlistCount || 0,
            eventType: event.eventType,
            skillLevel: event.skillLevel
          }));

          setEvents(transformedEvents);
          setError(null);
          return; // Success - exit retry loop

        } catch (err) {
          lastError = err;
          retries++;
          if (retries < maxRetries) {
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      // All retries failed - use fallback
      console.error('Failed to fetch events after retries:', lastError);
      setEvents(getFallbackEvents());
      setError('Unable to connect to server. Showing recent events.');

    } catch (err) {
      console.error('Error in fetchEvents:', err);
      setEvents(getFallbackEvents());
      setError('Connection error. Showing sample events.');
    } finally {
      setLoading(false);
    }
  };

  const getFallbackEvents = () => [
    {
      id: '1',
      title: 'AI & Machine Learning Workshop',
      organizer: 'Google Developer Student Club',
      description: 'Learn cutting-edge AI techniques from industry experts.',
      date: 'March 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Engineering Auditorium, Block A',
      tags: ['AI/ML', 'Workshop', 'Beginner'],
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      attendees: 245,
      totalCapacity: 300,
      price: 0,
      rating: 4.8,
      reviews: 124,
      features: { hasCertificate: true },
      wishlistCount: 45,
      eventType: 'Workshop',
      skillLevel: 'Beginner'
    },
    {
      id: '2',
      title: 'Startup Funding & Pitch Competition',
      organizer: 'Entrepreneurship Cell',
      description: 'Present your startup ideas to top VCs.',
      date: 'March 20, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Innovation Hub, 3rd Floor',
      tags: ['Startup', 'Competition', 'Funding'],
      imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
      attendees: 180,
      totalCapacity: 200,
      price: 500,
      rating: 4.6,
      reviews: 89,
      features: { hasPrizePool: true },
      wishlistCount: 67,
      eventType: 'Competition',
      skillLevel: 'Intermediate'
    },
    {
      id: '3',
      title: 'Summer Internship Fair 2025',
      organizer: 'Career Development Center',
      description: 'Meet recruiters from 50+ top companies.',
      date: 'March 25, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Main Campus Ground',
      tags: ['Internship', 'Career', 'Placement'],
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      attendees: 520,
      totalCapacity: 600,
      price: 0,
      rating: 4.9,
      reviews: 234,
      features: { hasJobOpportunity: true },
      wishlistCount: 123,
      eventType: 'Career Fair',
      skillLevel: 'All Levels'
    }
  ];

  const filterAndSortEvents = () => {
    const searchQuery = searchValue.trim().toLowerCase();
    
    let filtered = events.filter(event => {
      if (!searchQuery) return true;
      const searchableText = [
        event.title,
        event.organizer,
        event.description,
        event.location,
        ...(event.tags || [])
      ].join(' ').toLowerCase();
      return searchableText.includes(searchQuery);
    });

    if (activeFilters && activeFilters.length > 0) {
      filtered = filtered.filter(event => {
        const eventTags = (event.tags || []).map(t => t.toLowerCase());
        return activeFilters.some(
          f => 
            eventTags.includes(f.toLowerCase()) ||
            event.title.toLowerCase().includes(f.toLowerCase())
        );
      });
    }

    let sorted = [...filtered];
    if (sortBy === 'trending') {
      sorted.sort((a, b) => (b.attendees || 0) - (a.attendees || 0));
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return sorted;
  };

  const filteredEvents = filterAndSortEvents();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground">
                Discover Your Next
                <span className="text-primary"> Opportunity</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                {loading ? 'Loading events...' : `${filteredEvents.length} events available`}
              </p>
            </div>
            <CreateEventModal />
          </div>
        </motion.div>

        {/* ONLINE COMPILER - ANY CODE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-orange-600/10 via-orange-600/5 to-transparent border border-orange-600/20 rounded-3xl p-6 mb-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-foreground">💻 Online Compiler Pro</h2>
                <p className="text-sm text-muted-foreground">Professional IDE with auto-closing brackets & syntax highlighting</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/compiler-pro')}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition whitespace-nowrap"
            >
              Launch →
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-foreground">AI Recommendations</h2>
              <p className="text-sm text-muted-foreground">Based on your interests</p>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {['AI Workshop', 'ML Internship', 'Research', 'Startup'].map(rec => (
              <div
                key={rec}
                className="flex-shrink-0 px-4 py-2 bg-background border border-border rounded-xl text-sm font-medium hover:border-primary cursor-pointer"
              >
                {rec}
              </div>
            ))}
          </div>
        </motion.div>

        <FiltersBar
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mb-8 text-orange-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Connection Issue</h3>
              <p className="text-sm">{error}</p>
              <button
                onClick={fetchEvents}
                className="mt-2 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard {...event} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No events found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentFeed;
