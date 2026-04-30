// Discover instructors — search, filters, paginated directory; profiles on StudentViewInstructor

import { useEffect, useId, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Pagination, Badge, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { INSTRUCTORS } from '../../../data/instructors';

const PAGE_SIZE = 6;

/** Rough degree bucket for filter dropdown */
function educationCategory(degreeLevel) {
    const s = degreeLevel;
    if (/Ph\.D|PhD/i.test(s)) return 'doctoral';
    if (/M\.M\./i.test(s)) return 'masters';
    if (/Certificate/i.test(s)) return 'certificate';
    if (/B\.M\.|B\.A\./i.test(s)) return 'bachelors';
    return 'other';
}

function normalize(s) {
    return s.trim().toLowerCase();
}

function filterInstructors(list, { query, instrument, education, minRating, minAge, maxAge }) {
    const q = normalize(query);
    return list.filter((inst) => {
        if (q) {
            const hay = [inst.name, inst.degreeLevel, inst.instrument, inst.shortBio, inst.longBio]
                .join(' ')
                .toLowerCase();
            if (!hay.includes(q)) return false;
        }
        if (instrument && inst.instrument !== instrument) return false;
        if (education && educationCategory(inst.degreeLevel) !== education) return false;
        if (minRating !== '' && Number(minRating) > 0 && inst.rating < Number(minRating)) return false;
        const minAS = String(minAge).trim();
        const maxAS = String(maxAge).trim();
        if (minAS !== '' && !Number.isNaN(Number(minAS)) && inst.age < Number(minAS)) return false;
        if (maxAS !== '' && !Number.isNaN(Number(maxAS)) && inst.age > Number(maxAS)) return false;
        return true;
    });
}

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
                <span className="aria-supporting-text ms-1 small">{value.toFixed(1)}</span>
            </span>
        </span>
    );
}

const INSTRUMENT_OPTIONS = [...new Set(INSTRUCTORS.map((i) => i.instrument))].sort((a, b) => a.localeCompare(b));

