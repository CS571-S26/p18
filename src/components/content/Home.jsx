import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container className="py-5" style={{ minHeight: '75vh' }}>
            <Row className="justify-content-center align-items-center">
                <Col lg={8} className="text-center">
                    <div className="py-5">
                        <h1 className="display-4 fw-bold mb-3">Aria</h1>
                        <h2 className="h4 text-secondary mb-4">Affordable Private Music Lessons by College Music Students</h2>
                        <p className="lead text-muted mb-4">
                            Aria makes it easy for families to connect with experienced instructors who care about both musical growth and a safe, supportive learning environment for their students. Lessons are designed with transparent pricing and flexible scheduling to ease the burden of parents looking to cultivate their child's musical journey, and older players looking to level-up their playing.
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Link to="/student" className="text-decoration-none">
                                <Button variant="primary" size="lg" className="px-4 py-3">
                                    Student
                                </Button>
                            </Link>
                            <Link to="/instructor" className="text-decoration-none">
                                <Button variant="success" size="lg" className="px-4 py-3">
                                    Instructor
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
