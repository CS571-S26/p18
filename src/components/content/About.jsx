// About Aria — purpose and how to use the platform

import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <Container className="aria-page-content py-4">
            <Row className="justify-content-center mb-4">
                <Col lg={9}>
                    <h1 className="mb-2 text-primary">About Aria</h1>
                    <p className="text-muted lead mb-0">
                        Affordable private music lessons from college musicians—built for families and learners who want a
                        supportive, transparent experience.
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-center g-4">
                <Col lg={9}>
                    <Card className="aria-card-elevated mb-4">
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="h4 mb-3">What we do</h2>
                            <p className="text-muted mb-0">
                                Aria connects students with instructors for one-on-one lessons. Students can discover
                                instructors, keep materials in one place, and message their teachers. Instructors manage
                                clients, notes, and conversations from a simple dashboard.
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="aria-card-elevated">
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="h4 mb-3">FAQ</h2>
                            <Accordion flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Who are the instructors?</Accordion.Header>
                                    <Accordion.Body className="text-muted">
                                        Instructors are college music students and recent graduates vetted for teaching
                                        and musicianship. Profiles list instruments, education, and background.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>How do I get started as a student?</Accordion.Header>
                                    <Accordion.Body className="text-muted">
                                        Create a student account, browse Discover to find an instructor, then use Chat to
                                        coordinate lessons. Your dashboard links to account settings and lesson
                                        materials.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>How do instructors use Aria?</Accordion.Header>
                                    <Accordion.Body className="text-muted">
                                        After registering, use the instructor dashboard for account settings, student
                                        chat, and client information including progress notes and lesson plans.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Card>
                    <p className="text-center text-muted small mt-4 mb-0">
                        <Link to="/">← Back to home</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
