import './Figure.css'

function Figure() {
    return (
        <svg className="figure-svg" width="220" height="300" viewBox="0 0 220 300">
            {/* Soft shadow under the panda */}
            <ellipse cx="110" cy="285" rx="65" ry="8" fill="#2D2A29" opacity="0.15" />

            {/* Body - round and cuddly */}
            <g className="body-breathe">
                <ellipse cx="110" cy="230" rx="75" ry="65" fill="#2D2A29" />
                <ellipse cx="110" cy="225" rx="58" ry="52" fill="#F8F7F2" />
                <ellipse cx="68" cy="268" rx="30" ry="18" fill="#2D2A29" />
                <ellipse cx="152" cy="268" rx="30" ry="18" fill="#2D2A29" />
                <ellipse cx="40" cy="218" rx="24" ry="36" fill="#2D2A29" transform="rotate(15,40,218)" />
                <ellipse cx="180" cy="218" rx="24" ry="36" fill="#2D2A29" transform="rotate(-15,180,218)" />
            </g>

            {/* Ears */}
            <circle cx="58" cy="52" r="36" fill="#2D2A29" />
            <circle cx="162" cy="52" r="36" fill="#2D2A29" />
            <circle cx="58" cy="52" r="18" fill="#FFB6C1" opacity="0.4" />
            <circle cx="162" cy="52" r="18" fill="#FFB6C1" opacity="0.4" />

            {/* Head */}
            <circle cx="110" cy="128" r="85" fill="#F8F7F2" />

            {/* Dark eye patches */}
            <ellipse cx="78" cy="118" rx="32" ry="30" fill="#2D2A29" />
            <ellipse cx="142" cy="118" rx="32" ry="30" fill="#2D2A29" />

            {/* Eye whites */}
            <ellipse cx="78" cy="120" rx="24" ry="23" fill="white" />
            <ellipse cx="142" cy="120" rx="24" ry="23" fill="white" />

            {/* Pupils */}
            <g className="move-l">
                <circle cx="78" cy="122" r="14" fill="#2D2A29" />
                <circle cx="83" cy="117" r="5" fill="white" />
                <circle cx="74" cy="126" r="2.5" fill="white" opacity="0.5" />
            </g>
            <g className="move-r">
                <circle cx="142" cy="122" r="14" fill="#2D2A29" />
                <circle cx="147" cy="117" r="5" fill="white" />
                <circle cx="138" cy="126" r="2.5" fill="white" opacity="0.5" />
            </g>

            {/* Nose */}
            <ellipse cx="110" cy="148" rx="11" ry="8" fill="#2D2A29" />
            <ellipse cx="110" cy="146" rx="4" ry="2.5" fill="white" opacity="0.3" />

            {/* Mouth */}
            <path d="M95 160 Q110 175 125 160" fill="none" stroke="#2D2A29" strokeWidth="3" strokeLinecap="round" />

            {/* Rosy cheeks */}
            <ellipse cx="60" cy="155" rx="20" ry="14" fill="#FFB6C1" opacity="0.5" />
            <ellipse cx="160" cy="155" rx="20" ry="14" fill="#FFB6C1" opacity="0.5" />
        </svg>
    )
}

export default Figure;