import './Figure.css'

function FigureWithBook() {
    return (
        <svg width="240" height="320" viewBox="0 0 240 320">
            <ellipse cx="120" cy="305" rx="70" ry="9" fill="#2D2A29" opacity="0.15" />

            <g className="read-body">
                <ellipse cx="120" cy="245" rx="80" ry="70" fill="#2D2A29" />
                <ellipse cx="120" cy="238" rx="62" ry="56" fill="#F8F7F2" />
                <ellipse cx="75" cy="285" rx="32" ry="20" fill="#2D2A29" />
                <ellipse cx="165" cy="285" rx="32" ry="20" fill="#2D2A29" />
                <ellipse cx="55" cy="232" rx="26" ry="38" fill="#2D2A29" transform="rotate(20,45,232)" />
                <ellipse cx="185" cy="232" rx="26" ry="38" fill="#2D2A29" transform="rotate(-20,195,232)" />
            </g>

            {/* Book */}
            <g className="book-bob">
                <rect x="80" y="230" width="80" height="55" rx="5" fill="#DF7046" stroke="#2D2A29" strokeWidth="2" />
                <rect x="83" y="234" width="35" height="47" fill="#F8EBCE" />
                <rect x="121" y="234" width="35" height="47" fill="#F8EBCE" />
                <line x1="120" y1="230" x2="120" y2="285" stroke="#2D2A29" strokeWidth="1.5" />
                <line x1="85" y1="255" x2="116" y2="255" stroke="#2D2A29" strokeWidth="1.5" />
                <line x1="85" y1="241" x2="116" y2="241" stroke="#2D2A29" strokeWidth="1.5" />
                <line x1="85" y1="247" x2="116" y2="247" stroke="#2D2A29" strokeWidth="1.5" />
                <line x1="126" y1="247" x2="155" y2="247" stroke="#2D2A29" strokeWidth="1.5" />
                <line x1="126" y1="241" x2="155" y2="241" stroke="#2D2A29" strokeWidth="1.5" />
                <rect x="83" y="208" width="74" height="4" rx="2" fill="#C05A2E" />
            </g>

            {/* Ears */}
            <circle cx="63" cy="62" r="38" fill="#2D2A29" />
            <circle cx="177" cy="62" r="38" fill="#2D2A29" />
            <circle cx="63" cy="62" r="20" fill="#FFB6C1" opacity="0.35" />
            <circle cx="177" cy="62" r="20" fill="#FFB6C1" opacity="0.35" />

            <g className="read-head">
                <circle cx="120" cy="135" r="88" fill="#F8F7F2" />

                {/* Dark eye patches */}
                <ellipse cx="86" cy="125" rx="34" ry="32" fill="#2D2A29" />
                <ellipse cx="154" cy="125" rx="34" ry="32" fill="#2D2A29" />

                {/* Eye whites */}
                <ellipse cx="86" cy="127" rx="25" ry="24" fill="white" />
                <ellipse cx="154" cy="127" rx="25" ry="24" fill="white" />

                {/* Pupils */}
                <g className="read-eye-l">
                    <circle cx="86" cy="132" r="14" fill="#2D2A29" />
                    <circle cx="90" cy="128" r="5" fill="white" />
                </g>
                <g className="read-eye-r">
                    <circle cx="154" cy="132" r="14" fill="#2D2A29" />
                    <circle cx="158" cy="128" r="5" fill="white" />
                </g>

                {/* Nose */}
                <ellipse cx="120" cy="155" rx="12" ry="9" fill="#2D2A29" />
                <ellipse cx="120" cy="153" rx="4" ry="2.5" fill="white" opacity="0.3" />

                {/* Mouth */}
                <path d="M102 168 Q120 185 138 168" fill="none" stroke="#2D2A29" strokeWidth="3" strokeLinecap="round" />

                {/* Rosy cheeks */}
                <ellipse cx="66" cy="162" rx="20" ry="14" fill="#FFB6C1" opacity="0.45" />
                <ellipse cx="174" cy="162" rx="20" ry="14" fill="#FFB6C1" opacity="0.45" />
            </g>
        </svg>
    )
}

export default FigureWithBook;