// Quick test
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(data => console.log('✅ Server alive:', data))
  .catch(e => console.error('❌ Server error:', e.message));
