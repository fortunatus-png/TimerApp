import Header from '../components/Header'
import Figure from '../components/Figure'
import './HomePage.css'

function HomePage() {
    return (
        <>
            <Header />
            <Figure />
            <p className="homeMessage">Small steps, big results! 🌱</p>
        </>
    );
}

export default HomePage;