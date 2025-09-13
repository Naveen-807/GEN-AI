import React, { useState, useRef } from 'react';

interface VoiceJournalProps {
  onJournalSubmit: (transcript: string, sentiment: string) => void;
}

export const VoiceJournal: React.FC<VoiceJournalProps> = ({ onJournalSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const submitAudio = async () => {
    if (!audioBlob) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    try {
      const response = await fetch('http://localhost:5000/api/voice-journal', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscript(data.transcription);
      onJournalSubmit(data.transcription, data.sentiment);
    } catch (error) {
      console.error('Error submitting audio:', error);
      alert('Error processing your recording. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Voice Journal</h2>
      <p className="text-gray-600 mb-6">Share your thoughts, feelings, and experiences. Your voice matters.</p>
      
      <div className="text-center space-y-4">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            className="bg-gradient-to-r from-wellness-green to-wellness-blue text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🎤 Start Recording
          </button>
        )}

        {isRecording && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="animate-pulse bg-red-500 w-4 h-4 rounded-full"></div>
              <span className="ml-2 text-red-500 font-medium">Recording...</span>
            </div>
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-600 transition-colors"
            >
              ⏹️ Stop Recording
            </button>
          </div>
        )}

        {audioBlob && !loading && (
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setAudioBlob(null);
                  setTranscript('');
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                🔄 Record Again
              </button>
              <button
                onClick={submitAudio}
                className="bg-wellness-green text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                📤 Submit Recording
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-wellness-blue"></div>
            <span className="text-wellness-blue">Processing your voice...</span>
          </div>
        )}

        {transcript && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
            <h3 className="font-medium text-gray-700 mb-2">Transcription:</h3>
            <p className="text-gray-600 italic">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};