import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ name, value, percent, colorClass }) => (
    <motion.div
        whileHover={{ x: 5, y: 5 }}
        className="stat-card px-border"
        style={{
            padding: '20px',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}
    >
        <div style={{ fontSize: '10px', color: 'var(--gray)' }}>{name}</div>
        <div style={{ fontSize: '18px', color: 'var(--yellow)' }}>{value}</div>
        <div style={{ height: '10px', background: 'var(--darkgray)', border: '2px solid var(--white)' }}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                    height: '100%',
                    backgroundColor: `var(--${colorClass || 'yellow'})`
                }}
            />
        </div>
        <style>{`
      .stat-card:hover {
        box-shadow: none !important;
        border-color: var(--yellow) !important;
      }
    `}</style>
    </motion.div>
);

const StatsGrid = () => {
    const stats = [
        { name: 'HP (HAPPINESS)', value: '7.65 CGPA', percent: 76, colorClass: 'yellow' },
        { name: 'AT (ATTITUDE)', value: 'POSITIVE', percent: 85, colorClass: 'soul' },
        { name: 'DF (DEDICATION)', value: 'HIGH', percent: 90, colorClass: 'green' },
        { name: 'EXP (EXPERIENCE)', value: 'CS UNDERGRAD', percent: 60, colorClass: 'blue' },
        { name: 'LOVE (PASSION)', value: 'DEVELOPER', percent: 88, colorClass: 'yellow' },
        { name: 'GOLD (PROJECTS)', value: 'MULTIPLE', percent: 70, colorClass: 'soul' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px'
        }}>
            {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </div>
    );
};

export default StatsGrid;
