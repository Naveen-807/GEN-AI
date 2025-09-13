const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'MindMate API is running!', timestamp: new Date().toISOString() });
});

// Voice journaling endpoint
app.post('/api/voice-journal', upload.single('audio'), (req, res) => {
  try {
    // TODO: Implement speech-to-text and sentiment analysis
    res.json({ 
      message: 'Voice journal received', 
      transcription: 'Sample transcription...', 
      sentiment: 'positive',
      resiliencePoints: 10
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Peer support endpoints
app.get('/api/peer-groups', (req, res) => {
  res.json({
    groups: [
      { id: 1, name: 'Exam Stress Support', members: 24, topic: 'exam-stress' },
      { id: 2, name: 'Social Anxiety Circle', members: 18, topic: 'social-anxiety' },
      { id: 3, name: 'Family Pressure Discussion', members: 31, topic: 'family-pressure' }
    ]
  });
});

// Resilience points endpoint
app.get('/api/resilience-points/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    points: 150,
    level: 'Mindful Explorer',
    nextLevel: 200,
    achievements: ['First Journal', 'Peer Helper', 'Week Warrior']
  });
});

// AI narrative therapy endpoint
app.post('/api/narrative-therapy', (req, res) => {
  const { emotion, situation } = req.body;
  res.json({
    narrative: 'Your story shows great courage in facing challenges...',
    alternativeEndings: [
      'What if you approached this with self-compassion?',
      'How might your future self handle this situation?',
      'What would you tell a friend in the same situation?'
    ],
    resiliencePoints: 15
  });
});

app.listen(PORT, () => {
  console.log(`MindMate server running on port ${PORT}`);
});

module.exports = app;