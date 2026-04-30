// Lesson materials shared by instructors

import { useId, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';

const MATERIALS = [
    {
        id: '1',
        title: 'Major scales — two octaves (piano)',
        instructor: 'Maya Chen',
        type: 'PDF',
        updated: 'Apr 12, 2026',
        description: 'Fingerings and tempo goals for this month.',
    },
    {
        id: '2',
        title: 'Blues ii-V backing track — B♭',
        instructor: 'Jordan Ellis',
        type: 'Audio',
        updated: 'Apr 10, 2026',
        description: 'Practice improvising with the chart from lesson 6.',
    },
    {
        id: '3',
        title: 'Long-tone routine (trumpet)',
        instructor: 'Sam Rivera',
        type: 'PDF',
        updated: 'Apr 8, 2026',
        description: 'Daily warmup before repertoire work.',
    },
    {
        id: '4',
        title: 'Art song pronunciation guide',
        instructor: 'Avery Brooks',
        type: 'PDF',
        updated: 'Apr 5, 2026',
        description: 'IPA for your current German set.',
    },
    {
        id: '5',
        title: 'Cello bow distribution worksheet',
        instructor: 'Taylor Morgan',
        type: 'PDF',
        updated: 'Apr 18, 2026',
        description: 'Exercises for even sound at the tip.',
    },
];

const typeVariant = {
    PDF: 'danger',
    Audio: 'primary',
    Video: 'success',
};

export default function StudentLessonMaterials() {
    const searchId = useId();
    const [query, setQuery] = useState('');

    const filtered = MATERIALS.filter((m) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
            m.title.toLowerCase().includes(q) ||
            m.instructor.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q)
        );
    });

    return (
        <Container className="aria-page-content py-4" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center mb-4">
                <Col lg={10}>
                    <h1 className="mb-2 text-primary">Lesson materials</h1>
                    <p className="aria-supporting-text mb-4">
                        Files and links your instructors have shared.
                    </p>
                    <Form.Group className="mb-0" controlId={searchId}>
                        <Form.Label className="fw-semibold">Search materials</Form.Label>
                        <Form.Control
                            className="shadow-sm"
                            type="search"
                            placeholder="Search by title, instructor, or topic…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center g-4">
                <Col lg={10}>
                    <section aria-labelledby="materials-list-heading">
                        <h2 id="materials-list-heading" className="h5 mb-3">
                            Your materials
                        </h2>
                        {filtered.length === 0 ? (
                            <Card className="aria-card-nested">
                                <Card.Body className="text-center aria-supporting-text py-5">
                                    No materials match that search.
                                </Card.Body>
                            </Card>
                        ) : (
                            filtered.map((item) => (
                                <Card key={item.id} className="mb-3 aria-card-nested">
                                    <Card.Body className="p-4">
                                        <Row className="align-items-center">
                                            <Col md={8}>
                                                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                                    <Card.Title as="h3" className="h5 mb-0">
                                                        {item.title}
                                                    </Card.Title>
                                                    <Badge bg={typeVariant[item.type] || 'secondary'}>{item.type}</Badge>
                                                </div>
                                                <p className="aria-supporting-text small mb-2">
                                                    From <strong>{item.instructor}</strong> · Updated {item.updated}
                                                </p>
                                                <p className="mb-0">{item.description}</p>
                                            </Col>
                                            <Col md={4} className="mt-3 mt-md-0 text-md-end">
                                                <Button type="button" variant="primary" className="me-2 mb-2 mb-md-0 rounded-3">
                                                    Open
                                                </Button>
                                                <Button type="button" variant="outline-primary" className="rounded-3">
                                                    Download
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </section>
                </Col>
            </Row>
        </Container>
    );
}
