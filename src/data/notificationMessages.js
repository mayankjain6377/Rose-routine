// Smart notification messages per task keyword/category
// Each array has 7+ messages so no repeat for 7 days

export const notificationMessages = {
  // === STUDY / READING / LEARNING ===
  study: [
    { title: "📚 Study Time!", body: "It's time to study. Small sessions = big results. Open your books!" },
    { title: "🎯 Focus Mode ON", body: "Your study session starts now. Put your phone down and level up!" },
    { title: "🧠 Brain Time", body: "Consistency beats cramming. Show up for today's study session!" },
    { title: "📖 Knowledge Awaits", body: "Every page you read today is an investment in your future self." },
    { title: "✏️ Study Session", body: "The best time to study was yesterday. The next best time is NOW!" },
    { title: "💡 Learn Something New", body: "Your study session is starting. Remember: progress, not perfection." },
    { title: "🎓 Study Alert", body: "Successful people study daily. Today's session is waiting for you!" },
    { title: "📝 Time to Learn", body: "Close Instagram, open your notes. Future you will say thank you!" },
  ],

  reading: [
    { title: "📖 Reading Time", body: "15 pages a day keeps ignorance away. Time to read!" },
    { title: "📚 Book Time", body: "The world's most successful people read daily. Your turn!" },
    { title: "🌟 Reading Session", body: "A good book is waiting for you. Even 10 minutes counts!" },
    { title: "📗 Read & Grow", body: "Readers are leaders. Your reading session starts now!" },
    { title: "🔖 Page Turner Time", body: "Pick up your book — each page makes you a little wiser." },
    { title: "📕 Story Time", body: "Reading reduces stress by 68%. Your calm awaits!" },
    { title: "📘 Time to Read", body: "Every book you finish is a win. Let's add one more chapter today!" },
    { title: "🌙 Evening Read", body: "Wind down with a good book. Your reading session is now!" },
  ],

  // === FITNESS / WORKOUT / EXERCISE ===
  workout: [
    { title: "💪 Workout Time!", body: "Fitness is not a destination, it's a lifestyle. Let's go!" },
    { title: "🏋️ Time to Sweat", body: "Your body can do it. It's your mind you need to convince. Move!" },
    { title: "🔥 Burn It!", body: "Every rep counts. Every drop of sweat is building a better you!" },
    { title: "⚡ Energy Time", body: "Workout first, feel amazing the rest of the day. Starting now!" },
    { title: "🏃 Get Moving!", body: "Fitness is important — 30 minutes now, energy all day long!" },
    { title: "💥 Beast Mode", body: "You promised yourself you'd workout. Honor that promise. Go!" },
    { title: "🎽 Gym Time", body: "Your muscles are waiting. No excuses — just results!" },
    { title: "🧘 Move Your Body", body: "Exercise is a celebration of what your body can do. Celebrate!" },
  ],

  exercise: [
    { title: "🏃 Exercise Time", body: "Your daily exercise session starts now. Fitness is important!" },
    { title: "💪 Move It!", body: "One workout won't change your body, but it will change your mood!" },
    { title: "🌟 Active Time", body: "Exercise is medicine. Your daily dose is due right now!" },
    { title: "⚡ Power Hour", body: "Stronger every single day. Your exercise session is now!" },
    { title: "🔥 Fitness First", body: "Show up for your workout — even 20 minutes changes everything!" },
    { title: "🏆 Champion Mode", body: "Champions train daily. Time to earn your title!" },
    { title: "🎯 Health Goal", body: "Your future self will thank you for this workout. Start now!" },
    { title: "💥 Let's Go!", body: "No regrets at night for the workout you do NOW. Move!" },
  ],

  yoga: [
    { title: "🧘 Yoga Time", body: "Breathe in peace, breathe out tension. Yoga session starting now!" },
    { title: "🌸 Mind & Body", body: "Yoga is the journey of the self. Roll out your mat!" },
    { title: "✨ Flow Time", body: "Stretch, breathe, release. Your yoga session starts now!" },
    { title: "🕊️ Peace Time", body: "Find your flow. Yoga session beginning — namaste!" },
    { title: "🌿 Align & Breathe", body: "Your yoga session is here. Mind, body, and soul need this!" },
    { title: "💫 Stretch & Glow", body: "Even 15 minutes of yoga changes your entire day. Start!" },
    { title: "🌊 Flow & Grow", body: "Flexibility isn't just physical. Yoga time — let's flow!" },
    { title: "🙏 Namaste Time", body: "Roll your mat, clear your mind. Your yoga session awaits!" },
  ],

  // === FOOD / MEALS ===
  breakfast: [
    { title: "🍳 Breakfast Time!", body: "Food is a necessity — fuel your morning right. Eat breakfast!" },
    { title: "☀️ Morning Fuel", body: "Breakfast is the most important meal. Your body needs it now!" },
    { title: "🥗 Start Strong", body: "A good breakfast = a productive day. Time to eat something healthy!" },
    { title: "🍞 Fuel Up!", body: "Don't skip breakfast! Food is the necessity — take care of yourself." },
    { title: "🥣 Morning Meal", body: "Your brain runs on glucose. Breakfast time — feed your focus!" },
    { title: "🌟 Eat to Succeed", body: "Champions eat breakfast. Fuel up for an amazing day ahead!" },
    { title: "☕ Rise & Eat", body: "Coffee + breakfast = morning done right. Time to eat!" },
    { title: "🍌 Healthy Start", body: "One nutritious breakfast can change your whole morning. Eat now!" },
  ],

  lunch: [
    { title: "🍱 Lunch Break!", body: "Food is a necessity — your midday fuel is due. Eat well!" },
    { title: "🌮 Lunch Time", body: "Step away from work and nourish your body. Lunch time!" },
    { title: "🥘 Midday Meal", body: "Don't skip lunch. A well-fed mind is a productive mind!" },
    { title: "🍽️ Time to Eat", body: "Food is the foundation of everything. Your lunch break is now!" },
    { title: "🥗 Healthy Lunch", body: "What you eat at lunch fuels your afternoon. Choose wisely!" },
    { title: "🍜 Eat Up!", body: "Even 20 minutes for lunch matters. Food is a necessity — eat!" },
    { title: "🌯 Lunch Alert", body: "Your body is asking for fuel. Lunch time — don't ignore it!" },
    { title: "🥙 Break Time", body: "Take a real lunch break today. Eat, rest, recharge, repeat." },
  ],

  dinner: [
    { title: "🍛 Dinner Time!", body: "Food is a necessity — end your day with a good meal. Eat!" },
    { title: "🌙 Evening Meal", body: "Dinner time! Nourish your body after a long day of work." },
    { title: "🍲 Time to Eat", body: "A healthy dinner = better sleep. Don't skip your evening meal!" },
    { title: "🍽️ Dinner Alert", body: "Your body needs fuel to recover overnight. Dinner is ready!" },
    { title: "🌮 Evening Fuel", body: "Eat dinner on time — your body and sleep will thank you!" },
    { title: "🥘 Nourish Time", body: "Food is the necessity of life. Sit down and enjoy your dinner!" },
    { title: "🍜 Family Time", body: "Dinner time — eat well, rest well, live well!" },
    { title: "🫕 End-Day Meal", body: "Complete your nutrition for the day. Dinner time is now!" },
  ],

  // === MORNING / WAKE UP ===
  wake: [
    { title: "☀️ Rise & Shine!", body: "Good morning! The most productive people wake up early. You're one of them!" },
    { title: "🌅 Morning Alert", body: "Today is a new opportunity. Wake up and make the most of it!" },
    { title: "⏰ Time to Wake Up", body: "You planned to wake up now. Honor your commitment — rise!" },
    { title: "🌸 Good Morning!", body: "Every morning is a fresh start. Get up and own this day!" },
    { title: "⚡ Rise Up!", body: "Successful people wake up at this hour. You're on the right track!" },
    { title: "🎯 Morning Mode", body: "Win the morning, win the day. Time to rise and shine!" },
    { title: "☕ Wake Up Call", body: "The world is quiet and yours right now. Rise up!" },
    { title: "💫 New Day Alert", body: "Today holds unlimited potential. Start by waking up NOW!" },
  ],

  // === BATH / GROOMING / HYGIENE ===
  bath: [
    { title: "🚿 Freshness Time!", body: "A fresh shower = a fresh mindset. Time to feel great!" },
    { title: "✨ Refresh Time", body: "Take care of yourself — your shower session starts now!" },
    { title: "💦 Clean Up Time", body: "Self-care is self-respect. Your bath/shower time is now!" },
    { title: "🛁 Glow Up Time", body: "Feeling clean = feeling confident. Shower time!" },
    { title: "🌊 Refresh Alert", body: "Start clean, think clean. Your grooming session is now!" },
    { title: "🧼 Hygiene Time", body: "A 10-minute shower can refresh your entire mood. Go now!" },
    { title: "💧 Freshen Up", body: "Take care of your body — it's the only one you have. Shower time!" },
    { title: "🌸 Self-Care Moment", body: "You deserve to feel fresh and clean. Bath time is now!" },
  ],

  // === MEDITATION / MINDFULNESS ===
  meditation: [
    { title: "🧘 Meditate Now", body: "5 minutes of meditation = 5 hours of clarity. Start now!" },
    { title: "🌿 Mindful Moment", body: "Breathe in... breathe out. Your meditation session starts now!" },
    { title: "☮️ Peace Time", body: "The mind is everything. Meditate for a calmer, clearer you!" },
    { title: "🕊️ Calm Time", body: "Silence your thoughts for a few minutes. Meditation time!" },
    { title: "✨ Center Yourself", body: "In the rush of life, take a pause. Meditation session now!" },
    { title: "🌙 Still Time", body: "Meditate daily — it's the reset button your brain needs!" },
    { title: "💫 Inner Peace", body: "Anxiety decreases with meditation. Your calm session starts now!" },
    { title: "🌸 Breathe Deep", body: "Just breathe. Your meditation time is here — use it!" },
  ],

  // === WORK / OFFICE ===
  work: [
    { title: "💼 Work Time!", body: "Deep work time — focus, execute, deliver. You've got this!" },
    { title: "🎯 Focus Hour", body: "Your most important work happens in focused blocks. Start now!" },
    { title: "💻 Work Session", body: "Time to build something great. Shut distractions, open work!" },
    { title: "⚡ Productive Time", body: "Energy is high now. Use it — your work session starts!" },
    { title: "🏆 Make Progress", body: "Every task you complete today builds tomorrow's success. Work!" },
    { title: "📊 Office Time", body: "Show up for your goals today. Work session is starting!" },
    { title: "🔥 Build Time", body: "Great things are built one focused session at a time. Go!" },
    { title: "🚀 Launch Mode", body: "Less scrolling, more doing. Your work time starts NOW!" },
  ],

  // === SLEEP / REST ===
  sleep: [
    { title: "🌙 Sleep Time", body: "Sleep is productivity for tomorrow. Wind down and rest now!" },
    { title: "💤 Rest Time", body: "8 hours of sleep = 8 hours of recovery. Time to sleep!" },
    { title: "🌟 Recovery Time", body: "Your body heals while you sleep. Bedtime is now — honor it!" },
    { title: "😴 Power Down", body: "Tomorrow needs a rested you. Put the phone down and sleep!" },
    { title: "🌙 Night Mode", body: "Sleep is the best meditation. Lights out — rest time!" },
    { title: "✨ Dream Time", body: "Champions prioritize sleep. Your rest session starts now!" },
    { title: "🛏️ Bedtime", body: "A good night's sleep makes tomorrow amazing. Sleep now!" },
    { title: "🌛 Rest Well", body: "The day is done. You did great. Now sleep and recharge!" },
  ],

  // === CODING / TECH ===
  coding: [
    { title: "💻 Code Time!", body: "Time to write some beautiful code. Build something amazing!" },
    { title: "⌨️ Dev Session", body: "One commit at a time. Your coding session starts now!" },
    { title: "🚀 Build Time", body: "Ship it! Your development session is starting — open your IDE!" },
    { title: "🔧 Debug & Build", body: "Great software is written in focused sessions. Start now!" },
    { title: "💡 Coding Hour", body: "Every line of code you write today = skills for tomorrow!" },
    { title: "🎯 Dev Mode ON", body: "Stack Overflow is waiting, your code is calling. Code time!" },
    { title: "⚡ Tech Time", body: "Build the things you wish existed. Coding session now!" },
    { title: "🏗️ Create Mode", body: "From ideas to reality — one function at a time. Code on!" },
  ],

  // === MUSIC / PRACTICE ===
  music: [
    { title: "🎵 Music Time!", body: "Practice makes permanent. Time for your music session!" },
    { title: "🎸 Play Time", body: "The best musicians practice daily. Your session starts now!" },
    { title: "🎹 Melody Time", body: "Create something beautiful today. Music session is starting!" },
    { title: "🎶 Tune Time", body: "20 minutes of practice every day = mastery in 2 years. Go!" },
    { title: "🎤 Perform!", body: "Your music session awaits. Pick up your instrument and play!" },
    { title: "🥁 Rhythm Time", body: "Every great musician was once a beginner who kept practicing!" },
    { title: "🎺 Practice Now", body: "Music is therapy. Your practice session starts right now!" },
    { title: "🎻 Art Time", body: "Play your heart out — your music session is now!" },
  ],

  // === WALKING / RUNNING ===
  walk: [
    { title: "🚶 Walk Time!", body: "10,000 steps a day keeps the doctor away. Start walking!" },
    { title: "🌿 Outdoor Time", body: "Fresh air + movement = instant mood boost. Walk time!" },
    { title: "👟 Step Up!", body: "A 20-minute walk clears your mind like nothing else. Go!" },
    { title: "🏃 Move Time", body: "Walking is free therapy. Your walk session starts now!" },
    { title: "🌤️ Stroll Time", body: "Disconnect from screens, connect with yourself. Walk time!" },
    { title: "⚡ Active Alert", body: "Your daily walk keeps you healthy and happy. Go outside!" },
    { title: "🌳 Nature Time", body: "Every step counts. Lace up and start walking — now!" },
    { title: "💫 Movement Time", body: "Walking boosts creativity by 81%. Get those steps in!" },
  ],

  // === DEFAULT / GENERIC ===
  default: [
    { title: "⏰ Task Reminder", body: "It's time for your scheduled task. Stay on track!" },
    { title: "🌸 Routine Alert", body: "Your timetable says it's time. Keep your streak alive!" },
    { title: "🎯 Time Check", body: "Your task is starting now. You planned this — do it!" },
    { title: "⚡ Action Time", body: "Consistency is your superpower. Time for your next task!" },
    { title: "💪 Stay on Track", body: "Your routine is your identity. This task is important!" },
    { title: "✨ Habit Alert", body: "Every time you follow through, you build trust with yourself!" },
    { title: "🔔 Task Time", body: "You set this reminder for a reason. Honor your commitment!" },
    { title: "🚀 Let's Go!", body: "Small actions daily = massive results yearly. Do this task!" },
  ],
};

