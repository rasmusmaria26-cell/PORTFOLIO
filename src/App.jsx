import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Heart } from 'lucide-react';
import SoulHeart from './components/SoulHeart';
import DialogueBox from './components/DialogueBox';
import StatsGrid from './components/StatsGrid';
import SkillSection from './components/SkillSection';
import ProjectGrid from './components/ProjectGrid';
import SpritePlayer from './components/SpritePlayer';
import { playSound } from './utils/SoundManager';

function App() {
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveNav(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <div className="portfolio-app">
      <div className="crt-overlay" />
      <SoulHeart />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--black)',
        borderBottom: '3px solid var(--white)',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--soul)', fontSize: '10px' }}>
          <Heart size={14} fill="currentColor" style={{ animation: 'soul-pulse 1.5s infinite' }} />
          MARIA RASMUS R
        </div>
        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none' }}>
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => playSound('select')}
                style={{
                  color: activeNav === link.id ? 'var(--yellow)' : 'var(--white)',
                  textDecoration: 'none',
                  fontSize: '9px',
                  position: 'relative'
                }}
              >
                {activeNav === link.id && <span style={{ color: 'var(--soul)' }}>* </span>}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="encounter-box"
        >
          <div className="enemy-sprite" style={{ marginBottom: '24px' }}>
            <SpritePlayer size={120} frameX={0} frameY={1} />
          </div>
          <h2 style={{ fontSize: '22px', marginBottom: '8px', textShadow: '3px 3px 0 var(--soul-dim)' }}>MARIA RASMUS R</h2>
          <div style={{ color: 'var(--yellow)', fontSize: '9px', marginBottom: '4px' }}>⭐ CS UNDERGRADUATE LV 12</div>
          <div className="blink" style={{ color: 'var(--gray)', fontSize: '11px', marginBottom: '32px' }}>* A WILD DEVELOPER APPEARED!</div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#projects" className="px-border" style={{ padding: '14px 22px', textDecoration: 'none', color: 'white', backgroundColor: 'black' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>⚔ PROJECTS</a>
            <a href="#about" className="px-border" style={{ padding: '14px 22px', textDecoration: 'none', color: '#ffdd00', backgroundColor: 'black' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>💬 ABOUT</a>
            <a href="#skills" className="px-border" style={{ padding: '14px 22px', textDecoration: 'none', color: '#20ff60', backgroundColor: 'black' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>📦 SKILLS</a>
            <a href="#contact" className="px-border" style={{ padding: '14px 22px', textDecoration: 'none', color: '#4080ff', backgroundColor: 'black' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>🤍 CONTACT</a>
          </div>
        </motion.div>

        <div style={{ marginTop: '40px' }}>
          <div style={{ fontSize: '9px', color: 'var(--gray)', marginBottom: '6px' }}>HP</div>
          <div style={{ width: '240px', height: '18px', background: 'var(--darkgray)', border: '3px solid var(--white)', margin: '0 auto', overflow: 'hidden' }}>
            <motion.div
              animate={{ filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ height: '100%', background: 'var(--yellow)', width: '76.5%' }}
            />
          </div>
          <div style={{ fontSize: '8px', color: 'var(--white)', marginTop: '6px' }}>7.65 / 10.0</div>
        </div>
      </section>

      <hr className="px-divider" />

      {/* ABOUT SECTION */}
      <section id="about">
        <div className="section-header"><span>*</span> ABOUT ME</div>
        <DialogueBox text="* You encountered Maria. * A CS undergrad focused on practical applications. * She loves building scalable and secure systems." />
        <StatsGrid />
      </section>

      <hr className="px-divider" />

      {/* SKILLS SECTION */}
      <section id="skills">
        <div className="section-header"><span>*</span> ITEMS / SKILLS</div>
        <SkillSection />
      </section>

      <hr className="px-divider" />

      {/* PROJECTS SECTION */}
      <section id="projects">
        <div className="section-header"><span>*</span> FIGHT / PROJECTS</div>
        <ProjectGrid />
      </section>

      <hr className="px-divider" />

      {/* CONTACT SECTION */}
      <section id="contact" style={{ textAlign: 'center' }}>
        <div className="section-header"><span>*</span> MERCY / CONTACT</div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontSize: '4rem', color: '#ffff00', marginBottom: '40px' }}
          onClick={() => playSound('save')}
        >
          ★
        </motion.div>
        <p style={{ color: 'var(--blue)', marginBottom: '32px' }}>* Your soul feels at peace. (Game Saved)</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:your-email@example.com" className="px-border" style={{ padding: '14px 20px', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={16} /> EMAIL
          </a>
          <a href="https://github.com/your-username" target="_blank" className="px-border" style={{ padding: '14px 20px', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Github size={16} /> GITHUB
          </a>
        </div>
      </section>

      <footer style={{ borderTop: '3px solid white', textAlign: 'center', padding: '24px', fontSize: '8px', color: 'var(--gray)' }}>
        DESIGNED BY <span>MARIA</span> | POWERED BY <span>DETERMINATION</span>
      </footer>

      <style>{`
        .portfolio-app {
          position: relative;
        }
        .px-border:hover {
          background-color: var(--white) !important;
          color: var(--black) !important;
          box-shadow: none;
          transform: translate(4px, 4px);
        }
      `}</style>
    </div>
  );
}

export default App;
