import React, { useState, useEffect } from 'react';

interface PeerGroup {
  id: number;
  name: string;
  members: number;
  topic: string;
}

export const PeerSupport: React.FC = () => {
  const [groups, setGroups] = useState<PeerGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<PeerGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Array<{id: number, user: string, message: string, time: string}>>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/peer-groups');
        const data = await response.json();
        setGroups(data.groups);
      } catch (error) {
        console.error('Error fetching peer groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const joinGroup = (group: PeerGroup) => {
    setSelectedGroup(group);
    // Simulate some existing messages
    setMessages([
      { id: 1, user: 'Anonymous Student', message: 'Anyone else feeling overwhelmed with upcoming exams?', time: '2 hours ago' },
      { id: 2, user: 'Study Buddy', message: 'Yes! I find breaking down topics into smaller chunks helps. What subjects are you worried about?', time: '1 hour ago' },
      { id: 3, user: 'Mindful Learner', message: 'Remember to take breaks! Your mental health is just as important as grades. 💚', time: '45 minutes ago' }
    ]);
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: 'Just now'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>;
  }

  if (selectedGroup) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-96">
        <div className="bg-gradient-to-r from-wellness-purple to-wellness-blue text-white p-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{selectedGroup.name}</h3>
              <p className="text-sm opacity-90">{selectedGroup.members} members online</p>
            </div>
            <button
              onClick={() => setSelectedGroup(null)}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
        
        <div className="flex flex-col h-80">
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`${msg.user === 'You' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-xs p-3 rounded-lg ${
                  msg.user === 'You' 
                    ? 'bg-wellness-blue text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.user} • {msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Share your thoughts (anonymous)..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wellness-blue"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-wellness-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Peer Support Groups</h2>
      <p className="text-gray-600 mb-6">Connect with others who understand your journey. All conversations are anonymous and moderated by AI for safety.</p>
      
      <div className="grid gap-4">
        {groups.map((group) => (
          <div 
            key={group.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-wellness-blue hover:shadow-md transition-all cursor-pointer"
            onClick={() => joinGroup(group)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{group.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Topic: {group.topic.replace('-', ' ')}</p>
              </div>
              <div className="text-right">
                <span className="bg-wellness-green/10 text-wellness-green px-2 py-1 rounded-full text-xs">
                  {group.members} members
                </span>
              </div>
            </div>
            <button className="mt-3 bg-wellness-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Join Discussion
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};