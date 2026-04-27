function FigurWithBook() {
    return (
        <svg width="150" height="250" viewBox="0 0 150 250" style={{ display: 'block', margin: '150px auto 50px' }}>
            {/* Kopf */}
            <circle cx="75" cy="50" r="25" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Körper */}
            <ellipse cx="75" cy="130" rx="35" ry="45" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Linker Arm */}
            <circle cx="35" cy="130" r="13" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Rechter Arm */}
            <circle cx="115" cy="130" r="13" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Linker Fuß */}
            <ellipse cx="58" cy="200" rx="15" ry="9" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Rechter Fuß */}
            <ellipse cx="92" cy="200" rx="15" ry="9" fill="#F8F7F2" stroke="#003D2B" strokeWidth="2" />
            {/* Schatten */}
            <ellipse cx="75" cy="230" rx="40" ry="8" fill="#2D2A29" opacity="0.2" />
            {/* Buch */}
            <rect x="48" y="115" width="55" height="30" fill="#EEE8ED" stroke="#3C1D49" strokeWidth="2" rx="2" />
            {/* Buchmitte */}
            <line x1="75" y1="115" x2="75" y2="145" stroke="#3C1D49" strokeWidth="1" />
        </svg>
    );
}

export default FigurWithBook;