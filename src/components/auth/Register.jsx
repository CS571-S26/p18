import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Create Account</h1>
                            <p className="aria-supporting-text mb-4">Select your account type to get started</p>
                            <Row className="g-3">
                                <Col sm={6}>
                                    <Button
                                        as={Link}
                                        to="/student/register"
                                        variant="primary"
                                        size="lg"
                                        className="w-100 py-3 rounded-3"
                                    >
                                        Register as student
                                    </Button>
                                </Col>
                                <Col sm={6}>
                                    <Button
                                        as={Link}
                                        to="/instructor/register"
                                        variant="outline-primary"
                                        size="lg"
                                        className="w-100 py-3 rounded-3"
                                    >
                                        Register as instructor
                                    </Button>
                                </Col>
                            </Row>
                            <div className="mt-4">
                                <p className="aria-supporting-text">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-none">
                                        Login here
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