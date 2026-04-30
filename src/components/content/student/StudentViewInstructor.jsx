// Full instructor profile; link from Discover; chat entry point

import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getInstructorById } from '../../../data/instructors';

function StarRating({ value }) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
        const filled = value >= i - 0.5;
        stars.push(
            <span key={i} className={filled ? 'text-warning' : 'text-secondary'} style={{ opacity: filled ? 1 : 0.35 }}>
                ★
            </span>
        );
    }
    return (
        <span className="d-inline-flex align-items-center flex-wrap" aria-label={`${value.toFixed(1)} out of 5 stars`}>
            <span aria-hidden="true" className="d-inline-flex align-items-center">
                {stars}
                <span className="aria-supporting-text ms-2">{value.toFixed(1)} / 5</span>
            </span>
        </span>
    );
}

export default function StudentViewInstructor() {
    const { id } = useParams();
    const instructor = id ? getInstructorById(id) : null;

    if (!instructor) {
        return (
            <Container className="aria-page-content py-5" style={{ minHeight: '60vh' }}>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} className="text-center">
                        <h1 className="h3 mb-3 text-primary">Instructor not found</h1>
                        <p className="aria-supporting-text mb-4">That profile may have been removed or the link is incorrect.</p>
                        <Button as={Link} to="/student/discover" variant="primary" type="button">
                            Back to Discover
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="aria-page-content py-4" style={{ minHeight: '75vh' }}>
            <Row className="justify-content-center mb-3">
                <Col lg={10}>
                    <Button as={Link} to="/student/discover" variant="outline-primary" size="sm" className="mb-3 rounded-3" type="button">
                        ← Discover instructors
                    </Button>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col lg={10}>
                    <Card className="aria-card-elevated overflow-hidden">
                        <Row className="g-0">
                            <Col md={5} lg={4}>
                                <div className="h-100 bg-light" style={{ minHeight: '280px' }}>
                                    <Card.Img
                                        src={instructor.imageUrl}
                                        alt={`Headshot of ${instructor.name}`}
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover', minHeight: '320px' }}
                                    />
                                </div>
                            </Col>
                            <Col md={7} lg={8}>
                                <Card.Body className="p-4 p-lg-5">
                                    <h1 className="h2 mb-2 text-primary">{instructor.name}</h1>
                                    <p className="aria-supporting-text mb-3">{instructor.degreeLevel}</p>
                                    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                                        <Badge bg="primary">{instructor.instrument}</Badge>
                                        <Badge bg="secondary">Age {instructor.age}</Badge>
                                    </div>
                                    <div className="mb-4">
                                        <StarRating value={instructor.rating} />
                                    </div>
                                    <h2 className="h5 mb-2">About</h2>
                                    <p className="text-body mb-4">{instructor.longBio}</p>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Button
                                            as={Link}
                                            to="/student/chat"
                                            state={{
                                                instructorId: instructor.id,
                                                instructorName: instructor.name,
                                            }}
                                            variant="primary"
                                            size="lg"
                                            className="rounded-3"
                                            type="button"
                                        >
                                            Start a chat with {instructor.name.split(' ')[0]}
                                        </Button>
                                        <Button as={Link} to="/student/dashboard" variant="outline-primary" size="lg" className="rounded-3" type="button">
                                            Student dashboard
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>

                    <Card className="mt-4 aria-card-nested">
                        <Card.Body className="p-4">
                            <h2 className="h6 text-uppercase aria-supporting-text mb-2">At a glance</h2>
                            <p className="mb-0">{instructor.shortBio}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
