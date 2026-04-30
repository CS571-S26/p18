import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Student() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Student</h1>
                            <p className="aria-supporting-text mb-4">
                                Sign in or register to be a student (or parent or guardian of a student).
                            </p>
                            <Row className="g-3">
                                <Col sm={6}>
                                    <Button as={Link} to="/student/login" variant="primary" size="lg" className="w-100 py-3 rounded-3">
                                        Login
                                    </Button>
                                </Col>
                                <Col sm={6}>
                                    <Button
                                        as={Link}
                                        to="/student/register"
                                        variant="outline-primary"
                                        size="lg"
                                        className="w-100 py-3 rounded-3"
                                    >
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
