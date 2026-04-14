import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/SoundManager';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

const Room5Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: '60px 40px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
            <div style={{ fontSize: '10px', color: 'var(--gray)', letterSpacing: '4px', position: 'absolute', top: '60px', left: '40px' }}>SECTOR 5 // TRUE LAB SAVE POINT</div>

            <motion.div
                animate={{ rotate: 360, filter: ['drop-shadow(0 0 10px var(--yellow))', 'drop-shadow(0 0 30px var(--yellow))', 'drop-shadow(0 0 10px var(--yellow))'] }}
                transition={{ rotate: { repeat: Infinity, duration: 6, ease: 'linear' }, filter: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
                style={{ fontSize: '64px', color: 'var(--yellow)', marginBottom: '40px', cursor: 'none' }}
                onClick={() => playSound('save')}
            >
                ★
            </motion.div>

            <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '600px' }}>
                <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '16px', animation: 'flicker 3s infinite' }}>* You feel your sins crawling on your back.</p>
                <p style={{ fontSize: '14px', color: 'var(--white)' }}>* But MARIA spares you from searching elsewhere.</p>
                <p style={{ fontSize: '10px', color: 'var(--soul)', marginTop: '24px' }}>* ( File 1 Saved )</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="mailto:rasmusmaria26@gmail.com" className="battle-btn mercy" style={{ borderColor: 'var(--blue)' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>
                    <Mail size={16} /> EMAIL
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="battle-btn mercy" style={{ borderColor: 'var(--blue)' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>
                    <Linkedin size={16} /> LINKEDIN
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="battle-btn mercy" style={{ borderColor: 'var(--blue)' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>
                    <Github size={16} /> GITHUB
                </a>
                <a href="tel:7010378334" className="battle-btn mercy" style={{ borderColor: 'var(--blue)' }} onMouseEnter={() => playSound('hover')} onClick={() => playSound('select')}>
                    <Phone size={16} /> PHONE
                </a>
            </div>

            <style>{`
        .mercy:hover {
          background: var(--blue) !important;
          color: var(--black) !important;
          box-shadow: none !important;
          transform: translate(4px, 4px);
        }
      `}</style>
        </motion.div>
    );
};

export default Room5Contact;
