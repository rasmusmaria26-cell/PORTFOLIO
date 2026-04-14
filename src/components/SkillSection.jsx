import React from 'react';
import { motion } from 'framer-motion';

const SkillRow = ({ name, percent, color, lv }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{ width: '160px', fontSize: '10px', color: 'var(--white)', flexShrink: 0 }}>{name}</div>
        <div style={{ flex: 1, height: '14px', background: 'var(--darkgray)', border: '2px solid var(--white)', overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', backgroundColor: color }}
            />
        </div>
        <div style={{ fontSize: '8px', color: 'var(--gray)', width: '40px', textAlign: 'right', flexShrink: 0 }}>LV {lv}</div>
    </div>
);

const SkillSection = () => {
    const attackSkills = [
        { name: 'Java', percent: 90, color: 'var(--green)', lv: 9 },
        { name: 'C++', percent: 85, color: 'var(--green)', lv: 8 },
        { name: 'Python', percent: 80, color: 'var(--green)', lv: 8 },
        { name: 'JavaScript', percent: 88, color: 'var(--green)', lv: 8 },
        { name: 'C#', percent: 75, color: 'var(--green)', lv: 7 },
    ];

    const defenseSkills = [
        { name: 'Node.js', percent: 85, color: 'var(--blue)', lv: 8 },
        { name: 'Firebase', percent: 80, color: 'var(--blue)', lv: 8 },
        { name: 'Android Studio', percent: 75, color: 'var(--blue)', lv: 7 },
        { name: 'Unity', percent: 70, color: 'var(--blue)', lv: 7 },
        { name: 'Git', percent: 90, color: 'var(--blue)', lv: 9 },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
            <div>
                <div style={{ fontSize: '11px', color: 'var(--yellow)', marginBottom: '20px' }}>⚔ ATTACK SKILLS (LANGUAGES)</div>
                {attackSkills.map((s, i) => <SkillRow key={i} {...s} />)}
            </div>
            <div>
                <div style={{ fontSize: '11px', color: 'var(--blue)', marginBottom: '20px' }}>🛡 DEFENSE SKILLS (TOOLS)</div>
                {defenseSkills.map((s, i) => <SkillRow key={i} {...s} />)}
            </div>
        </div>
    );
};

export default SkillSection;