export default function StudentDiscover() {
    const formId = useId();
    const searchFieldId = `${formId}-search`;
    const instrumentFieldId = `${formId}-instrument`;
    const educationFieldId = `${formId}-education`;
    const ratingFieldId = `${formId}-rating`;
    const minAgeFieldId = `${formId}-min-age`;
    const maxAgeFieldId = `${formId}-max-age`;

    const [query, setQuery] = useState('');
    const [instrument, setInstrument] = useState('');
    const [education, setEducation] = useState('');
    const [minRating, setMinRating] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [page, setPage] = useState(1);

    const filters = useMemo(
        () => ({ query, instrument, education, minRating, minAge, maxAge }),
        [query, instrument, education, minRating, minAge, maxAge]
    );

    const filtered = useMemo(() => filterInstructors(INSTRUCTORS, filters), [filters]);

    useEffect(() => {
        setPage(1);
    }, [query, instrument, education, minRating, minAge, maxAge]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const slice = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, page]);

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

    const clearFilters = () => {
        setQuery('');
        setInstrument('');
        setEducation('');
        setMinRating('');
        setMinAge('');
        setMaxAge('');
    };

    const hasActiveFilters =
        query.trim() !== '' || instrument !== '' || education !== '' || minRating !== '' || minAge !== '' || maxAge !== '';

    return (
        <Container className="aria-page-content py-4" style={{ minHeight: '75vh' }}>
            <Row className="justify-content-center mb-4">
                <Col lg={10}>
                    <h1 className="mb-2 text-primary">Discover instructors</h1>
                    <p className="aria-supporting-text mb-0">
                        Search by name or keyword, or narrow by instrument, education, age, and ratings.
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center mb-4">
                <Col lg={10}>
                    <Card className="aria-card-nested">
                        <Card.Body className="p-3 p-md-4">
                            <h2 className="h5 mb-3">Search and filter</h2>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <Row className="g-3">
                                    <Col md={12}>
                                        <Form.Label htmlFor={searchFieldId} className="small aria-supporting-text mb-1">
                                            Search
                                        </Form.Label>
                                        <Form.Control
                                            id={searchFieldId}
                                            type="search"
                                            placeholder="Name, instrument, degree, or topic…"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Label htmlFor={instrumentFieldId} className="small aria-supporting-text mb-1">
                                            Instrument
                                        </Form.Label>
                                        <Form.Select
                                            id={instrumentFieldId}
                                            value={instrument}
                                            onChange={(e) => setInstrument(e.target.value)}
                                        >
                                            <option value="">Any instrument</option>
                                            {INSTRUMENT_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Label htmlFor={educationFieldId} className="small aria-supporting-text mb-1">
                                            Education level
                                        </Form.Label>
                                        <Form.Select
                                            id={educationFieldId}
                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                        >
                                            <option value="">Any level</option>
                                            <option value="bachelors">Bachelor&apos;s (B.M. / B.A.)</option>
                                            <option value="masters">Master&apos;s (M.M.)</option>
                                            <option value="doctoral">Doctorate (Ph.D.)</option>
                                            <option value="certificate">Certificate</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Label htmlFor={ratingFieldId} className="small aria-supporting-text mb-1">
                                            Minimum rating
                                        </Form.Label>
                                        <Form.Select
                                            id={ratingFieldId}
                                            value={minRating}
                                            onChange={(e) => setMinRating(e.target.value)}
                                        >
                                            <option value="">Any rating</option>
                                            <option value="4">4+ stars</option>
                                            <option value="4.5">4.5+ stars</option>
                                            <option value="5">5 stars only</option>
                                        </Form.Select>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Form.Label htmlFor={minAgeFieldId} className="small aria-supporting-text mb-1">
                                            Min age
                                        </Form.Label>
                                        <Form.Control
                                            id={minAgeFieldId}
                                            type="number"
                                            min={18}
                                            max={99}
                                            placeholder="Any"
                                            value={minAge}
                                            onChange={(e) => setMinAge(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Form.Label htmlFor={maxAgeFieldId} className="small aria-supporting-text mb-1">
                                            Max age
                                        </Form.Label>
                                        <Form.Control
                                            id={maxAgeFieldId}
                                            type="number"
                                            min={18}
                                            max={99}
                                            placeholder="Any"
                                            value={maxAge}
                                            onChange={(e) => setMaxAge(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={12} md={6} className="d-flex align-items-end gap-2 flex-wrap">
                                        <Button type="button" variant="outline-secondary" onClick={clearFilters} disabled={!hasActiveFilters}>
                                            Clear filters
                                        </Button>
                                        <span className="aria-supporting-text small ms-md-auto">
                                            Showing {filtered.length} of {INSTRUCTORS.length}
                                        </span>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center g-4">
                <Col lg={10}>
                    <h2 className="visually-hidden">Instructor results</h2>
                    {filtered.length === 0 ? (
                        <Card className="aria-card-nested text-center py-5">
                            <Card.Body>
                                <p className="aria-supporting-text mb-3">No instructors match those filters.</p>
                                <Button variant="primary" size="sm" type="button" onClick={clearFilters}>
                                    Reset search &amp; filters
                                </Button>
                            </Card.Body>
                        </Card>
                    ) : (
                        <>
                            <Row className="g-4">
                                {slice.map((instructor) => (
                                    <Col key={instructor.id} md={6} xl={4}>
                                        <Card className="h-100 aria-card-nested position-relative">
                                            <div className="ratio ratio-1x1 bg-light" style={{ maxHeight: '220px' }}>
                                                <Card.Img
                                                    variant="top"
                                                    src={instructor.imageUrl}
                                                    alt={`Photo of ${instructor.name}`}
                                                    className="w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title as="h3" className="h5 mb-1">
                                                    {instructor.name}
                                                </Card.Title>
                                                <div className="small aria-supporting-text mb-2">{instructor.degreeLevel}</div>
                                                <div className="d-flex flex-wrap gap-2 mb-2">
                                                    <Badge bg="primary">{instructor.instrument}</Badge>
                                                    <Badge bg="secondary">Age {instructor.age}</Badge>
                                                </div>
                                                <div className="mb-2">
                                                    <StarRating value={instructor.rating} />
                                                </div>
                                                <Card.Text className="aria-supporting-text small flex-grow-1">{instructor.shortBio}</Card.Text>
                                                <Link
                                                    to={`/student/instructor/${instructor.id}`}
                                                    className="stretched-link text-decoration-none"
                                                    aria-label={`View profile for ${instructor.name}`}
                                                />
                                                <span className="text-primary small fw-semibold mt-1" aria-hidden="true">
                                                    View profile →
                                                </span>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {totalPages > 1 && (
                                <nav className="d-flex justify-content-center mt-4" aria-label="Instructor list pages">
                                    <Pagination className="mb-0">
                                        <Pagination.Prev
                                            disabled={page <= 1}
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            aria-label="Previous page"
                                        />
                                        {paginationItems}
                                        <Pagination.Next
                                            disabled={page >= totalPages}
                                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                            aria-label="Next page"
                                        />
                                    </Pagination>
                                </nav>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
