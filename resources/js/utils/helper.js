export const getPositionName = (positions = []) => {
    const positionMap = {
        LB: 'LEFT BACK',
        LM: 'LEFT MIDFIELDER',
        RB: 'RIGHT BACK',
        CB: 'CENTER BACK',
        CM: 'CENTRAL MIDFIELDER',
        'CM-L': 'LEFT CENTRAL MIDFIELDER',
        'CB-R': 'RIGHT CENTRAL MIDFIELDER',
        CAM: 'ATTACKING MIDFIELDER',
        CDM: 'DEFENSIVE MIDFIELDER',
        LW: 'LEFT WINGER',
        RW: 'RIGHT WINGER',
        ST: 'STRIKER',
        CF: 'CENTER FORWARD',
        GK: 'GOALKEEPER',
    };

    return positions
        .map((position) => positionMap[position] || position)
        .join(', ');
};
