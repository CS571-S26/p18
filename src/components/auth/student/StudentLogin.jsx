import { useState, useRef, useId } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const alertRef = useRef(null);
    const id = useId();
    const emailId = `${id}-email`;
    const passwordId = `${id}-password`;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (alertRef.current) {
            alertRef.current.focus();
        }
    };

    // Handle student login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate form
            if (!email || !password) {
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

            // TODO - UNCOMMENT ONCE API IS READY
            // const response = await fetch('...', { ... });
            // if (!response.ok) { ... }
            // const data = await response.json();
            // localStorage.setItem('authToken', data.token);
            // localStorage.setItem('userType', 'student');
            // localStorage.setItem('studentId', data.studentId);
            // localStorage.setItem('studentName', data.name);

            if (email === 'test@email.com' && password === 'password') {
                localStorage.setItem('authToken', 'fake-jwt-token');
                localStorage.setItem('userType', 'student');
                localStorage.setItem('studentId', '456');
                localStorage.setItem('studentName', 'Test Student');
            } else {
                throw new Error('Login failed. Please check your credentials.');
            }

            navigate('/student/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred during login');
            scrollToTop();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="aria-page-frame" style={{ paddingTop: '2rem' }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="p-5">
                            <div className="text-center mb-5">
                                <h1 className="mb-2 text-primary h2">Student login</h1>
                                <p className="aria-supporting-text">Access your learning dashboard</p>
                            </div>

                            {error && (
                                <Alert
                                    ref={alertRef}
                                    variant="danger"
                                    dismissible
                                    onClose={() => setError('')}
                                    tabIndex={-1}
                                    role="alert"
                                >
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" htmlFor={emailId}>
                                        Email address
                                    </Form.Label>
                                    <Form.Control
                                        id={emailId}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                    <Form.Text className="aria-supporting-text">
                                        We will never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold" htmlFor={passwordId}>
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        id={passwordId}
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2 fw-bold rounded-3"
                                    disabled={loading}
                                    size="lg"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>

                            <div className="text-center mt-4">
                                <p className="aria-supporting-text mb-3">
                                    Don&apos;t have an account?{' '}
                                    <Link to="/student/register" className="text-decoration-none">
                                        Register as a student
                                    </Link>
                                </p>
                                <p className="aria-supporting-text">
                                    <Link to="/student" className="text-decoration-none small">
                                        ← Back to student options
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