import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.webp';
import './Navbar.css';

export default function NavBar() {
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
                    <Nav className="ms-auto nav-links">
                        <Nav.Link as={Link} to="/" className="nav-link-item">Home</Nav.Link>
                        <Nav.Link as={Link} to="/student" className="nav-link-item">Student</Nav.Link>
                        <Nav.Link as={Link} to="/instructor" className="nav-link-item">Instructor</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link-item">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}