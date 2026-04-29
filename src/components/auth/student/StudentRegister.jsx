import { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentRegister() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [grade, setGrade] = useState('');
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

    // Handle student registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate form
            if (!firstName || !lastName || !email || !password || !confirmPassword || !grade) {
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

            // Simulate student registration API call
            const response = await fetch('/api/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    grade,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed. Please try again.');
            }

            const data = await response.json();

            // Store auth token and student info in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userType', 'student');
            localStorage.setItem('studentId', data.studentId);
            localStorage.setItem('studentName', `${firstName} ${lastName}`);

            // Redirect to student dashboard
            navigate('/student/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
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
                                <h2 className="mb-2 text-primary">Student Registration</h2>
                                <p className="text-muted">Create your learning account</p>
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
                                    <Form.Label className="fw-bold">Grade Level</Form.Label>
                                    <Form.Select
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    >
                                        <option value="">Select your grade</option>
                                        <option value="9">9th Grade</option>
                                        <option value="10">10th Grade</option>
                                        <option value="11">11th Grade</option>
                                        <option value="12">12th Grade</option>
                                    </Form.Select>
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
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2 fw-bold rounded-3"
                                    disabled={loading}
                                    size="lg"
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </Form>

                            <div className="text-center mt-4">
                                <p className="text-muted mb-3">
                                    Already have an account?{' '}
                                    <Link to="/student/login" className="text-decoration-none">
                                        Login here
                                    </Link>
                                </p>
                                <p className="text-muted">
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