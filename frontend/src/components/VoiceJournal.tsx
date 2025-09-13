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
    <div className="space-y-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative glass p-8 rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Animated background effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neon-teal/5 via-electric-pink/5 to-warm-yellow/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-neon-teal/20 to-electric-pink/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-primary-gradient mb-4"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="inline-block mr-3"
              >
                🎤
              </motion.span>
              Voice Journal
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Share your thoughts, feelings, and experiences in your own voice. 
              <motion.span
                className="text-neon-gradient font-semibold mx-1"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(29, 233, 182, 0.5)",
                    "0 0 20px rgba(29, 233, 182, 0.8)",
                    "0 0 5px rgba(29, 233, 182, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Your voice matters.
              </motion.span>
              ✨
            </motion.p>
          </motion.div>
          
          <div className="text-center space-y-8">
            {/* Enhanced Start Recording Button */}
            <AnimatePresence>
              {!isRecording && !audioBlob && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative"
                >
                  {/* Pulsing rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-neon-teal/30"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                      }}
                    />
                  ))}
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      boxShadow: "0 25px 50px rgba(29, 233, 182, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={startRecording}
                    className="relative w-32 h-32 bg-gradient-to-br from-neon-teal to-electric-pink text-white rounded-full shadow-2xl overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <motion.span
                        className="text-4xl mb-2"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        🎤
                      </motion.span>
                      <span className="text-sm font-semibold">Start</span>
                    </div>
                  </motion.button>
                  
                  <motion.p
                    className="mt-4 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Tap to begin recording your thoughts
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Recording Interface */}
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-8"
                >
                  {/* Recording Status */}
                  <motion.div
                    className="glass rounded-2xl p-6 border border-red-500/30"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(239, 68, 68, 0.2)",
                        "0 0 40px rgba(239, 68, 68, 0.4)",
                        "0 0 20px rgba(239, 68, 68, 0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center justify-center space-x-4">
                      <motion.div 
                        className="w-6 h-6 bg-red-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                      <div className="text-center">
                        <div className="text-red-500 font-bold text-xl">Recording</div>
                        <motion.div 
                          className="text-gray-600 text-2xl font-mono"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          {formatTime(recordingTime)}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Animated Waveform */}
                  <motion.div 
                    className="glass rounded-2xl p-8 border border-neon-teal/30"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(29, 233, 182, 0.2)",
                        "0 0 40px rgba(29, 233, 182, 0.3)",
                        "0 0 20px rgba(29, 233, 182, 0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center justify-center space-x-2 h-24">
                      {audioLevels.map((level, index) => (
                        <motion.div
                          key={index}
                          className="w-3 bg-gradient-to-t from-neon-teal to-electric-pink rounded-full"
                          style={{
                            height: `${Math.max(8, level * 80)}px`,
                          }}
                          animate={{
                            height: `${Math.max(8, level * 80 + Math.random() * 20)}px`,
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            delay: index * 0.05,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                      Listening to your voice...
                    </p>
                  </motion.div>

                  {/* Stop Recording Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopRecording}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <motion.span
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="mr-2"
                    >
                      ⏹️
                    </motion.span>
                    Stop Recording
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Audio Playback */}
            <AnimatePresence>
              {audioBlob && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <motion.div
                    className="glass rounded-2xl p-6 border border-electric-pink/30"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255, 110, 199, 0.2)",
                        "0 0 40px rgba(255, 110, 199, 0.3)",
                        "0 0 20px rgba(255, 110, 199, 0.2)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      🎵 Your Recording
                    </h3>
                    <audio 
                      controls 
                      src={URL.createObjectURL(audioBlob)}
                      className="w-full"
                    />
                  </motion.div>

                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={submitAudio}
                      className="bg-gradient-to-r from-neon-teal to-electric-pink text-white px-8 py-3 rounded-2xl font-semibold shadow-lg button-modern"
                    >
                      ✨ Analyze & Submit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setAudioBlob(null);
                        setTranscript('');
                      }}
                      className="glass border border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:border-red-400 hover:text-red-600 transition-colors"
                    >
                      🔄 Re-record
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Loading State */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-6"
                >
                  <motion.div
                    className="glass rounded-2xl p-8 border border-warm-yellow/30"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(252, 207, 49, 0.2)",
                        "0 0 40px rgba(252, 207, 49, 0.4)",
                        "0 0 20px rgba(252, 207, 49, 0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div
                        className="w-16 h-16 border-4 border-neon-teal/30 border-t-neon-teal rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          🤖 AI is analyzing your voice...
                        </h3>
                        <p className="text-gray-600">
                          Processing emotions, extracting insights, and generating personalized feedback
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Recent Journals Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/20"
      >
        <motion.div
          className="flex items-center mb-6"
          whileHover={{ x: 5 }}
        >
          <motion.span
            className="mr-3 text-2xl"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            📖
          </motion.span>
          <h3 className="text-xl font-bold text-gray-800">Recent Journal Entries</h3>
        </motion.div>

        <div className="space-y-4">
          {[
            { date: "Today", preview: "Feeling grateful for the progress I've made...", mood: "😊" },
            { date: "Yesterday", preview: "Had some challenges but learning to cope...", mood: "😐" },
            { date: "2 days ago", preview: "Excited about new opportunities ahead...", mood: "😄" },
          ].map((entry, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4 border border-white/20 hover:border-neon-teal/30 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02, x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{entry.mood}</span>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-gray-700">{entry.preview}</p>
                </div>
                <motion.div
                  className="text-neon-teal"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};