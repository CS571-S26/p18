import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

export default function InstructorStudents() {
    const [students] = useState({
        active: [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', preview: 'Working on piano scales & sight-reading' },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '987-654-3210', preview: 'Drum timing & rudiments' },
        ],
        prospective: [
            { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-555-5555', preview: 'Interested in beginner guitar lessons' },
        ]
    });

    const [selectedStudent, setSelectedStudent] = useState(students.active[0]);

    const [progressNotes, setProgressNotes] = useState({
        1: 'Practicing major scales in C and G. Improving hand coordination.',
        2: 'Struggling with keeping steady tempo during fills.',
        3: ''
    });

    const [curriculum, setCurriculum] = useState({
        1: [
            { topic: 'Major Scales (C, G, D)', completed: true },
            { topic: 'Sight Reading (Treble Clef)', completed: false }
        ],
        2: [
            { topic: 'Basic Rudiments (Singles & Doubles)', completed: true },
            { topic: 'Playing with a Metronome', completed: false }
        ],
        3: []
    });

    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleNoteChange = (value) => {
        setProgressNotes(prev => ({
            ...prev,
            [selectedStudent.id]: value
        }));
    };

    const toggleTopic = (index) => {
        setCurriculum(prev => {
            const updated = [...(prev[selectedStudent.id] || [])];
            updated[index].completed = !updated[index].completed;
            return {
                ...prev,
                [selectedStudent.id]: updated
            };
        });
    };

    const handleAddTopic = () => {
        setCurriculum(prev => ({
            ...prev,
            [selectedStudent.id]: [
                ...(prev[selectedStudent.id] || []),
                { topic: 'New Lesson Topic', completed: false }
            ]
        }));
    };

    const startEditing = (index, currentText) => {
        setEditingIndex(index);
        setEditValue(currentText);
    };

    const saveEdit = (index) => {
        setCurriculum(prev => {
            const updated = [...(prev[selectedStudent.id] || [])];
            updated[index].topic = editValue;
            return {
                ...prev,
                [selectedStudent.id]: updated
            };
        });
        setEditingIndex(null);
        setEditValue('');
    };

    const renderStudentList = (title, list) => (
        <>
            <h5 className="mt-3">{title}</h5>
            {list.map(student => (
                <Card
                    key={student.id}
                    className={`mb-2 ${selectedStudent.id === student.id ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedStudent(student)}
                >
                    <Card.Body>
                        <Card.Title>{student.name}</Card.Title>
                        <Card.Text>{student.preview}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );

    const currentCurriculum = curriculum[selectedStudent.id] || [];

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col md={4} className="border-end overflow-auto">
                    <h4 className="mt-3">Students</h4>
                    {renderStudentList('Active Students', students.active)}
                    {renderStudentList('Prospective Students', students.prospective)}
                </Col>

                <Col md={8} className="p-4 overflow-auto">
                    <h3>{selectedStudent.name}</h3>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Contact Info</Card.Title>
                            <p><strong>Email:</strong> {selectedStudent.email}</p>
                            <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Progress Notes</Card.Title>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={progressNotes[selectedStudent.id] || ''}
                                onChange={(e) => handleNoteChange(e.target.value)}
                                placeholder="Track student progress, practice habits, and lesson notes..."
                            />
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Lesson Plan</Card.Title>
                            <ListGroup className="mb-2">
                                {currentCurriculum.map((item, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {editingIndex === index ? (
                                            <>
                                                <Form.Control
                                                    size="sm"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="me-2"
                                                />
                                                <Button size="sm" onClick={() => saveEdit(index)}>
                                                    Save
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <span onClick={() => toggleTopic(index)} style={{ cursor: 'pointer' }}>
                                                    {item.topic} {item.completed ? '✅' : '⬜'}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="outline-secondary"
                                                    onClick={() => startEditing(index, item.topic)}
                                                >
                                                    Edit
                                                </Button>
                                            </>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button size="sm" onClick={handleAddTopic}>
                                Add Lesson Topic
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <Card.Title>Practice Materials</Card.Title>
                            <Form.Group className="mb-2">
                                <Form.Control type="file" />
                            </Form.Group>
                            <Button size="sm">Upload</Button>
                            <p className="mt-2 text-muted">
                                Upload sheet music, exercises, or backing tracks for the student (PDFs, audio files, and practice tracks recommended)
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}