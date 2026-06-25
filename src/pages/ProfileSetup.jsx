import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdCameraAlt } from 'react-icons/md';
import { useApp } from '../context/AppContext';
import { getTimetable } from '../utils/storage';
import PageWrapper from '../components/PageWrapper';

const challenges = [
  { id: '7day', label: '⚡ 7 Day Challenge' },
  { id: '21day', label: '🔥 21 Day Challenge' },
  { id: 'custom', label: '🎯 Custom Routine' },
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user, updateUser, settings, updateSettings } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [imgSrc, setImgSrc] = useState(user?.profileImage || '');
  const [challenge, setChallenge] = useState(settings?.challenge || '21day');
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateUser({ name, email, profileImage: imgSrc });
    updateSettings({ challenge });
    const timetable = getTimetable();
    navigate(timetable.length > 0 ? '/dashboard' : '/timetable');
  };

  return (
    <PageWrapper>
      <div className="min-h-screen hero-gradient flex flex-col">
        <div className="flex items-center gap-3 p-6">
          <button onClick={() => navigate(-1)} className="text-gray-400 text-xl">←</button>
          <h1 className="font-bold text-gray-800">Edit Profile</h1>
        </div>

        <div className="px-6 pb-24 space-y-6">
          {/* Profile Image */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center pt-4">
            <div className="relative">
              <div
                className="w-28 h-28 rounded-full border-4 border-rose-primary shadow-lg overflow-hidden cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                {imgSrc ? (
                  <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-primary to-lavender flex items-center justify-center text-4xl font-black text-white">
                    {name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-rose-primary text-white flex items-center justify-center shadow-md"
              >
                <MdCameraAlt className="text-lg" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </div>
          </motion.div>

          {/* Fields */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Full Name</label>
              <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email</label>
              <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
          </motion.div>

          {/* Challenge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <p className="text-sm font-bold text-gray-700 mb-3">Select Your Challenge</p>
            <div className="space-y-2">
              {challenges.map(c => (
                <button
                  key={c.id}
                  onClick={() => setChallenge(c.id)}
                  className={`w-full text-left p-3 rounded-2xl text-sm font-semibold transition-all ${
                    challenge === c.id
                      ? 'bg-rose-primary text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-rose-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="btn-primary w-full"
          >
            Save Profile ✓
          </motion.button>
        </div>
      </div>
    </PageWrapper>
  );
}
