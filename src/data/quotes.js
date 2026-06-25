export const quotes = [
  { text: "Small progress is still progress.", author: "Unknown" },
  { text: "Consistency beats motivation every single day.", author: "James Clear" },
  { text: "You become what you repeat.", author: "Unknown" },
  { text: "Success is built daily, not overnight.", author: "Unknown" },
  { text: "Your routine is your identity in action.", author: "Unknown" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Discipline is just choosing between what you want now and what you want most.", author: "Unknown" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Every habit starts with a tiny decision.", author: "James Clear" },
  { text: "You don't rise to the level of your goals, you fall to the level of your systems.", author: "James Clear" },
  { text: "One day or day one. You decide.", author: "Unknown" },
  { text: "Take care of your habits and your habits will take care of you.", author: "Unknown" },
  { text: "A little progress each day adds up to big results.", author: "Satya Nani" },
  { text: "The way you do anything is the way you do everything.", author: "Unknown" },
  { text: "Routine brings freedom. Chaos steals time.", author: "Unknown" },
  { text: "Your future self is watching. Make them proud.", author: "Unknown" },
  { text: "Focus on the process. The results will follow.", author: "Unknown" },
  { text: "Begin. The rest is easy.", author: "Unknown" },
  { text: "Good things take time. Great things take consistency.", author: "Unknown" },
  { text: "Every morning is a fresh start. Use it.", author: "Unknown" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "Build the life you want, one day at a time.", author: "Unknown" },
  { text: "Energy flows where attention goes.", author: "Unknown" },
  { text: "Rest is part of the process, not a pause from it.", author: "Unknown" },
  { text: "What you do today shapes who you are tomorrow.", author: "Unknown" },
  { text: "Track it, or it didn't happen.", author: "Unknown" },
  { text: "The morning sets the tone. Win it.", author: "Unknown" },
  { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },
  { text: "Do it now. Future you will thank present you.", author: "Unknown" },
  { text: "Tiny actions. Massive results. Just give it time.", author: "Unknown" },
];

export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 20) return "Good evening";
  return "Good night";
};
