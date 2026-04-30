// Manage received payments — placeholder

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ManagePayment() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="aria-card-elevated text-center">
                        <Card.Body className="p-5">
                            <h1 className="h3 text-primary mb-3">Payments</h1>
                            <p className="aria-supporting-text mb-4">Direct deposit and payout history will appear here.</p>
                            <Button as={Link} to="/instructor/dashboard" variant="primary" className="rounded-3">
                                Back to dashboard
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
