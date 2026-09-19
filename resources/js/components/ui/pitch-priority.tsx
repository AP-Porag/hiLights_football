import React from 'react'

const POSITION_ZONES = [
    { id: 'GK', full: 'Goalkeeper', cx: 30, cy: 100 },
    { id: 'LB', full: 'Left Back', cx: 75, cy: 40 },
    { id: 'CB-L', full: 'Centre Back (Left)', cx: 80, cy: 80 },
    { id: 'CB-R', full: 'Centre Back (Right)', cx: 80, cy: 120 },
    { id: 'RB', full: 'Right Back', cx: 75, cy: 160 },
    { id: 'LM', full: 'Left Midfielder', cx: 145, cy: 40 },
    { id: 'CM-L', full: 'Central Midfielder (Left)', cx: 145, cy: 80 },
    { id: 'CM-R', full: 'Central Midfielder (Right)', cx: 145, cy: 120 },
    { id: 'RM', full: 'Right Midfielder', cx: 145, cy: 160 },
    { id: 'CAM', full: 'Central Attacking Midfielder', cx: 200, cy: 100 },
    { id: 'LW', full: 'Left Winger', cx: 235, cy: 50 },
    { id: 'ST', full: 'Striker', cx: 260, cy: 100 },
    { id: 'RW', full: 'Right Winger', cx: 235, cy: 150 },
    { id: 'CF', full: 'Centre Forward', cx: 245, cy: 100 },
];

// Rank onujayi outer circle radius — Main sবচেয়ে boro, tারপর kromanwoye choto
const RANK_RADIUS = [13, 9, 7];
const RANK_DOT_RADIUS = [10, 6.5, 5.5];

interface PitchPriorityProps {
    // order matters: [0] = Main, [1] = Secondary, [2] = Third
    selected?: string[];
}

export const PitchPriority = ({ selected = [] }: PitchPriorityProps) => {
    const topThree = selected.slice(0, 3);

    return (
        <div>
            {/* SVG pitch — top-3 priority circles (bordered, target-style), no text labels */}
            <div className="mx-auto w-full max-w-[840px]">
                <svg viewBox="0 0 300 200" className="w-full">
                    <defs>
                        <linearGradient id="pitchPriorityBg" x1="0%" y1="0%" x2="100%" y2="0%">
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

                    <rect x="0" y="0" width="300" height="200" fill="url(#pitchPriorityBg)" />

                    <rect x="2" y="2" width="296" height="196" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <line x1="150" y1="2" x2="150" y2="198" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <circle cx="150" cy="100" r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <rect x="2" y="55" width="40" height="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <rect x="258" y="55" width="40" height="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <rect x="2" y="75" width="15" height="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <rect x="283" y="75" width="15" height="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                    {topThree.map((id, rank) => {
                        const zone = POSITION_ZONES.find((p) => p.id === id);
                        if (!zone) return null;
                        const r = RANK_RADIUS[rank] ?? 6;
                        const dotR = RANK_DOT_RADIUS[rank] ?? 3;
                        return (
                            <g key={id}>
                                <title>{zone.full}</title>
                                {/* Outer bordered circle (hollow, white ring) */}
                                <circle
                                    cx={zone.cx}
                                    cy={zone.cy}
                                    r={r}
                                    fill="rgba(255,255,255,0.08)"
                                    stroke="#FFFFFF"
                                    strokeWidth="1"
                                />
                                {/* Center dot */}
                                <circle
                                    cx={zone.cx}
                                    cy={zone.cy}
                                    r={dotR}
                                    fill="#E53F01"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    )
}
