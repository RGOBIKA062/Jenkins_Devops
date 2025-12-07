import axios from 'axios';

/**
 * GROQ AI SERVICE - Extraordinary Features Using Groq API
 * Powers: Smart recommendations, intelligent descriptions, predictive analytics
 */

const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_your_key_here';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

class GroqAIService {
  /**
   * Generate intelligent event description from topic
   * Creates professional, engaging descriptions automatically
   */
  static async generateEventDescription(topic, targetAudience = 'Faculty & Students') {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are an expert event organizer creating compelling event descriptions. Be creative, engaging, and professional. Keep it concise but impactful.'
            },
            {
              role: 'user',
              content: `Create a compelling event description for: "${topic}". Target audience: ${targetAudience}. Format: 2-3 sentences, professional tone, include key benefits.`
            }
          ],
          temperature: 0.7,
          max_tokens: 200,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating description:', error);
      return `Join us for an engaging session on ${topic}. This event brings together faculty, students, and industry experts to explore innovative ideas and best practices.`;
    }
  }

  /**
   * AI-powered event recommendations based on faculty expertise
   * Matches faculty profile with relevant events
   */
  static async recommendEvents(facultyProfile, availableEvents) {
    try {
      const eventsList = availableEvents.map(e => `- ${e.title}: ${e.description}`).join('\n');
      
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at matching faculty members with relevant events based on their expertise and interests. Provide recommendations as a JSON array with event indices and match scores (0-100).'
            },
            {
              role: 'user',
              content: `Faculty: ${facultyProfile.fullName}, Department: ${facultyProfile.department}, Specializations: ${facultyProfile.specializations?.join(', ')}\n\nAvailable Events:\n${eventsList}\n\nReturn JSON: {"recommendations": [{"eventIndex": 0, "matchScore": 85, "reason": "brief reason"}]}`
            }
          ],
          temperature: 0.5,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { recommendations: [] };
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Predict event success metrics
   * Estimates attendance, engagement, success rate
   */
  static async predictEventSuccess(eventData, historicalEvents = []) {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a data analyst predicting event success. Provide JSON predictions: estimated_attendance, engagement_score (0-100), success_probability (0-1), key_factors, recommendations.'
            },
            {
              role: 'user',
              content: `Event: ${eventData.title}\nCategory: ${eventData.category}\nCapacity: ${eventData.capacity}\nTiming: ${eventData.startDate}\nDescription: ${eventData.description}\n\nProvide predictions as JSON.`
            }
          ],
          temperature: 0.6,
          max_tokens: 400,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { estimated_attendance: 0, engagement_score: 0 };
    } catch (error) {
      console.error('Error predicting event success:', error);
      return { estimated_attendance: 0, engagement_score: 0, error: 'Prediction failed' };
    }
  }

  /**
   * Semantic search - understand user intent
   * Better than keyword matching
   */
  static async semanticSearch(query, events) {
    try {
      const eventsList = events.map((e, i) => `${i}: ${e.title} - ${e.description}`).join('\n');
      
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a search engine. Understand user intent and return relevant event indices. Return JSON: {"relevant_indices": [0, 2, 5], "search_intent": "brief description of what user wants"}'
            },
            {
              role: 'user',
              content: `User search: "${query}"\n\nAvailable events:\n${eventsList}\n\nReturn JSON with relevant event indices.`
            }
          ],
          temperature: 0.4,
          max_tokens: 300,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { relevant_indices: [] };
    } catch (error) {
      console.error('Error in semantic search:', error);
      return { relevant_indices: [] };
    }
  }

  /**
   * Analyze attendance patterns and predict no-shows
   * Recommend optimal scheduling
   */
  static async analyzeAttendancePatterns(facultyHistoricalEvents) {
    try {
      const eventsSummary = facultyHistoricalEvents
        .map(e => `${e.title}: ${e.registrations?.length || 0} registered, ${e.attended || 0} attended`)
        .join('\n');

      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a patterns analyst. Analyze attendance data and provide insights. Return JSON: {"avg_attendance_rate": 0.75, "peak_day": "Tuesday", "peak_time": "10:00 AM", "no_show_risk": 0.15, "recommendations": ["list of recommendations"]}'
            },
            {
              role: 'user',
              content: `Analyze these event attendances:\n${eventsSummary}\n\nProvide patterns and recommendations as JSON.`
            }
          ],
          temperature: 0.6,
          max_tokens: 400,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { avg_attendance_rate: 0.5 };
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      return { avg_attendance_rate: 0.5, error: 'Analysis failed' };
    }
  }

  /**
   * Generate personalized event marketing copy
   * Create engaging promotion text
   */
  static async generateMarketingCopy(event, targetAudience) {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a marketing expert. Create compelling, engaging event promotion copy. Make it exciting and actionable.'
            },
            {
              role: 'user',
              content: `Create marketing copy for: "${event.title}"\nDescription: ${event.description}\nTarget Audience: ${targetAudience}\n\nMake it catchy, engaging, and include a call-to-action. Keep it 2-3 sentences.`
            }
          ],
          temperature: 0.8,
          max_tokens: 200,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating marketing copy:', error);
      return `Don't miss "${event.title}"! Sign up now!`;
    }
  }

  /**
   * Extract key insights from event feedback
   * Summarize participant reviews
   */
  static async generateEventInsights(feedbackList) {
    try {
      if (!feedbackList || feedbackList.length === 0) {
        return { summary: 'No feedback available', sentiment: 'neutral', key_points: [] };
      }

      const feedbackText = feedbackList.map(f => f.comment).join(' | ');

      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a feedback analyst. Analyze feedback and return JSON: {"summary": "1-2 sentence summary", "sentiment": "positive/negative/neutral", "key_points": ["point1", "point2"], "improvements": ["suggestion1", "suggestion2"]}'
            },
            {
              role: 'user',
              content: `Analyze this event feedback:\n${feedbackText}\n\nProvide insights as JSON.`
            }
          ],
          temperature: 0.5,
          max_tokens: 400,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { summary: 'Analysis complete', sentiment: 'neutral' };
    } catch (error) {
      console.error('Error generating insights:', error);
      return { summary: 'Analysis complete', sentiment: 'neutral', key_points: [] };
    }
  }
}

export default GroqAIService;
