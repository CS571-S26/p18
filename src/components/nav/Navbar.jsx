import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.webp';
import './Navbar.css';

export default function NavBar() {
    const userType = localStorage.getItem('userType');
    const instructorName = localStorage.getItem('instructorName');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear relevant auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('instructorId');
        localStorage.removeItem('instructorName');

        // Redirect to home
        navigate('/');
        // Optional: force refresh so navbar updates immediately
        window.location.reload();
    };

    return (
        <Navbar className="navbar-custom" expand="lg" sticky="top" data-bs-theme="light">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="brand-section">
                    <img
                        src={logo}
                        alt="Logo"
                        height="45"
                        className="d-inline-block align-text-top me-3 logo-image"
                    />
                    <span className="brand-text">Aria</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-links align-items-center">

                        {userType === 'instructor' ? (
                            <>
                                <Nav.Link as={Link} to="/instructor/dashboard" className="nav-link-item">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to="/instructor/chat" className="nav-link-item">
                                    Chat
                                </Nav.Link>
                                <Nav.Link as={Link} to="/instructor/clientinfo" className="nav-link-item">
                                    Client Info
                                </Nav.Link>
                                <Nav.Link as={Link} to="/instructor/account" className="nav-link-item">
                                    Account
                                </Nav.Link>

                                <span className="ms-3 me-2">
                                    Hello, {instructorName || 'Instructor'}
                                </span>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/" className="nav-link-item">Home</Nav.Link>
                                <Nav.Link as={Link} to="/student" className="nav-link-item">Student</Nav.Link>
                                <Nav.Link as={Link} to="/instructor" className="nav-link-item">Instructor</Nav.Link>
                                <Nav.Link as={Link} to="/about" className="nav-link-item">About</Nav.Link>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}