// Map keywords to message categories
export const getMessagesForTask = (taskName) => {
  const name = taskName.toLowerCase();

  if (name.includes('study') || name.includes('class') || name.includes('homework') || name.includes('assignment')) return notificationMessages.study;
  if (name.includes('read') || name.includes('book')) return notificationMessages.reading;
  if (name.includes('workout') || name.includes('gym') || name.includes('lift') || name.includes('weight')) return notificationMessages.workout;
  if (name.includes('exercise') || name.includes('cardio') || name.includes('training')) return notificationMessages.exercise;
  if (name.includes('yoga') || name.includes('stretch') || name.includes('pilates')) return notificationMessages.yoga;
  if (name.includes('walk') || name.includes('jog') || name.includes('run') || name.includes('steps')) return notificationMessages.walk;
  if (name.includes('breakfast') || name.includes('morning meal')) return notificationMessages.breakfast;
  if (name.includes('lunch') || name.includes('afternoon meal')) return notificationMessages.lunch;
  if (name.includes('dinner') || name.includes('supper') || name.includes('evening meal')) return notificationMessages.dinner;
  if (name.includes('eat') || name.includes('food') || name.includes('meal') || name.includes('snack')) return notificationMessages.lunch;
  if (name.includes('bath') || name.includes('shower') || name.includes('wash') || name.includes('groom')) return notificationMessages.bath;
  if (name.includes('meditat') || name.includes('mindful') || name.includes('breathe') || name.includes('calm')) return notificationMessages.meditation;
  if (name.includes('work') || name.includes('office') || name.includes('job') || name.includes('meeting')) return notificationMessages.work;
  if (name.includes('sleep') || name.includes('bed') || name.includes('rest') || name.includes('nap')) return notificationMessages.sleep;
  if (name.includes('wake') || name.includes('rise') || name.includes('morning')) return notificationMessages.wake;
  if (name.includes('code') || name.includes('program') || name.includes('develop') || name.includes('debug')) return notificationMessages.coding;
  if (name.includes('music') || name.includes('guitar') || name.includes('piano') || name.includes('sing') || name.includes('practice')) return notificationMessages.music;

  return notificationMessages.default;
};

// Get a message index that hasn't been used in the last 7 days for this task
export const getSmartMessageIndex = (taskId, messages) => {
  const storageKey = `rr_notif_history_${taskId}`;
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch { history = []; }

  // Find an index not used in last 7 uses
  const usedRecently = new Set(history.slice(-7));
  const available = messages.map((_, i) => i).filter(i => !usedRecently.has(i));

  const chosenIndex = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : Math.floor(Math.random() * messages.length);

  // Save to history
  history.push(chosenIndex);
  if (history.length > 14) history = history.slice(-14); // keep last 14
  localStorage.setItem(storageKey, JSON.stringify(history));

  return chosenIndex;
};
