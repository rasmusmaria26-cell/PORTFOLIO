import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from './utils/SoundManager';
import SoulHeart from './components/SoulHeart';

// Room Imports
import Room1Entry from './screens/Room1Entry';
import Room2About from './screens/Room2About';
import Room3Skills from './screens/Room3Skills';
import Room4Projects from './screens/Room4Projects';
import Room5Contact from './screens/Room5Contact';

const ROOMS = [
  { id: 0, component: Room1Entry },
  { id: 1, component: Room2About },
  { id: 2, component: Room3Skills },
  { id: 3, component: Room4Projects },
  { id: 4, component: Room5Contact },
];

function App() {
  const [currentRoom, setCurrentRoom] = useState(0);

  const goToRoom = useCallback((index) => {
    if (index >= 0 && index < ROOMS.length && index !== currentRoom) {
      playSound('select');
      setCurrentRoom(index);
    }
  }, [currentRoom]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToRoom(currentRoom + 1);
      } else if (e.key === 'ArrowLeft') {
        goToRoom(currentRoom - 1);
      } else if (e.key === 'Escape') {
        if (currentRoom !== 0) goToRoom(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoom, goToRoom]);

  const CurrentRoomComponent = ROOMS[currentRoom].component;

  return (
    <div className="app-container">
      <div className="crt-overlay" />
      <div className="noise-overlay" />
      <SoulHeart />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoom}
          initial={{ opacity: 0, filter: 'brightness(3) contrast(2)' }}
          animate={{ opacity: 1, filter: 'brightness(1) contrast(1)' }}
          exit={{ opacity: 0, filter: 'brightness(3)' }}
          transition={{ duration: 0.2 }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <CurrentRoomComponent goToRoom={goToRoom} />
        </motion.div>
      </AnimatePresence>

      {/* White Flash Transition Overlay */}
      <AnimatePresence>
        <motion.div
          key={`flash-${currentRoom}`}
          initial={{ opacity: 1, backgroundColor: 'white' }}
          animate={{ opacity: 0, backgroundColor: 'white' }}
          transition={{ duration: 0.3 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
        />
      </AnimatePresence>

      {/* Room Indicator Dots */}
      <div className="room-indicators">
        {ROOMS.map((_, idx) => (
          <div
            key={idx}
            className={`room-dot ${currentRoom === idx ? 'active' : ''}`}
            onClick={() => goToRoom(idx)}
            onMouseEnter={() => playSound('hover')}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
