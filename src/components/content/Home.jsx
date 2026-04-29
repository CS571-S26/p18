import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container className="aria-page-frame py-4">
            <Row className="justify-content-center align-items-center w-100">
                <Col lg={9} xl={8}>
                    <Card className="aria-hero-card text-center">
                        <Card.Body className="p-5 p-md-5">
                            <h1 className="display-5 fw-bold mb-3 text-primary">Aria</h1>
                            <h2 className="h4 text-muted mb-4">Affordable private music lessons by college music students</h2>
                            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '36rem' }}>
                                Aria makes it easy for families to connect with experienced instructors who care about both
                                musical growth and a safe, supportive learning environment. Transparent pricing and flexible
                                scheduling help parents and older learners focus on the music—not the logistics.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <Link to="/student" className="text-decoration-none">
                                    <Button variant="primary" size="lg" className="px-4 py-3 rounded-3">
                                        Student
                                    </Button>
                                </Link>
                                <Link to="/instructor" className="text-decoration-none">
                                    <Button variant="outline-primary" size="lg" className="px-4 py-3 rounded-3">
                                        Instructor
                                    </Button>
                                </Link>
                            </div>
                            <p className="small text-muted mt-4 mb-0">
                                <Link to="/about" className="text-decoration-none">
                                    Learn more about Aria
                                </Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
