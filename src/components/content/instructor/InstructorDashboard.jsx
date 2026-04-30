import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function InstructorDashboard() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Instructor dashboard</h1>
                            <p className="aria-supporting-text mb-4">
                                Access your instructor tools and manage your teaching activities
                            </p>
                            <h2 className="visually-hidden">Instructor tools</h2>
                            <Row className="g-4">
                                <Col md={4}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h3" className="h5">
                                                Account
                                            </Card.Title>
                                            <Card.Text>
                                                Manage your account information, profile settings, and preferences.
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/instructor/account"
                                                variant="primary"
                                                className="w-100 rounded-3 mt-auto"
                                            >
                                                Go to account
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h3" className="h5">
                                                Chat
                                            </Card.Title>
                                            <Card.Text>
                                                Communicate with your students, answer questions, and provide support.
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/instructor/chat"
                                                variant="outline-primary"
                                                className="w-100 rounded-3 mt-auto"
                                            >
                                                Go to chat
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h3" className="h5">
                                                Client info
                                            </Card.Title>
                                            <Card.Text>
                                                View and manage information about your clients and students.
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/instructor/clientinfo"
                                                variant="info"
                                                className="w-100 text-dark rounded-3 mt-auto"
                                            >
                                                Go to client info
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
