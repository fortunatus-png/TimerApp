import Header from '../components/Header'

function HomePage() {
    return (
        <>
            <Header />
            <svg width="150" height="250" viewBox="0 0 150 250" style={{ display: 'block', margin: '250px auto' }}>
                {/* Kopf */}
                <circle cx="75" cy="50" r="25" fill="none" stroke="#003D2B" strokeWidth="3" />
                {/* Körper */}
                <ellipse cx="75" cy="130" rx="35" ry="45" fill="none" stroke="#003D2B" strokeWidth="3" />
                {/* Linker Arm */}
                <ellipse cx="20" cy="130" rx="12" ry="20" fill="none" stroke="#003D2B" strokeWidth="3" />
                {/* Rechter Arm */}
                <ellipse cx="130" cy="130" rx="12" ry="20" fill="none" stroke="#003D2B" strokeWidth="3" />
                {/* Linker Fuß */}
                <ellipse cx="58" cy="200" rx="15" ry="8" fill="none" stroke="#003D2B" strokeWidth="3" />
                {/* Rechter Fuß */}
                <ellipse cx="92" cy="200" rx="15" ry="8" fill="none" stroke="#003D2B" strokeWidth="3" />
            </svg>
        </>
    )
}

export default HomePage