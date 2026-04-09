import { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function InstructorLogin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [degree, setDegree] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const alertRef = useRef(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (alertRef.current) {
            alertRef.current.focus();
        }
    };

    // Handle instructor login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate form
            if (!name || !email || !degree || !password || !confirmPassword) {
                setError('Please fill in all fields');
                scrollToTop();
                setLoading(false);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email');
                scrollToTop();
                setLoading(false);
                return;
            }

            // Password validation
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                scrollToTop();
                setLoading(false);
                return;
            }

            // Password match validation
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                scrollToTop();
                setLoading(false);
                return;
            }

            // Simulate instructor login API call
            const response = await fetch('/api/instructor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    degree,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please check your credentials.');
            }

            const data = await response.json();

            // Store auth token and instructor info in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userType', 'instructor');
            localStorage.setItem('instructorId', data.instructorId);
            localStorage.setItem('instructorName', data.name);

            // Redirect to instructor dashboard
            navigate('/instructor/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred during login');
            scrollToTop();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{ minHeight: '100vh', paddingTop: '2rem' }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Body className="p-5">
                            <div className="text-center mb-5">
                                <h2 className="mb-2">Instructor Login</h2>
                                <p className="text-muted">Manage your lessons and students</p>
                            </div>

                            {error && (
                                <Alert variant="danger" dismissible onClose={() => setError('')}>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    type="submit"
                                    className="w-100 py-2 fw-bold"
                                    disabled={loading}
                                    size="lg"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>

                            <div className="text-center mt-4">
                                <p className="text-muted mb-3">
                                    Don't have an account?{' '}
                                    <Link to="/instructor/register" className="text-decoration-none">
                                        Register as an instructor
                                    </Link>
                                </p>
                                <p className="text-muted">
                                    <Link to="/instructor" className="text-decoration-none small">
                                        ← Back to instructor options
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}