import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-4">Login</h1>
                            <p className="text-muted mb-4">
                                Select your account type to continue
                            </p>
                            <Row className="g-3">
                                <Col sm={6}>
                                    <Link to="/student/login" className="text-decoration-none">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-100 py-3"
                                        >
                                            Student Login
                                        </Button>
                                    </Link>
                                </Col>
                                <Col sm={6}>
                                    <Link to="/instructor/login" className="text-decoration-none">
                                        <Button
                                            variant="success"
                                            size="lg"
                                            className="w-100 py-3"
                                        >
                                            Instructor Login
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                            <div className="mt-4">
                                <p className="text-muted">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-decoration-none">Register here</Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

