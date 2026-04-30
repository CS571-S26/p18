import { useId, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

export default function InstructorAccount() {
    const id = useId();
    const field = (name) => `${id}-${name}`;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        degree: 'PhD in Music Education: Senior',
        email: 'john.doe@example.com',
        bio: 'Has had over 10 students, multiple of whom have gone to music school.',
        headshot: 'https://via.placeholder.com/150',
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
        setIsEditing(false);
        setMessage('Changes saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <Container className="aria-page-frame">
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="aria-card-elevated">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h1 className="text-primary h2">Instructor account</h1>
                                <p className="aria-supporting-text mb-0">Manage your profile information</p>
                            </div>

                            {message && (
                                <Alert variant="info" className="mb-4" role="status" aria-live="polite">
                                    {message}
                                </Alert>
                            )}

                            <Form>
                                <Row className="mb-3">
                                    <Col md={4} className="text-center">
                                        <div className="mb-3">
                                            <img
                                                src={formData.headshot}
                                                alt={`Profile photo for ${formData.name}`}
                                                className="rounded-circle border border-2 border-success"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        {isEditing && (
                                            <Form.Group>
                                                <Form.Label htmlFor={field('headshot')}>Headshot URL</Form.Label>
                                                <Form.Control
                                                    id={field('headshot')}
                                                    type="url"
                                                    name="headshot"
                                                    value={formData.headshot}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter image URL"
                                                />
                                            </Form.Group>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor={field('name')}>Name</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    id={field('name')}
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your name"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0" id={field('name')}>
                                                    {formData.name}
                                                </p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor={field('degree')}>Degree</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    id={field('degree')}
                                                    type="text"
                                                    name="degree"
                                                    value={formData.degree}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your degree"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0" id={field('degree')}>
                                                    {formData.degree}
                                                </p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor={field('email')}>Email</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    id={field('email')}
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext aria-field-plain mb-0" id={field('email')}>
                                                    {formData.email}
                                                </p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor={field('bio')}>Bio</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    id={field('bio')}
                                                    as="textarea"
                                                    rows={4}
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your bio"
                                                />
                                            ) : (
                                                <p
                                                    className="form-control-plaintext aria-field-plain mb-0"
                                                    id={field('bio')}
                                                    style={{ minHeight: '100px' }}
                                                >
                                                    {formData.bio}
                                                </p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    {!isEditing ? (
                                        <Button
                                            type="button"
                                            variant="primary"
                                            className="rounded-3 px-4"
                                            onClick={handleEdit}
                                        >
                                            Edit profile
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="success"
                                            className="rounded-3 px-4"
                                            onClick={handleConfirm}
                                        >
                                            Confirm changes
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
