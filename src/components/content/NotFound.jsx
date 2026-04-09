import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page Not Found</h2>
                <p className="error-description">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className="error-icon">
                    <span>🔍</span>
                </div>
                <button 
                    className="btn btn-primary go-home-btn"
                    onClick={() => navigate('/')}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}
