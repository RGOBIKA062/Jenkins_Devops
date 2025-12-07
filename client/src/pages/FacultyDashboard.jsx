import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Plus, Users, Calendar, BookOpen, BarChart3, Eye, Star, Search, 
  Edit, Trash2, TrendingUp, CheckCircle, AlertCircle, Download
} from 'lucide-react';

/**
 * FACULTY DASHBOARD - PRODUCTION GRADE V2
 * Complete faculty portal with event management, analytics, and search
 */
const FacultyDashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Faculty Data
  const [facultyProfile, setFacultyProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [eventParticipants, setEventParticipants] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [featuredFaculty, setFeaturedFaculty] = useState([]);

  // UI State
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    eventType: 'Workshop',
    category: 'Other',
    skillLevel: 'All Levels',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    organizationType: 'Individual',
    startDate: '',
    endDate: '',
    startTime: '10:00',
    endTime: '11:00',
    timezone: 'IST',
    locationType: 'Online',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    venue: '',
    meetingLink: '',
    totalCapacity: 100,
    pricingType: 'Free',
    pricingAmount: 0,
    earlyBirdEnabled: false,
    earlyBirdPercentage: 0,
    earlyBirdEndDate: '',
    bannerImage: '',
    tags: '',
    skillsOffered: '',
    skillsRequired: '',
    targetBatch: '',
    targetRole: '',
    speakers: [],
    hasCertificate: false,
    hasJobOpportunity: false,
    hasPrizePool: false,
    prizeAmount: 0,
    hasQA: false,
    hasRecording: false,
    hasMaterials: false,
    materialsUrl: '',
    hasLiveChat: false,
    hasGiveaways: false,
    agenda: [],
    faq: [],
    requirements: [],
    deliverables: [],
  });

  // Authentication Check
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
      return;
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch Faculty Profile
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchFacultyData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        // Fetch profile
        const profileRes = await fetch('http://localhost:5000/api/faculty/profile', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const profileData = await profileRes.json();

        if (profileData.success) {
          setFacultyProfile(profileData.data);
        }

        // Fetch statistics
        const statsRes = await fetch('http://localhost:5000/api/faculty/statistics', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const statsData = await statsRes.json();

        if (statsData.success) {
          setStatistics(statsData.data);
        }

        // Fetch my events
        const eventsRes = await fetch('http://localhost:5000/api/faculty/my-events', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const eventsData = await eventsRes.json();

        if (eventsData.success) {
          setMyEvents(eventsData.data);
        }
      } catch (error) {
        console.error('Error fetching faculty data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load faculty data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [isAuthenticated, user, toast]);

  // Fetch event participants
  const fetchEventParticipants = async (eventId) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const res = await fetch(`http://localhost:5000/api/faculty/events/${eventId}/registrations`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const data = await res.json();

      if (data.success) {
        setEventParticipants(data.data);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast({
        title: 'Error',
        description: 'Failed to load participants',
        variant: 'destructive',
      });
    }
  };

  // Search Events
  const handleSearchEvents = async () => {
    try {
      let url = `http://localhost:5000/api/faculty/search-events?`;
      if (searchQuery) url += `query=${searchQuery}&`;
      if (searchCategory) url += `category=${searchCategory}&`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setSearchResults(data.data);
        toast({
          title: 'Success',
          description: `Found ${data.count} events`,
        });
      }
    } catch (error) {
      console.error('Error searching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to search events',
        variant: 'destructive',
      });
    }
  };

  // Fetch Featured Faculty
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/faculty/featured');
        const data = await res.json();
        if (data.success) {
          setFeaturedFaculty(data.data);
        }
      } catch (error) {
        console.error('Error fetching featured faculty:', error);
      }
    };

    fetchFeatured();
  }, []);

  // Create Event
  const handleCreateEvent = async () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.startDate || !formData.endDate || 
          !formData.eventType || !formData.category || !formData.organizerName || !formData.organizationType ||
          !formData.startTime || !formData.endTime || !formData.locationType) {
        toast({
          title: 'Error',
          description: 'Please fill all required fields',
          variant: 'destructive',
        });
        return;
      }

      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const res = await fetch('http://localhost:5000/api/faculty/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Event created successfully',
        });
        setShowCreateModal(false);
        // Reset form to defaults
        setFormData({
          title: '',
          description: '',
          shortDescription: '',
          eventType: 'Workshop',
          category: 'Other',
          skillLevel: 'All Levels',
          organizerName: '',
          organizerEmail: '',
          organizerPhone: '',
          organizationType: 'Individual',
          startDate: '',
          endDate: '',
          startTime: '10:00',
          endTime: '11:00',
          timezone: 'IST',
          locationType: 'Online',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          venue: '',
          meetingLink: '',
          totalCapacity: 100,
          pricingType: 'Free',
          pricingAmount: 0,
          earlyBirdEnabled: false,
          earlyBirdPercentage: 0,
          earlyBirdEndDate: '',
          bannerImage: '',
          tags: '',
          skillsOffered: '',
          skillsRequired: '',
          targetBatch: '',
          targetRole: '',
          speakers: [],
          hasCertificate: false,
          hasJobOpportunity: false,
          hasPrizePool: false,
          prizeAmount: 0,
          hasQA: false,
          hasRecording: false,
          hasMaterials: false,
          materialsUrl: '',
          hasLiveChat: false,
          hasGiveaways: false,
          agenda: [],
          faq: [],
          requirements: [],
          deliverables: [],
        });
        // Refresh events
        const eventsRes = await fetch('http://localhost:5000/api/faculty/my-events', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const eventsData = await eventsRes.json();
        if (eventsData.success) setMyEvents(eventsData.data);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to create event',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event',
        variant: 'destructive',
      });
    }
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  // Handle banner image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'Image size must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Error',
          description: 'Please select a valid image file',
          variant: 'destructive',
        });
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          bannerImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const res = await fetch(`http://localhost:5000/api/faculty/events/${eventId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Event deleted successfully',
        });
        setMyEvents(myEvents.filter(e => e._id !== eventId));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive',
      });
    }
  };

  // Mark Attendance
  const handleMarkAttendance = async (eventId, userId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const newStatus = status === 'Attended' ? 'Registered' : 'Attended';
      
      const res = await fetch(`http://localhost:5000/api/faculty/events/${eventId}/attendance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Attendance updated',
        });
        fetchEventParticipants(eventId);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast({
        title: 'Error',
        description: 'Failed to update attendance',
        variant: 'destructive',
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Faculty Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Faculty Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome, {facultyProfile?.fullName || 'Faculty'}! • {facultyProfile?.designation}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowCreateModal(true)}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Create Event
              </Button>
              <Button
                onClick={() => setShowSearchModal(true)}
                variant="outline"
                className="gap-2"
              >
                <Search className="w-4 h-4" />
                Search Events
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.totalEventsCreated}</p>
                </div>
                <BookOpen className="w-8 h-8 text-indigo-500 opacity-50" />
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Registrations</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.totalRegistrations}</p>
                </div>
                <Users className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Attendance Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.averageAttendanceRate}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.averageRating} ⭐</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500 opacity-50" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full bg-white shadow-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Upcoming Events</span>
                    <span className="font-bold text-indigo-600">{statistics?.upcomingEvents || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Completed Events</span>
                    <span className="font-bold text-green-600">{statistics?.completedEvents || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total Attendees</span>
                    <span className="font-bold text-blue-600">{statistics?.totalAttendees || 0}</span>
                  </div>
                </div>
              </Card>

              {/* Profile Card */}
              {facultyProfile && (
                <Card className="p-6 bg-white border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Department:</strong> {facultyProfile.department || 'N/A'}</p>
                    <p className="text-sm text-gray-600"><strong>Experience:</strong> {facultyProfile.yearsOfExperience} years</p>
                    <p className="text-sm text-gray-600"><strong>Bio:</strong> {facultyProfile.bio}</p>
                  </div>
                </Card>
              )}
            </motion.div>
          </TabsContent>

          {/* My Events Tab */}
          <TabsContent value="events" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {myEvents.length === 0 ? (
                <Card className="p-12 text-center bg-white border border-gray-200">
                  <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">No events created yet</p>
                  <Button onClick={() => setShowCreateModal(true)} className="mt-4">Create First Event</Button>
                </Card>
              ) : (
                myEvents.map((event, idx) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{event.description?.substring(0, 100)}...</p>
                          <div className="flex gap-4 mt-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.startDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.registrations?.length || 0} registered
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {event.views || 0} views
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventModal(true);
                              fetchEventParticipants(event._id);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteEvent(event._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {selectedEvent ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title} - Participants</h3>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedEvent(null)}
                    >
                      ← Back
                    </Button>
                  </div>

                  {eventParticipants.length === 0 ? (
                    <Card className="p-12 text-center bg-white border border-gray-200">
                      <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-medium">No participants yet</p>
                    </Card>
                  ) : (
                    <Card className="bg-white border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left font-semibold text-gray-900">Name</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-900">Email</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-900">Institution</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-900">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {eventParticipants.map((p) => (
                              <tr key={p.userId?._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3 text-gray-900">{p.userId?.fullName}</td>
                                <td className="px-6 py-3 text-gray-600">{p.userId?.email}</td>
                                <td className="px-6 py-3 text-gray-600">{p.userId?.institution || 'N/A'}</td>
                                <td className="px-6 py-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    p.status === 'Attended'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td className="px-6 py-3">
                                  <Button
                                    size="sm"
                                    variant={p.status === 'Attended' ? 'default' : 'outline'}
                                    onClick={() => handleMarkAttendance(selectedEvent._id, p.userId._id, p.status)}
                                  >
                                    {p.status === 'Attended' ? '✓ Attended' : 'Mark Present'}
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="p-12 text-center bg-white border border-gray-200">
                  <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Select an event from "My Events" tab to view participants</p>
                </Card>
              )}
            </motion.div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {facultyProfile && (
                <Card className="p-8 bg-white border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Faculty Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{facultyProfile.fullName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{facultyProfile.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{facultyProfile.department}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{facultyProfile.designation}</div>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </TabsContent>

          {/* Featured Faculty Tab */}
          <TabsContent value="featured" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredFaculty.length === 0 ? (
                  <Card className="p-12 text-center bg-white border border-gray-200 md:col-span-2 lg:col-span-3">
                    <p className="text-gray-600 font-medium">No featured faculty available</p>
                  </Card>
                ) : (
                  featuredFaculty.map((faculty) => (
                    <motion.div
                      key={faculty._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 hover:shadow-lg transition cursor-pointer">
                        <div className="text-center">
                          <h4 className="text-lg font-bold text-gray-900">{faculty.fullName}</h4>
                          <p className="text-sm text-gray-600">{faculty.designation}</p>
                          <p className="text-xs text-gray-500 mt-1">{faculty.department}</p>
                          <div className="flex items-center justify-center gap-1 mt-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-gray-900">{faculty.averageRating}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-3 line-clamp-2">{faculty.bio}</p>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Event Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>Fill in event details - fields marked with * are required</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title *</label>
              <input
                type="text"
                name="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                placeholder="Enter event description (min 20 characters)"
                value={formData.description}
                onChange={handleFormChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Event Type & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Event Type *</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Conference">Conference</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Training">Training</option>
                  <option value="Networking">Networking</option>
                  <option value="Career Fair">Career Fair</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Organizer Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Organizer Name *</label>
                <input
                  type="text"
                  name="organizerName"
                  placeholder="Your name or organization"
                  value={formData.organizerName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Organizer Type *</label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="Individual">Individual</option>
                  <option value="Club">Club</option>
                  <option value="Company">Company</option>
                  <option value="College">College</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location Type *</label>
              <select
                name="locationType"
                value={formData.locationType}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Conditional: Meeting Link for Online */}
            {(formData.locationType === 'Online' || formData.locationType === 'Hybrid') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Meeting Link {formData.locationType === 'Online' ? '*' : '(optional)'}
                </label>
                <input
                  type="url"
                  name="meetingLink"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  value={formData.meetingLink}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Conditional: Venue for Offline */}
            {(formData.locationType === 'Offline' || formData.locationType === 'Hybrid') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Venue *</label>
                <input
                  type="text"
                  name="venue"
                  placeholder="Event venue name and address"
                  value={formData.venue}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Max Participants</label>
              <input
                type="number"
                name="totalCapacity"
                placeholder="100"
                value={formData.totalCapacity}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Banner Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Banner Image (optional)</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {formData.bannerImage && (
                  <div className="text-green-600 text-sm font-semibold">✓ Image selected</div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Max 5MB. Supported: JPG, PNG, GIF, WebP</p>
              {formData.bannerImage && formData.bannerImage.startsWith('data:') && (
                <div className="mt-2 relative">
                  <img 
                    src={formData.bannerImage} 
                    alt="Banner preview" 
                    className="h-20 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pricing Type</label>
                <select
                  name="pricingType"
                  value={formData.pricingType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {formData.pricingType === 'Paid' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price (INR)</label>
                  <input
                    type="number"
                    name="pricingAmount"
                    placeholder="500"
                    value={formData.pricingAmount}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Features</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasCertificate"
                    checked={formData.hasCertificate}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Certificate</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasJobOpportunity"
                    checked={formData.hasJobOpportunity}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Job Opportunities</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasRecording"
                    checked={formData.hasRecording}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Recording Available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasMaterials"
                    checked={formData.hasMaterials}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Study Materials</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleCreateEvent} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                Create Event
              </Button>
              <Button onClick={() => setShowCreateModal(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Events Modal */}
      <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
        <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Search Events on AllCollegeEvents</DialogTitle>
            <DialogDescription>Find events by title, category, location, or date</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search Query</label>
              <input
                type="text"
                placeholder="Enter event name, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Webinar">Webinar</option>
                <option value="Training">Training</option>
              </select>
            </div>

            <Button onClick={handleSearchEvents} className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            {searchResults.length > 0 && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                <p className="text-sm font-semibold text-gray-700">{searchResults.length} events found</p>
                {searchResults.map((event) => (
                  <div key={event._id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer">
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{event.description?.substring(0, 60)}...</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                      <span>{event.category}</span>
                      <span>{event.registrations?.length || 0} registered</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button onClick={() => setShowSearchModal(false)} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default FacultyDashboard;
