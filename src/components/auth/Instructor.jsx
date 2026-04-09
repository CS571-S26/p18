import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Instructor() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-4">Instructor</h1>
                            <p className="text-muted mb-4">
                                Sign in or register to be an instructor
                            </p>
                            <Row className="g-3">
                                <Col sm={6}>
                                    <Link to="/instructor/login" className="text-decoration-none">
                                        <Button variant="primary" size="lg" className="w-100 py-3">
                                            Login
                                        </Button>
                                    </Link>
                                </Col>
                                <Col sm={6}>
                                    <Link to="/instructor/register" className="text-decoration-none">
                                        <Button variant="success" size="lg" className="w-100 py-3">
                                            Register
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
