// About Aria — purpose and how to use the platform

import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <Container className="aria-page-content py-4">
            <Row className="justify-content-center g-4">
                <Col lg={9}>
                    <Card className="aria-card-elevated mb-4">
                        <Card.Body className="p-4 p-md-5">
                            <h1 className="mb-3 text-primary">About Aria</h1>
                            <p className="lead mb-0 about-lead">
                                Affordable private music lessons from college musicians—built for families and learners who
                                want a supportive, transparent experience.
                            </p>
                        </Card.Body>
                    </Card>

                    <Card className="aria-card-elevated mb-4">
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="h4 mb-3 text-body">What we do</h2>
                            <p className="mb-0 about-prose">
                                Aria connects students with instructors for one-on-one lessons. Students can discover
                                instructors, keep materials in one place, and message their teachers. Instructors manage
                                clients, notes, and conversations from a simple dashboard.
                            </p>
                        </Card.Body>
                    </Card>

                    <Card className="aria-card-elevated mb-4">
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="h4 mb-3 text-body">FAQ</h2>
                            <Accordion flush className="about-accordion">
                                <Accordion.Item eventKey="0" className="border-0 border-bottom">
                                    <Accordion.Header>Who are the instructors?</Accordion.Header>
                                    <Accordion.Body>
                                        Instructors are college music students and recent graduates vetted for teaching and
                                        musicianship. Profiles list instruments, education, and background.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="border-0 border-bottom">
                                    <Accordion.Header>How do I get started as a student?</Accordion.Header>
                                    <Accordion.Body>
                                        Create a student account, browse Discover to find an instructor, then use Chat to
                                        coordinate lessons. Your dashboard links to account settings and lesson materials.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="border-0">
                                    <Accordion.Header>How do instructors use Aria?</Accordion.Header>
                                    <Accordion.Body>
                                        After registering, use the instructor dashboard for account settings, student chat,
                                        and client information including progress notes and lesson plans.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Card>

                    <p className="text-center mb-0">
                        <Link to="/" className="text-primary text-decoration-none fw-semibold">
                            ← Back to home
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
