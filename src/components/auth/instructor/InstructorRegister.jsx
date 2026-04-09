import { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function InstructorRegister() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [degree, setDegree] = useState('');
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

    // Handle instructor registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate form
            if (!firstName || !lastName || !email || !password || !confirmPassword || !degree) {
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

            // Simulate instructor registration API call
            const response = await fetch('/api/instructor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    degree,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed. Please try again.');
            }

            const data = await response.json();

            // Store auth token and instructor info in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userType', 'instructor');
            localStorage.setItem('instructorId', data.instructorId);
            localStorage.setItem('instructorName', `${firstName} ${lastName}`);

            // Redirect to instructor dashboard
            navigate('/instructor/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
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
                                <h2 className="mb-2">Instructor Registration</h2>
                                <p className="text-muted">Create your teaching account</p>
                            </div>

                            {error && (
                                <Alert ref={alertRef} variant="danger" dismissible onClose={() => setError('')} tabIndex="-1">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

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
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Degree</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your degree"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                    <Form.Text className="text-muted">
                                        At least 6 characters
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </Form>

                            <div className="text-center mt-4">
                                <p className="text-muted mb-3">
                                    Already have an account?{' '}
                                    <Link to="/instructor/login" className="text-decoration-none">
                                        Login here
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