import React from 'react'

const POSITION_ZONES = [
    { id: 'GK', label: 'GK', cx: 30, cy: 100 },
    { id: 'LB', label: 'LB', cx: 75, cy: 40 },
    { id: 'CB-L', label: 'CB', cx: 80, cy: 80 },
    { id: 'CB-R', label: 'CB', cx: 80, cy: 120 },
    { id: 'RB', label: 'RB', cx: 75, cy: 160 },
    { id: 'LM', label: 'LM', cx: 145, cy: 40 },
    { id: 'CM-L', label: 'CM', cx: 145, cy: 80 },
    { id: 'CM-R', label: 'CM', cx: 145, cy: 120 },
    { id: 'RM', label: 'RM', cx: 145, cy: 160 },
    { id: 'CAM', label: 'CAM', cx: 200, cy: 100 },
    { id: 'LW', label: 'LW', cx: 235, cy: 50 },
    { id: 'ST', label: 'ST', cx: 260, cy: 100 },
    { id: 'RW', label: 'RW', cx: 235, cy: 150 },
    { id: 'CF', label: 'CF', cx: 245, cy: 100 },
];

interface PitchProps {
    selected?: string[];
}

export const Pitch = ({ selected = [] }: PitchProps) => {

    return (
        <div>
            {/* SVG pitch — hidden on mobile */}
            <div className="">
                <div className="">
                    <svg viewBox="0 0 300 200" className="w-full">
                        {/* <rect x="0" y="0" width="300" height="200" fill="#1a3a1a" /> */}

                        <defs>
                            <linearGradient id="pitchBg" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#045b0d" />
                                <stop offset="15%" stopColor="#0a6d12" />
                                <stop offset="30%" stopColor="#045b0d" />
                                <stop offset="45%" stopColor="#0a6d12" />
                                <stop offset="60%" stopColor="#045b0d" />
                                <stop offset="75%" stopColor="#0a6d12" />
                                <stop offset="90%" stopColor="#045b0d" />
                                <stop offset="100%" stopColor="#0a6d12" />
                            </linearGradient>
                        </defs>

                        <rect x="0" y="0" width="300" height="200" fill="url(#pitchBg)" />

                        <rect x="2" y="2" width="296" height="196" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <line x1="150" y1="2" x2="150" y2="198" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <circle cx="150" cy="100" r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <rect x="2" y="55" width="40" height="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <rect x="258" y="55" width="40" height="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <rect x="2" y="75" width="15" height="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <rect x="283" y="75" width="15" height="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                        {POSITION_ZONES.map((p) => {
                            const isActive = selected.includes(p.id);
                            return (
                                <g
                                    key={p.id}
                                    className="group"
                                >
                                    <circle
                                        cx={p.cx}
                                        cy={p.cy}
                                        r="14"
                                        fill={isActive ? 'rgba(255,107,0,0.85)' : 'transparent'}
                                        stroke={isActive ? '#FF6B00' : 'rgba(255,255,255,0.4)'}
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        x={p.cx}
                                        y={p.cy}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fontSize="8"
                                        fontWeight="700"
                                        fill={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)'}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {p.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    )
}
