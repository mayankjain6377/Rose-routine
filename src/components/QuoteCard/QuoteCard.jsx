import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function QuoteCard({ quote }) {
  if (!quote) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(231,84,128,0.13) 0%, rgba(200,162,255,0.10) 100%)' }}
    >
      <FaQuoteLeft className="text-rose-primary/30 text-2xl absolute top-3 left-4" />
      <p className="text-gray-700 font-medium text-sm leading-relaxed px-6 text-center italic">
        {quote.text}
      </p>
      <FaQuoteRight className="text-rose-primary/30 text-2xl absolute bottom-3 right-4" />
      {quote.author && quote.author !== 'Unknown' && (
        <p className="text-rose-primary text-xs font-semibold text-center mt-2">— {quote.author}</p>
      )}
    </motion.div>
  );
}
