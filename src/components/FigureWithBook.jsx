function FigurWithBook() {
    return (
        <svg width="150" height="250" viewBox="0 0 150 250" style={{ display: 'block', margin: '100px auto 50px' }}>
            {/* Head */}
            <circle cx="75" cy="50" r="25" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Body */}
            <ellipse cx="75" cy="130" rx="35" ry="45" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Left Arm */}
            <circle cx="35" cy="130" r="13" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Right Arm */}
            <circle cx="115" cy="130" r="13" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Left Foot */}
            <ellipse cx="58" cy="200" rx="15" ry="9" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Right Foot */}
            <ellipse cx="92" cy="200" rx="15" ry="9" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Shadow */}
            <ellipse cx="75" cy="230" rx="40" ry="8" fill="#2D2A29" opacity="0.2" />
            {/* Book */}
            <rect x="48" y="115" width="55" height="30" fill="#EEE8ED" stroke="#3C1D49" strokeWidth="2" rx="2" />
            {/* Book Spine */}
            <line x1="75" y1="115" x2="75" y2="145" stroke="#3C1D49" strokeWidth="1" />
        </svg>
    );
}

export default FigurWithBook;