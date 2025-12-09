/**
 * FREELANCER CONTROLLER
 * Enterprise-Grade API Controller with Validation & Error Handling
 * Features: CRUD Operations, AI Recommendations, Smart Matching
 * @author Senior Software Developer (25+ Years)
 * @version 2.0.0
 */

import Freelancer from '../models/Freelancer.js';
import GroqAIService from '../services/groqAIService.js';
import logger from '../utils/logger.js';

/**
 * ==========================================
 * VALIDATION HELPERS
 * ==========================================
 */

const validateProfileData = (data) => {
  const errors = [];

  if (data.profile) {
    if (!data.profile.firstName?.trim()) errors.push('First name is required');
    if (!data.profile.lastName?.trim()) errors.push('Last name is required');
    if (!data.profile.email?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.push('Valid email is required');
    }
    if (!data.profile.phone?.match(/^[0-9]{10}$/)) {
      errors.push('Valid 10-digit phone number is required');
    }
  }

  return errors;
};

const validateSkillData = (skill) => {
  if (!skill.name?.trim()) return 'Skill name is required';
  if (!['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skill.proficiency)) {
    return 'Invalid proficiency level';
  }
  if (skill.yearsOfExperience < 0) return 'Years of experience cannot be negative';
  return null;
};

/**
 * ==========================================
 * FREELANCER CONTROLLERS
 * ==========================================
 */

/**
 * Create or Update Freelancer Profile
 * POST /api/freelancer/profile
 * PUT /api/freelancer/profile/:id
 */
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId || 'demo-user-' + Date.now();
    const { profile, skills, portfolio, certifications, preferences, social } = req.body;

    console.log('📝 [PROFILE] Incoming request for userId:', userId);
    console.log('📝 [PROFILE] Profile data:', profile);

    // Validation - make it lenient for initial profile creation
    if (profile && profile.email && !profile.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      console.log('❌ [PROFILE] Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    if (profile && profile.phone && !profile.phone.match(/^[0-9]{10}$/)) {
      console.log('❌ [PROFILE] Invalid phone format');
      return res.status(400).json({
        success: false,
        message: 'Phone number must be 10 digits',
      });
    }

    // Check if freelancer already exists
    let freelancer = await Freelancer.findOne({ userId });

    if (freelancer) {
      // Update existing
      console.log('✏️  [PROFILE] Found existing profile, updating...');
      if (profile) {
        freelancer.profile = { ...freelancer.profile, ...profile };
      }
      if (skills) {
        freelancer.skills = skills;
      }
      if (portfolio) {
        freelancer.portfolio = portfolio;
      }
      if (certifications) {
        freelancer.certifications = certifications;
      }
      if (preferences) {
        freelancer.preferences = { ...freelancer.preferences, ...preferences };
      }
      if (social) {
        freelancer.social = { ...freelancer.social, ...social };
      }

      const saved = await freelancer.save();
      console.log('✅ [PROFILE] Profile saved successfully:', saved._id);

      logger.info(`Freelancer profile updated: ${userId}`);
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: freelancer,
      });
    }

    // Create new
    console.log('🆕 [PROFILE] Creating new profile...');
    freelancer = new Freelancer({
      userId,
      profile,
      skills: skills || [],
      portfolio: portfolio || [],
      certifications: certifications || [],
      preferences: preferences || {},
      social: social || {},
    });

    const saved = await freelancer.save();
    console.log('✅ [PROFILE] New profile created with MongoDB ID:', saved._id);

    logger.info(`New freelancer profile created: ${userId}`);
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: freelancer,
    });
  } catch (error) {
    console.error('❌ [PROFILE] Error:', error.message);
    logger.error(`Error creating/updating freelancer profile: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Get Freelancer Profile
 * GET /api/freelancer/profile
 * GET /api/freelancer/profile/:id
 */
export const getProfile = async (req, res) => {
  try {
    // Get userId from auth middleware, params, or query
    let userId = req.user?.userId || req.params.id || req.query.userId;
    
    // Generate demo user ID if no userId provided
    if (!userId) {
      userId = 'demo-user-' + Date.now();
    }

    console.log('🔍 [GET] Fetching profile for userId:', userId);

    const freelancer = await Freelancer.findOne({ userId });

    if (!freelancer) {
      console.log('⚠️  [GET] No profile found, returning empty structure');
      // Return empty profile structure for new users
      return res.status(200).json({
        success: true,
        data: {
          userId,
          profile: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            bio: '',
            headline: 'Freelancer at AllCollegeEvents',
            profileImage: null,
          },
          skills: [],
          portfolio: [],
          certifications: [],
          activeProjects: [],
          financials: {
            totalEarnings: 0,
            completedProjects: 0,
            monthlyEarnings: 0,
            ongoingProjects: 0,
          },
          ratings: {
            averageRating: 0,
            totalReviews: 0,
          },
          message: 'New profile - no data yet',
        },
      });
    }

    console.log('✅ [GET] Profile found! Skills:', freelancer.skills.length, 'Portfolio items:', freelancer.portfolio.length);

    // Increment profile views
    freelancer.analytics.profileViews += 1;
    await freelancer.save();

    res.status(200).json({
      success: true,
      data: freelancer,
    });
  } catch (error) {
    console.error('❌ [GET] Error:', error.message);
    logger.error(`Error fetching freelancer profile: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Add Skill
 * POST /api/freelancer/skills
 */
export const addSkill = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId;
    if (!userId) {
      userId = 'demo-user-' + Date.now();
    }
    const { name, proficiency, yearsOfExperience } = req.body;

    console.log('📚 [SKILL] Incoming skill request for userId:', userId);
    console.log('📚 [SKILL] Skill data:', { name, proficiency, yearsOfExperience });

    // Validation
    const error = validateSkillData({ name, proficiency, yearsOfExperience });
    if (error) {
      console.log('❌ [SKILL] Validation error:', error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error,
      });
    }

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      console.log('❌ [SKILL] Freelancer profile not found for userId:', userId);
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    console.log('✏️  [SKILL] Found freelancer profile, adding skill...');
    const result = await freelancer.addSkill({ name, proficiency, yearsOfExperience });
    
    console.log('✅ [SKILL] Skill added successfully');
    console.log('📚 [SKILL] Total skills now:', freelancer.skills.length);

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: freelancer.skills,
    });
  } catch (error) {
    console.error('❌ [SKILL] Error:', error.message);
    logger.error(`Error adding skill: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Update Skill
 * PUT /api/freelancer/skills/:skillName
 */
export const updateSkill = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId;
    if (!userId) {
      userId = 'demo-user-' + Date.now();
    }
    const { skillName } = req.params;
    const { proficiency, yearsOfExperience, endorsements } = req.body;

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    const skill = freelancer.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    if (proficiency) skill.proficiency = proficiency;
    if (yearsOfExperience !== undefined) skill.yearsOfExperience = yearsOfExperience;
    if (endorsements !== undefined) skill.endorsements = endorsements;

    await freelancer.save();

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  } catch (error) {
    logger.error(`Error updating skill: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Delete Skill
 * DELETE /api/freelancer/skills/:skillName
 */
export const deleteSkill = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId;
    if (!userId) {
      userId = 'demo-user-' + Date.now();
    }
    const { skillName } = req.params;

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    freelancer.skills = freelancer.skills.filter(
      s => s.name.toLowerCase() !== skillName.toLowerCase()
    );

    await freelancer.save();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    logger.error(`Error deleting skill: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Add Portfolio Item
 * POST /api/freelancer/portfolio
 */
export const addPortfolioItem = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }
    const { title, description, image, link, category } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Portfolio title is required',
      });
    }

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    await freelancer.addPortfolioItem({ title, description, image, link, category });

    res.status(201).json({
      success: true,
      message: 'Portfolio item added successfully',
      data: freelancer.portfolio,
    });
  } catch (error) {
    logger.error(`Error adding portfolio item: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Delete Portfolio Item
 * DELETE /api/freelancer/portfolio/:id
 */
export const deletePortfolioItem = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }
    const { id } = req.params;

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    freelancer.portfolio = freelancer.portfolio.filter(p => p._id.toString() !== id);
    await freelancer.save();

    res.status(200).json({
      success: true,
      message: 'Portfolio item deleted successfully',
    });
  } catch (error) {
    logger.error(`Error deleting portfolio item: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Add Certification
 * POST /api/freelancer/certifications
 */
export const addCertification = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }
    const { name, issuer, issueDate, expiryDate, credentialUrl, certificateImage } = req.body;

    if (!name?.trim() || !issuer?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Certification name and issuer are required',
      });
    }

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    await freelancer.addCertification({
      name,
      issuer,
      issueDate,
      expiryDate,
      credentialUrl,
      certificateImage,
    });

    res.status(201).json({
      success: true,
      message: 'Certification added successfully',
      data: freelancer.certifications,
    });
  } catch (error) {
    logger.error(`Error adding certification: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Delete Certification
 * DELETE /api/freelancer/certifications/:id
 */
export const deleteCertification = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }
    const { id } = req.params;

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    freelancer.certifications = freelancer.certifications.filter(c => c._id.toString() !== id);
    await freelancer.save();

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    logger.error(`Error deleting certification: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Create Active Project/Gig
 * POST /api/freelancer/projects
 */
export const createProject = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }
    const { title, description, status, budget, deadline, location, category } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project title is required',
      });
    }

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    freelancer.activeProjects.push({
      title,
      description,
      status,
      budget,
      deadline,
      location,
      category,
    });

    if (status === 'Active') {
      freelancer.financials.ongoingProjects += 1;
    }

    await freelancer.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: freelancer.activeProjects,
    });
  } catch (error) {
    logger.error(`Error creating project: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Update Project Status
 * PUT /api/freelancer/projects/:id
 */
export const updateProjectStatus = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Active', 'Paused', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    const project = freelancer.activeProjects.find(p => p._id.toString() === id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const oldStatus = project.status;
    project.status = status;

    // Update ongoing projects count
    if (oldStatus === 'Active' && status !== 'Active') {
      freelancer.financials.ongoingProjects = Math.max(0, freelancer.financials.ongoingProjects - 1);
    } else if (oldStatus !== 'Active' && status === 'Active') {
      freelancer.financials.ongoingProjects += 1;
    }

    if (status === 'Completed') {
      freelancer.financials.completedProjects += 1;
    }

    await freelancer.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    logger.error(`Error updating project: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Get AI-Powered Job Recommendations
 * GET /api/freelancer/ai-recommendations?userId=<userId>
 * 
 * Enterprise Implementation: Extracts userId from query params (highest priority),
 * validates freelancer profile exists, and generates AI recommendations via Groq
 */
export const getAIRecommendations = async (req, res) => {
  try {
    // Priority: query params > auth token > request body > demo fallback
    let userId = req.query?.userId || req.user?.userId || req.body?.userId;
    
    if (!userId) {
      userId = `demo-user-${Date.now()}`;
      logger.info(`Demo mode for AI recommendations: ${userId}`);
    }

    logger.info(`AI Recommendations requested for userId: ${userId}`);

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      logger.warn(`Freelancer profile not found: ${userId}`);
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found. Please complete your profile first.',
        code: 'PROFILE_NOT_FOUND',
      });
    }

    // Extract and validate skills
    const skillsList = freelancer.skills?.map(s => s.name?.trim()).filter(Boolean) || [];
    
    if (skillsList.length === 0) {
      logger.info(`No skills for recommendations: ${userId}`);
      return res.status(200).json({
        success: true,
        data: {
          recommendations: [],
          message: 'Add skills to your profile to get job recommendations',
        },
      });
    }

    logger.info(`Processing AI recommendations for skills: ${skillsList.join(', ')}`);

    const recommendations = await GroqAIService.generateFreelancerJobRecommendations(skillsList);

    res.status(200).json({
      success: true,
      data: {
        recommendations: Array.isArray(recommendations) ? recommendations : [],
        timestamp: new Date().toISOString(),
        skillsAnalyzed: skillsList.length,
      },
    });
  } catch (error) {
    logger.error(`Error getting AI recommendations: ${error.message}`, { stack: error.stack });
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations. Please try again.',
      code: 'AI_SERVICE_ERROR',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Get Skill Improvement Suggestions
 * GET /api/freelancer/skill-boost?userId=<userId>
 * 
 * Enterprise Implementation: Extracts userId from query params (highest priority),
 * validates freelancer profile exists, and generates skill boost suggestions via Groq
 */
export const getSkillBoost = async (req, res) => {
  try {
    // Priority: query params > auth token > request body > demo fallback
    let userId = req.query?.userId || req.user?.userId || req.body?.userId;
    
    if (!userId) {
      userId = `demo-user-${Date.now()}`;
      logger.info(`Demo mode for skill boost: ${userId}`);
    }

    logger.info(`Skill boost requested for userId: ${userId}`);

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      logger.warn(`Freelancer profile not found: ${userId}`);
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found. Please complete your profile first.',
        code: 'PROFILE_NOT_FOUND',
      });
    }

    // Extract and validate skills
    const skillsList = freelancer.skills?.map(s => s.name?.trim()).filter(Boolean) || [];

    if (skillsList.length === 0) {
      logger.info(`No skills for skill boost: ${userId}`);
      return res.status(200).json({
        success: true,
        data: {
          newSkills: [],
          courses: [],
          workshops: [],
          message: 'Add skills to your profile to get improvement suggestions',
        },
      });
    }

    logger.info(`Processing skill boost for skills: ${skillsList.join(', ')}`);

    const suggestions = await GroqAIService.generateSkillBoostSuggestions(skillsList);

    res.status(200).json({
      success: true,
      data: {
        ...suggestions,
        timestamp: new Date().toISOString(),
        skillsAnalyzed: skillsList.length,
      },
    });
  } catch (error) {
    logger.error(`Error getting skill boost suggestions: ${error.message}`, { stack: error.stack });
    res.status(500).json({
      success: false,
      message: 'Error generating skill suggestions. Please try again.',
      code: 'AI_SERVICE_ERROR',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Get Freelancer Statistics
 * GET /api/freelancer/stats
 */
export const getFreelancerStats = async (req, res) => {
  try {
    let userId = req.user?.userId || req.body.userId; if (!userId) { userId = "demo-user-" + Date.now(); }

    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer profile not found',
      });
    }

    const stats = freelancer.getStatistics();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error(`Error fetching freelancer stats: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Search Freelancers by Skills
 * GET /api/freelancer/search?skills=skill1,skill2&rating=4&sort=rating
 */
export const searchFreelancers = async (req, res) => {
  try {
    const { skills, rating, sort, page = 1, limit = 10 } = req.query;

    let query = { isActive: true, isSuspended: false };

    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim());
      query['skills.name'] = { $in: skillArray };
    }

    if (rating) {
      query['ratings.averageRating'] = { $gte: parseFloat(rating) };
    }

    const sortOption = sort === 'earnings' ? { 'financials.totalEarnings': -1 } : { 'ratings.averageRating': -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const freelancers = await Freelancer.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Freelancer.countDocuments(query);

    res.status(200).json({
      success: true,
      data: freelancers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error(`Error searching freelancers: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Add Review & Rating
 * POST /api/freelancer/reviews
 */
export const addReview = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const { clientId, rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer not found',
      });
    }

    await freelancer.addReview(clientId, rating, comment);

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: freelancer.ratings,
    });
  } catch (error) {
    logger.error(`Error adding review: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Get All Freelancers (Admin)
 * GET /api/freelancer/admin/all
 */
export const getAllFreelancers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const freelancers = await Freelancer.find()
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Freelancer.countDocuments();

    res.status(200).json({
      success: true,
      data: freelancers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error(`Error fetching all freelancers: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
