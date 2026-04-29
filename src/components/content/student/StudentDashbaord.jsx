import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-3 text-primary">Student Dashboard</h1>
                            <p className="text-muted mb-4">
                                Access your student tools and manage your learning activities
                            </p>
                            <Row className="g-4">
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Account</Card.Title>
                                            <Card.Text>
                                                Manage your account information, profile settings, and preferences.
                                            </Card.Text>
                                            <Link to="/student/account" className="text-decoration-none mt-auto">
                                                <Button variant="primary" className="w-100 rounded-3">
                                                    Go to Account
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Chat</Card.Title>
                                            <Card.Text>
                                                Communicate with your instructors, ask questions, and get support.
                                            </Card.Text>
                                            <Link to="/student/chat" className="text-decoration-none mt-auto">
                                                <Button variant="outline-primary" className="w-100 rounded-3">
                                                    Go to Chat
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Discover</Card.Title>
                                            <Card.Text>
                                                Explore available courses, instructors, and learning opportunities.
                                            </Card.Text>
                                            <Link to="/student/discover" className="text-decoration-none mt-auto">
                                                <Button variant="info" className="w-100 text-dark rounded-3">
                                                    Go to Discover
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="h-100 aria-card-nested">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Lesson Materials</Card.Title>
                                            <Card.Text>
                                                Access your lesson materials, assignments, and course content.
                                            </Card.Text>
                                            <Link to="/student/lessonmaterials" className="text-decoration-none mt-auto">
                                                <Button variant="outline-secondary" className="w-100 rounded-3">
                                                    Go to Lesson Materials
                                                </Button>
                                            </Link>
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