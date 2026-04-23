import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function InstructorDashboard() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Body className="text-center p-5">
                            <h1 className="mb-4">Instructor Dashboard</h1>
                            <p className="text-muted mb-4">
                                Access your instructor tools and manage your teaching activities
                            </p>
                            <Row className="g-4">
                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Account</Card.Title>
                                            <Card.Text>
                                                Manage your account information, profile settings, and preferences.
                                            </Card.Text>
                                            <Link to="/instructor/account" className="text-decoration-none mt-auto">
                                                <Button variant="primary" className="w-100">
                                                    Go to Account
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Chat</Card.Title>
                                            <Card.Text>
                                                Communicate with your students, answer questions, and provide support.
                                            </Card.Text>
                                            <Link to="/instructor/chat" className="text-decoration-none mt-auto">
                                                <Button variant="success" className="w-100">
                                                    Go to Chat
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>Client Info</Card.Title>
                                            <Card.Text>
                                                View and manage information about your clients and students.
                                            </Card.Text>
                                            <Link to="/instructor/clientinfo" className="text-decoration-none mt-auto">
                                                <Button variant="info" className="w-100">
                                                    Go to Client Info
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