# MindMate - AI-Powered Student Wellness Companion

MindMate is an adaptive AI companion designed specifically for Indian students to help them process emotions, build resilience, manage stress, develop life skills, and improve overall mental, emotional, and physical wellness. The app is private, engaging, gamified, and culturally relevant.

## 🌟 Features

### Core Modules
- **Voice Journaling & Narrative Therapy**: Daily voice check-ins with AI sentiment analysis and story transformation
- **Gamification & Resilience Points**: Earn points for wellness activities and unlock new features
- **AI-Moderated Peer Support**: Anonymous, safe peer group discussions
- **Life Design Coach**: AI-guided career exploration and skill building
- **Mindfulness & Wellness Hub**: Mood-based micro-breaks and wellness tips
- **Discreet Mode**: App disguises as a study planner for privacy

### Technical Features
- Multi-modal AI integration (voice, text, sentiment analysis)
- Real-time peer support with AI moderation
- Gamified dashboard with progression tracking
- Google ecosystem integration
- Privacy-focused design with anonymous interactions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Cloud account (for production AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naveen-807/GEN-AI.git
   cd GEN-AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Architecture

### Frontend
- **Framework**: React.js with TypeScript
- **Styling**: TailwindCSS with custom wellness theme
- **State Management**: React hooks
- **Build Tool**: Create React App
- **Deployment**: Vercel-ready

### Backend
- **Runtime**: Node.js with Express
- **Database**: Firestore (NoSQL)
- **File Upload**: Multer for voice recordings
- **AI Integration**: Google Gemini 2.5 Pro, Vertex AI

### AI Services
- **Speech-to-Text**: Google Cloud Speech API
- **Sentiment Analysis**: Gemini AI
- **Narrative Generation**: Gemini AI
- **Content Moderation**: AI-powered safety filters

## 📱 Key Workflows

### 1. Voice Journaling → AI Analysis → Resilience Building
1. User records voice journal entry
2. AI transcribes and analyzes sentiment
3. System generates narrative therapy insights
4. User earns resilience points
5. Personalized recommendations provided

### 2. Peer Support with AI Moderation
1. User joins anonymous peer group
2. AI monitors conversations for safety
3. AI provides constructive prompts
4. Community support with safety guardrails

## 🎮 Gamification System

- **Resilience Points (RP)**: Earned through app engagement
- **Levels**: Mindful Explorer → Resilience Builder → Wellness Champion
- **Achievements**: Badges for milestones and consistent usage
- **Unlockables**: Advanced features, new AI simulations

## 🔒 Privacy & Safety

- **Anonymous Interactions**: No personal data in peer support
- **Local Voice Processing**: Audio files processed securely
- **AI Content Moderation**: Automatic detection of harmful content
- **Discreet Mode**: App appearance can be disguised
- **Data Encryption**: All sensitive data encrypted at rest and in transit

## 📦 Project Structure

```
GEN-AI/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── VoiceJournal.tsx
│   │   │   ├── PeerSupport.tsx
│   │   │   ├── NarrativeTherapy.tsx
│   │   │   └── ResiliencePoints.tsx
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # TailwindCSS styles
│   ├── tailwind.config.js   # TailwindCSS configuration
│   └── package.json
├── backend/                 # Node.js Express backend
│   ├── server.js           # Main server file
│   ├── .env.example        # Environment variables template
│   └── package.json
└── README.md
```

## 🛠️ Development

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### API Endpoints

- `GET /api/health` - Health check
- `POST /api/voice-journal` - Submit voice recording
- `GET /api/peer-groups` - List peer support groups
- `GET /api/resilience-points/:userId` - Get user's points
- `POST /api/narrative-therapy` - Generate AI narrative

### Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (when implemented)
cd backend
npm test
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect repository to Vercel
2. Set build directory to `frontend`
3. Configure environment variables
4. Deploy automatically on push

### Backend (Railway/Heroku/Google Cloud)
1. Set up production database (Firestore)
2. Configure Google Cloud credentials
3. Set environment variables
4. Deploy with `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Cloud AI for providing advanced AI capabilities
- React and TailwindCSS communities for excellent documentation
- Mental health professionals who inspired the wellness features
- The student community for feedback and testing

## 📞 Support

For support, email support@mindmate.app or join our community discussions.

## 🎯 Hackathon Deliverables

This prototype demonstrates:
- ✅ Fully functional voice journaling with AI analysis
- ✅ Anonymous peer support with AI moderation
- ✅ Gamified resilience point system
- ✅ Multi-modal AI integration
- ✅ Google authentication ready
- ✅ Discreet mode for privacy
- ✅ Responsive, accessible UI

---

**Built with ❤️ for student mental health and wellness**