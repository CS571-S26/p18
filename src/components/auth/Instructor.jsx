import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Instructor() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Instructor</h1>
                            <p className="text-muted mb-4">
                                Sign in or register to be an instructor
                            </p>
                            <Row className="g-3">
                                <Col sm={6}>
                                    <Link to="/instructor/login" className="text-decoration-none">
                                        <Button variant="primary" size="lg" className="w-100 py-3 rounded-3">
                                            Login
                                        </Button>
                                    </Link>
                                </Col>
                                <Col sm={6}>
                                    <Link to="/instructor/register" className="text-decoration-none">
                                        <Button variant="outline-primary" size="lg" className="w-100 py-3 rounded-3">
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
