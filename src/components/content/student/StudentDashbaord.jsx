import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Student dashboard</h1>
                            <p className="aria-supporting-text mb-4">
                                Access your student tools and manage your learning activities
                            </p>
                            <h2 className="visually-hidden">Student tools</h2>
                            <Row className="g-4">
                                <Col md={6}>
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
                                                to="/student/account"
                                                variant="primary"
                                                className="w-100 rounded-3 mt-auto"
                                            >
                                                Go to account
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h3" className="h5">
                                                Chat
                                            </Card.Title>
                                            <Card.Text>
                                                Communicate with your instructors, ask questions, and get support.
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/student/chat"
                                                variant="outline-primary"
                                                className="w-100 rounded-3 mt-auto"
                                            >
                                                Go to chat
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h3" className="h5">
                                                Discover
                                            </Card.Title>
                                            <Card.Text>
                                                Explore available courses, instructors, and learning opportunities.
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/student/discover"
                                                variant="info"
                                                className="w-100 text-dark rounded-3 mt-auto"
                                            >
                                                Go to discover
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h3" className="h5">
                                                Lesson materials
                                            </Card.Title>
                                            <Card.Text>
                                                Access your lesson materials, assignments, and course content.
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/student/lessonmaterials"
                                                variant="outline-secondary"
                                                className="w-100 rounded-3 mt-auto"
                                            >
                                                Go to lesson materials
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
