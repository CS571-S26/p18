import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container className="aria-page-frame py-4">
            <Row className="justify-content-center align-items-center w-100">
                <Col lg={9} xl={8}>
                    <Card className="aria-card-elevated text-center">
                        <Card.Body className="p-5 p-md-5">
                            <h1 className="display-5 fw-bold mb-3 text-primary">Aria</h1>
                            <h2 className="h4 aria-supporting-text mb-4">Affordable private music lessons by college music students</h2>
                            <p className="aria-supporting-text mb-4 mx-auto" style={{ maxWidth: '36rem' }}>
                                Aria makes it easy for families to connect with experienced instructors who care about both
                                musical growth and a safe, supportive learning environment. Transparent pricing and flexible
                                scheduling help parents and older learners focus on the music.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <Button as={Link} to="/student" variant="primary" size="lg" className="px-4 py-3 rounded-3">
                                    Student
                                </Button>
                                <Button as={Link} to="/instructor" variant="outline-primary" size="lg" className="px-4 py-3 rounded-3">
                                    Instructor
                                </Button>
                            </div>
                            <p className="small aria-supporting-text mt-4 mb-0">
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
