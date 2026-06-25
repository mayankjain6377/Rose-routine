import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail } from 'react-icons/md';
import { useApp } from '../context/AppContext';
import { getTimetable } from '../utils/storage';
import PageWrapper from '../components/PageWrapper';

export default function Login() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) { setError('Please enter your name'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email'); return; }
    updateUser({ name: name.trim(), email: email.trim() });
    const timetable = getTimetable();
    navigate(timetable.length > 0 ? '/dashboard' : '/timetable');
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col hero-gradient">
        {/* Header */}
        <div className="flex items-center gap-2 p-6">
          <button onClick={() => navigate('/')} className="text-gray-400 text-xl">←</button>
          <span className="text-lg">🌸</span>
        </div>

        <div className="flex-1 px-6 pt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-primary to-rose-dark flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-primary/30">
                <span className="text-4xl">👋</span>
              </div>
              <h1 className="text-2xl font-black text-gray-800">Welcome Back!</h1>
              <p className="text-gray-400 text-sm mt-1">Let's continue your journey</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Your Name</label>
                <div className="relative">
                  <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    className="input-field pl-11"
                    placeholder="Mayank Jain"
                    value={name}
                    onChange={e => { setName(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Your Email</label>
                <div className="relative">
                  <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    className="input-field pl-11"
                    placeholder="mayankjain@gmail.com"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-primary text-xs font-medium">
                  ⚠️ {error}
                </motion.p>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="btn-primary w-full mt-4"
              >
                Continue →
              </motion.button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
              We'll match your data and get you started.<br />
              <span className="text-rose-primary font-medium">No password needed.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
