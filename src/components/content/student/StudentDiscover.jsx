// Discover instructors — paginated directory; full profiles on StudentViewInstructor

import { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Pagination, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { INSTRUCTORS } from '../../../data/instructors';

const PAGE_SIZE = 6;

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
        <span className="d-inline-flex align-items-center flex-wrap" aria-label={`${value} out of 5 stars`}>
            {stars}
            <span className="text-muted ms-1 small">{value.toFixed(1)}</span>
        </span>
    );
}

export default function StudentDiscover() {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(INSTRUCTORS.length / PAGE_SIZE));

    const slice = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return INSTRUCTORS.slice(start, start + PAGE_SIZE);
    }, [page]);

    const paginationItems = useMemo(() => {
        const items = [];
        for (let p = 1; p <= totalPages; p += 1) {
            items.push(
                <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
                    {p}
                </Pagination.Item>
            );
        }
        return items;
    }, [page, totalPages]);

    return (
        <Container className="aria-page-content py-4" style={{ minHeight: '75vh' }}>
            <Row className="justify-content-center mb-4">
                <Col lg={10}>
                    <h1 className="mb-2 text-primary">Discover instructors</h1>
                    <p className="text-muted mb-0">
                        Browse Aria instructors by instrument and background. Select a profile to read more and start a conversation.
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center g-4">
                <Col lg={10}>
                    <Row className="g-4">
                        {slice.map((instructor) => (
                            <Col key={instructor.id} md={6} xl={4}>
                                <Card className="h-100 aria-card-nested position-relative">
                                    <div className="ratio ratio-1x1 bg-light" style={{ maxHeight: '220px' }}>
                                        <Card.Img
                                            variant="top"
                                            src={instructor.imageUrl}
                                            alt={`Headshot of ${instructor.name}`}
                                            className="w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="h5 mb-1">{instructor.name}</Card.Title>
                                        <div className="small text-muted mb-2">{instructor.degreeLevel}</div>
                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            <Badge bg="primary">{instructor.instrument}</Badge>
                                            <Badge bg="secondary">Age {instructor.age}</Badge>
                                        </div>
                                        <div className="mb-2">
                                            <StarRating value={instructor.rating} />
                                        </div>
                                        <Card.Text className="text-muted small flex-grow-1">{instructor.shortBio}</Card.Text>
                                        <Link
                                            to={`/student/instructor/${instructor.id}`}
                                            className="stretched-link text-decoration-none"
                                            aria-label={`View profile for ${instructor.name}`}
                                        />
                                        <span className="text-primary small fw-semibold mt-1">View profile →</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination className="mb-0">
                                <Pagination.Prev disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} />
                                {paginationItems}
                                <Pagination.Next disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                            </Pagination>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
