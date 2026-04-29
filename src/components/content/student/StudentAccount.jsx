// Account information for students

import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export default function StudentAccount() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: typeof localStorage !== 'undefined' ? localStorage.getItem('studentName') || 'Test Student' : 'Test Student',
        email: 'test@email.com',
        instrument: 'Piano',
        experienceLevel: 'Intermediate',
        gradeLevel: '10th grade',
        guardianName: 'Jamie Student',
        guardianEmail: 'guardian@example.com',
        goals: 'Working toward district solo festival and building confidence with performance.',
        avatarUrl: 'https://i.pravatar.cc/200?img=12',
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMessage('');
    };

    const handleConfirm = () => {
        if (typeof localStorage !== 'undefined' && formData.name.trim()) {
            localStorage.setItem('studentName', formData.name.trim());
        }
        setIsEditing(false);
        setMessage('Changes saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <Container className="aria-page-frame py-4">
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2 className="text-primary">Student account</h2>
                                <p className="text-muted mb-0">Your profile and learning preferences</p>
                            </div>

                            {message && (
                                <Alert variant="info" className="mb-4">
                                    {message}
                                </Alert>
                            )}

                            <Form>
                                <Row className="mb-3">
                                    <Col md={4} className="text-center">
                                        <div className="mb-3">
                                            <img
                                                src={formData.avatarUrl}
                                                alt="Your profile"
                                                className="rounded-circle border border-2 border-info"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        {isEditing && (
                                            <Form.Group>
                                                <Form.Label>Profile photo URL</Form.Label>
                                                <Form.Control
                                                    type="url"
                                                    name="avatarUrl"
                                                    value={formData.avatarUrl}
                                                    onChange={handleInputChange}
                                                    placeholder="Image URL"
                                                />
                                            </Form.Group>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Student name</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Your name"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0">{formData.name}</p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Email"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0">{formData.email}</p>
                                            )}
                                        </Form.Group>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Primary instrument</Form.Label>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="text"
                                                            name="instrument"
                                                            value={formData.instrument}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g. Violin"
                                                        />
                                                    ) : (
                                                        <p className="form-control-plaintext aria-field-plain mb-0">{formData.instrument}</p>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Experience level</Form.Label>
                                                    {isEditing ? (
                                                        <Form.Select
                                                            name="experienceLevel"
                                                            value={formData.experienceLevel}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option>Beginner</option>
                                                            <option>Intermediate</option>
                                                            <option>Advanced</option>
                                                        </Form.Select>
                                                    ) : (
                                                        <p className="form-control-plaintext aria-field-plain mb-0">
                                                            {formData.experienceLevel}
                                                        </p>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label>School grade (optional)</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="text"
                                                    name="gradeLevel"
                                                    value={formData.gradeLevel}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. 8th grade"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0">{formData.gradeLevel}</p>
                                            )}
                                        </Form.Group>

                                        <hr className="my-4" />
                                        <h6 className="text-muted text-uppercase small mb-3">Parent / guardian</h6>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Guardian name</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="text"
                                                    name="guardianName"
                                                    value={formData.guardianName}
                                                    onChange={handleInputChange}
                                                    placeholder="Name"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0">{formData.guardianName}</p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Guardian email</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="email"
                                                    name="guardianEmail"
                                                    value={formData.guardianEmail}
                                                    onChange={handleInputChange}
                                                    placeholder="Email"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0">{formData.guardianEmail}</p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Learning goals</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="goals"
                                                    value={formData.goals}
                                                    onChange={handleInputChange}
                                                    placeholder="What do you want to achieve with lessons?"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0" style={{ minHeight: '100px' }}>
                                                    {formData.goals}
                                                </p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    {!isEditing ? (
                                        <Button variant="primary" className="rounded-3 px-4" onClick={handleEdit}>
                                            Edit profile
                                        </Button>
                                    ) : (
                                        <Button variant="info" className="text-dark fw-semibold rounded-3 px-4" onClick={handleConfirm}>
                                            Save changes
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
