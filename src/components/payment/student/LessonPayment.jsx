// Pay for lessons — placeholder until checkout is wired

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LessonPayment() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="aria-card-elevated text-center">
                        <Card.Body className="p-5">
                            <h1 className="h3 text-primary mb-3">Lesson payment</h1>
                            <p className="aria-supporting-text mb-4">Pay for upcoming lessons here once billing is connected.</p>
                            <Button as={Link} to="/student/dashboard" variant="primary" className="rounded-3">
                                Back to dashboard
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
