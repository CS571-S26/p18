import { useState, useRef, useId } from 'react';
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
    const id = useId();
    const f = (name) => `${id}-${name}`;

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
                                <h1 className="mb-2 text-primary h2">Student registration</h1>
                                <p className="aria-supporting-text">Create your learning account</p>
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

                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" htmlFor={f('firstName')}>
                                        First name
                                    </Form.Label>
                                    <Form.Control
                                        id={f('firstName')}
                                        type="text"
                                        name="firstName"
                                        autoComplete="given-name"
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" htmlFor={f('lastName')}>
                                        Last name
                                    </Form.Label>
                                    <Form.Control
                                        id={f('lastName')}
                                        type="text"
                                        name="lastName"
                                        autoComplete="family-name"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" htmlFor={f('email')}>
                                        Email address
                                    </Form.Label>
                                    <Form.Control
                                        id={f('email')}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold" htmlFor={f('grade')}>
                                        Grade level
                                    </Form.Label>
                                    <Form.Select
                                        id={f('grade')}
                                        name="grade"
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
                                    <Form.Label className="fw-bold" htmlFor={f('password')}>
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        id={f('password')}
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        size="lg"
                                    />
                                    <Form.Text className="aria-supporting-text">At least 6 characters</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold" htmlFor={f('confirmPassword')}>
                                        Confirm password
                                    </Form.Label>
                                    <Form.Control
                                        id={f('confirmPassword')}
                                        type="password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
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
                                <p className="aria-supporting-text mb-3">
                                    Already have an account?{' '}
                                    <Link to="/student/login" className="text-decoration-none">
                                        Login here
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