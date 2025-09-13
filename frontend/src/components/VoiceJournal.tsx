import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface VoiceJournalProps {
  onJournalSubmit: (transcript: string, sentiment: string) => void;
}

export const VoiceJournal: React.FC<VoiceJournalProps> = ({ onJournalSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Animated waveform effect
  useEffect(() => {
    if (isRecording && analyserRef.current) {
      const updateWaveform = () => {
        const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount);
        analyserRef.current!.getByteFrequencyData(dataArray);
        
        const levels = [];
        for (let i = 0; i < 20; i++) {
          const index = Math.floor((i / 20) * dataArray.length);
          levels.push(dataArray[index] / 255);
        }
        setAudioLevels(levels);
        
        if (isRecording) {
          requestAnimationFrame(updateWaveform);
        }
      };
      updateWaveform();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio analysis
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const submitAudio = async () => {
    if (!audioBlob) return;

    setLoading(true);
    
    // Simulate API call for demo
    setTimeout(() => {
      const mockTranscript = "Today I'm feeling grateful for the progress I've made. I've been working on my mindfulness practice and it's really helping me manage stress better.";
      setTranscript(mockTranscript);
      onJournalSubmit(mockTranscript, "positive");
      setLoading(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 hover-lift"
    >
      <motion.h2 
        className="text-2xl font-bold text-primary-gradient mb-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        Voice Journal
      </motion.h2>
      <motion.p 
        className="text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        Share your thoughts, feelings, and experiences. Your voice matters. ✨
      </motion.p>
      
      <div className="text-center space-y-6">
        {/* Start Recording Button */}
        <AnimatePresence>
          {!isRecording && !audioBlob && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="relative bg-primary-gradient text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg button-modern overflow-hidden"
            >
              <motion.span
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎤
              </motion.span>
              <span className="ml-2">Start Recording</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Recording Interface */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-6"
            >
              {/* Recording Indicator */}
              <div className="flex items-center justify-center space-x-3">
                <motion.div 
                  className="w-4 h-4 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-red-500 font-medium">Recording</span>
                <span className="text-gray-600">{formatTime(recordingTime)}</span>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center justify-center space-x-1 h-16">
                {audioLevels.map((level, index) => (
                  <motion.div
                    key={index}
                    className="wave-bar bg-gradient-to-t from-neon-teal to-electric-pink rounded-full"
                    style={{
                      height: `${8 + level * 32}px`,
                      width: '4px',
                    }}
                    animate={{
                      scaleY: [1, 1 + level, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Stop Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopRecording}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover-glow"
              >
                ⏹️ Stop Recording
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio Preview & Submit */}
        <AnimatePresence>
          {audioBlob && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAudioBlob(null);
                    setTranscript('');
                    setRecordingTime(0);
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors button-modern"
                >
                  🔄 Record Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submitAudio}
                  className="bg-gradient-to-r from-neon-teal to-electric-pink text-white px-6 py-3 rounded-lg shadow-lg button-modern"
                >
                  <span className="flex items-center space-x-2">
                    <span>📤</span>
                    <span>Submit Recording</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-6 h-6 border-2 border-neon-teal border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-neon-teal font-medium">Processing your voice...</span>
              </div>
              
              {/* Processing Animation */}
              <div className="flex space-x-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-electric-pink rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 glass rounded-xl border border-white/30"
            >
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">📝</span>
                Transcription:
              </h3>
              <motion.p 
                className="text-gray-600 italic leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                "{transcript}"
              </motion.p>
              
              {/* Success Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                <span>✅</span>
                <span>Journal entry processed successfully!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};