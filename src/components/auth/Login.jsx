import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Login</h1>
                            <p className="aria-supporting-text mb-4">Select your account type to continue</p>
                            <Row className="g-3">
                                <Col sm={6}>
                                    <Button
                                        as={Link}
                                        to="/student/login"
                                        variant="primary"
                                        size="lg"
                                        className="w-100 py-3 rounded-3"
                                    >
                                        Student login
                                    </Button>
                                </Col>
                                <Col sm={6}>
                                    <Button
                                        as={Link}
                                        to="/instructor/login"
                                        variant="outline-primary"
                                        size="lg"
                                        className="w-100 py-3 rounded-3"
                                    >
                                        Instructor login
                                    </Button>
                                </Col>
                            </Row>
                            <div className="mt-4">
                                <p className="aria-supporting-text">
                                    Don&apos;t have an account?{' '}
                                    <Link to="/register" className="text-decoration-none">
                                        Register here
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

