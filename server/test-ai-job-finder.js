/**
 * TEST FILE: AI Job Finder - City & Role Based Recommendations
 * Tests all new job recommendation endpoints
 */

const BASE_URL = 'http://localhost:5000/api/freelancer';

// Test data
const testUserId = 'demo-user-job-finder';

/**
 * TEST 1: Comprehensive Job Recommendations
 * (Best accuracy with all filters)
 */
async function testComprehensiveRecommendations() {
  console.log('\n📋 TEST 1: Comprehensive Job Recommendations\n');

  const payload = {
    city: 'Bangalore',
    role: 'Full Stack Developer',
    userId: testUserId,
    experience: 3,
    salaryRange: '₹60,000-₹120,000',
    employmentType: 'Full-time',
  };

  try {
    console.log('📤 Sending request to /recommendations/comprehensive');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`${BASE_URL}/recommendations/comprehensive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('\n✅ Response received:');
    console.log('Status:', response.status);
    console.log('Success:', data.success);
    console.log('Message:', data.message);
    console.log('Total Recommendations:', data.data?.totalRecommendations || 0);

    if (data.data?.recommendations?.length > 0) {
      console.log('\n🎯 Top Recommendation:');
      const topJob = data.data.recommendations[0];
      console.log(`  Title: ${topJob.title}`);
      console.log(`  Company: ${topJob.company}`);
      console.log(`  Location: ${topJob.location}`);
      console.log(`  Salary: ${topJob.salary}`);
      console.log(`  Match: ${topJob.matchPercentage}%`);
      console.log(`  Reason: ${topJob.matchReason}`);
    }

    return data;
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

/**
 * TEST 2: Job Recommendations by City
 */
async function testJobsByCity() {
  console.log('\n📍 TEST 2: Job Recommendations by City\n');

  const payload = {
    city: 'Mumbai',
    role: 'Backend Developer',
    userId: testUserId,
  };

  try {
    console.log('📤 Sending request to /recommendations/by-city');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`${BASE_URL}/recommendations/by-city`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('\n✅ Response received:');
    console.log('Status:', response.status);
    console.log('Total Results:', data.data?.totalResults || 0);
    console.log('Applied Filters:', JSON.stringify(data.data?.filters, null, 2));

    return data;
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

/**
 * TEST 3: Job Recommendations by Role
 */
async function testJobsByRole() {
  console.log('\n💼 TEST 3: Job Recommendations by Role\n');

  const payload = {
    role: 'Frontend Developer',
    city: 'Delhi',
    userId: testUserId,
  };

  try {
    console.log('📤 Sending request to /recommendations/by-role');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`${BASE_URL}/recommendations/by-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('\n✅ Response received:');
    console.log('Status:', response.status);
    console.log('Role Queried:', data.data?.roleQueried);
    console.log('City Filter:', data.data?.cityFilter);
    console.log('Total Recommendations:', data.data?.totalRecommendations || 0);

    return data;
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

/**
 * TEST 4: AI Job Finder (Smart Router with GET)
 */
async function testAIJobFinder() {
  console.log('\n🔍 TEST 4: AI Job Finder (Smart Router)\n');

  const queryParams = new URLSearchParams({
    city: 'Bangalore',
    role: 'DevOps Engineer',
    experience: '5',
    salaryRange: '₹80,000-₹150,000',
    userId: testUserId,
  });

  try {
    console.log(`📤 Sending GET request to /ai-job-finder?${queryParams.toString()}`);

    const response = await fetch(`${BASE_URL}/ai-job-finder?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log('\n✅ Response received:');
    console.log('Status:', response.status);
    console.log('Success:', data.success);

    return data;
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

/**
 * TEST 5: Multiple Locations Search
 */
async function testMultipleLocations() {
  console.log('\n🌍 TEST 5: Testing Multiple Locations\n');

  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];
  const role = 'Full Stack Developer';

  for (const city of locations) {
    try {
      const response = await fetch(`${BASE_URL}/recommendations/by-city`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, role, userId: testUserId }),
      });

      const data = await response.json();
      console.log(`✅ ${city}: ${data.data?.totalResults || 0} jobs found`);
    } catch (error) {
      console.error(`❌ ${city}: Error`);
    }
  }
}

/**
 * TEST 6: Different Roles Search
 */
async function testMultipleRoles() {
  console.log('\n💻 TEST 6: Testing Multiple Roles\n');

  const roles = [
    'Full Stack Developer',
    'Backend Developer',
    'Frontend Developer',
    'DevOps Engineer',
    'Data Science Engineer',
  ];
  const city = 'Bangalore';

  for (const role of roles) {
    try {
      const response = await fetch(`${BASE_URL}/recommendations/by-role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, city, userId: testUserId }),
      });

      const data = await response.json();
      console.log(`✅ ${role}: ${data.data?.totalRecommendations || 0} jobs found`);
    } catch (error) {
      console.error(`❌ ${role}: Error`);
    }
  }
}

/**
 * TEST 7: Error Handling - Missing Required Fields
 */
async function testErrorHandling() {
  console.log('\n⚠️  TEST 7: Error Handling\n');

  // Missing city
  try {
    console.log('Testing: Missing city...');
    const response = await fetch(`${BASE_URL}/recommendations/comprehensive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'Developer' }),
    });
    const data = await response.json();
    console.log(`❌ Expected error:`, data.message);
  } catch (error) {
    console.error('Request failed:', error.message);
  }

  // Missing role
  try {
    console.log('\nTesting: Missing role...');
    const response = await fetch(`${BASE_URL}/recommendations/comprehensive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Bangalore' }),
    });
    const data = await response.json();
    console.log(`❌ Expected error:`, data.message);
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

/**
 * TEST 8: Performance Test - Measure Response Time
 */
async function testPerformance() {
  console.log('\n⏱️  TEST 8: Performance Test\n');

  const payload = {
    city: 'Bangalore',
    role: 'Full Stack Developer',
    experience: 3,
    salaryRange: '₹60,000-₹120,000',
    employmentType: 'Full-time',
  };

  const iterations = 3;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();
    try {
      const response = await fetch(`${BASE_URL}/recommendations/comprehensive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await response.json();
      const elapsed = Date.now() - startTime;
      times.push(elapsed);
      console.log(`Request ${i + 1}: ${elapsed}ms`);
    } catch (error) {
      console.error(`Request ${i + 1}: Failed`);
    }
  }

  if (times.length > 0) {
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    console.log(`\nPerformance Summary:`);
    console.log(`  Average: ${avg.toFixed(0)}ms`);
    console.log(`  Min: ${min}ms`);
    console.log(`  Max: ${max}ms`);
  }
}

/**
 * RUN ALL TESTS
 */
async function runAllTests() {
  console.log('🚀 AI JOB FINDER - COMPREHENSIVE TEST SUITE');
  console.log('==========================================\n');

  // Wait between tests to avoid rate limiting
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await testComprehensiveRecommendations();
  await delay(2000);

  await testJobsByCity();
  await delay(2000);

  await testJobsByRole();
  await delay(2000);

  await testAIJobFinder();
  await delay(2000);

  await testMultipleLocations();
  await delay(2000);

  await testMultipleRoles();
  await delay(2000);

  await testErrorHandling();
  await delay(2000);

  await testPerformance();

  console.log('\n✅ ALL TESTS COMPLETED!\n');
}

// Export for module usage
export {
  testComprehensiveRecommendations,
  testJobsByCity,
  testJobsByRole,
  testAIJobFinder,
  testMultipleLocations,
  testMultipleRoles,
  testErrorHandling,
  testPerformance,
  runAllTests,
};

// Run all tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}
