import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

export default function InstructorAccount() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        degree: 'PhD in Music Education: Senior',
        email: 'john.doe@example.com',
        bio: 'Has had over 10 students, multiple of whom have gone to music school.',
        headshot: 'https://via.placeholder.com/150' // Placeholder image URL
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMessage('');
    };

    const handleConfirm = () => {
        // TODO: Implement API call to save changes
        setIsEditing(false);
        setMessage('Changes saved successfully!');
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2>Instructor Account</h2>
                                <p className="text-muted">Manage your profile information</p>
                            </div>

                            {message && (
                                <Alert variant="success" className="mb-4">
                                    {message}
                                </Alert>
                            )}

                            <Form>
                                <Row className="mb-3">
                                    <Col md={4} className="text-center">
                                        <div className="mb-3">
                                            <img
                                                src={formData.headshot}
                                                alt="Headshot"
                                                className="rounded-circle"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        {isEditing && (
                                            <Form.Group>
                                                <Form.Label>Headshot URL</Form.Label>
                                                <Form.Control
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
                                            <Form.Label>Name</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your name"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext border p-2 rounded">{formData.name}</p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Degree</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="text"
                                                    name="degree"
                                                    value={formData.degree}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your degree"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext border p-2 rounded">{formData.degree}</p>
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
                                                    placeholder="Enter your email"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext border p-2 rounded">{formData.email}</p>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Bio</Form.Label>
                                            {isEditing ? (
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your bio"
                                                />
                                            ) : (
                                                <p className="form-control-plaintext border p-2 rounded" style={{ minHeight: '100px' }}>{formData.bio}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    {!isEditing ? (
                                        <Button variant="primary" onClick={handleEdit}>
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <Button variant="success" onClick={handleConfirm}>
                                            Confirm Changes
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