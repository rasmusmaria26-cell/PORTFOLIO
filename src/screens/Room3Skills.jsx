import React from 'react';
import { motion } from 'framer-motion';

const LabEquipment = ({ category, colorClass, skills }) => (
    <div className="glass-panel" style={{ padding: '24px', borderTop: `4px solid var(--${colorClass})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '10px', color: `var(--${colorClass})`, letterSpacing: '2px', textShadow: `0 0 5px var(--${colorClass})` }}>
            [{category}]_MONITOR
        </div>

        {/* CRT Screen for Tech Stack list */}
        <div style={{ backgroundColor: '#020202', padding: '15px', border: '2px inset #333', position: 'relative', overflow: 'hidden' }}>
            <div className="crt-overlay" style={{ opacity: 0.5, zIndex: 1 }} />
            {skills.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', position: 'relative', zIndex: 2 }}>
                    <span style={{ fontSize: '9px', color: 'var(--white)' }}>{skill.name}</span>

                    {/* Power Gauge */}
                    <div style={{ flex: 1, margin: '0 15px', height: '6px', backgroundColor: '#111', border: '1px solid #444', display: 'flex' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: idx * 0.2 }}
                            style={{ height: '100%', backgroundColor: `var(--${colorClass})`, boxShadow: `0 0 8px var(--${colorClass})` }}
                        />
                    </div>

                    <span style={{ fontSize: '7px', color: 'var(--gray)' }}>{skill.level}%</span>
                </div>
            ))}
        </div>
    </div>
);

const Room3Skills = () => {
    const skillData = [
        {
            category: 'ATTACK_PROGRAMMING',
            colorClass: 'green',
            skills: [
                { name: 'KOTLIN', level: 90 },
                { name: 'PYTHON', level: 82 },
                { name: 'JAVASCRIPT', level: 78 },
                { name: 'JAVA', level: 75 }
            ]
        },
        {
            category: 'DEFENSE_ANDROID',
            colorClass: 'cyan',
            skills: [
                { name: 'JETPACK COMPOSE', level: 88 },
                { name: 'MVVM + HILT', level: 85 },
                { name: 'ROOM DB', level: 80 },
                { name: 'STUDIO', level: 85 }
            ]
        },
        {
            category: 'MAGIC_CONCEPTS',
            colorClass: 'purple',
            skills: [
                { name: 'CRYPTOGRAPHY', level: 88 },
                { name: 'MESH NETWORKING', level: 84 },
                { name: 'DATA STRUCTURES', level: 80 },
                { name: 'API INTEGRATION', level: 82 }
            ]
        },
        {
            category: 'SOUL_TOOLS',
            colorClass: 'soul',
            skills: [
                { name: 'GIT', level: 85 },
                { name: 'SUPABASE', level: 78 },
                { name: 'NODE.JS', level: 72 },
                { name: 'TENSORFLOW.JS', level: 70 }
            ]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: '60px 40px', height: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}
        >
            <div style={{ fontSize: '12px', color: 'var(--gray)', letterSpacing: '4px', marginBottom: '40px' }}>SECTOR 3 // EQUIPMENT ROOM</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', overflowY: 'auto', paddingBottom: '40px' }}>
                {skillData.map((data, i) => (
                    <LabEquipment key={i} {...data} />
                ))}
            </div>
        </motion.div>
    );
};

export default Room3Skills;
