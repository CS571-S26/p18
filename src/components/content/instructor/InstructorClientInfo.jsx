import { useId, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

export default function InstructorStudents() {
    const [students] = useState({
        active: [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', preview: 'Working on piano scales & sight-reading' },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '987-654-3210', preview: 'Drum timing & rudiments' },
        ],
        prospective: [
            { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-555-5555', preview: 'Interested in beginner guitar lessons' },
        ],
    });

    const [selectedStudent, setSelectedStudent] = useState(students.active[0]);

    const [progressNotes, setProgressNotes] = useState({
        1: 'Practicing major scales in C and G. Improving hand coordination.',
        2: 'Struggling with keeping steady tempo during fills.',
        3: '',
    });

    const [curriculum, setCurriculum] = useState({
        1: [
            { topic: 'Major Scales (C, G, D)', completed: true },
            { topic: 'Sight Reading (Treble Clef)', completed: false },
        ],
        2: [
            { topic: 'Basic Rudiments (Singles & Doubles)', completed: true },
            { topic: 'Playing with a Metronome', completed: false },
        ],
        3: [],
    });

    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    const notesFieldId = useId();
    const fileFieldId = useId();

    const handleNoteChange = (value) => {
        setProgressNotes((prev) => ({
            ...prev,
            [selectedStudent.id]: value,
        }));
    };

    const toggleTopic = (index) => {
        setCurriculum((prev) => {
            const updated = [...(prev[selectedStudent.id] || [])];
            updated[index].completed = !updated[index].completed;
            return {
                ...prev,
                [selectedStudent.id]: updated,
            };
        });
    };

    const handleAddTopic = () => {
        setCurriculum((prev) => ({
            ...prev,
            [selectedStudent.id]: [...(prev[selectedStudent.id] || []), { topic: 'New Lesson Topic', completed: false }],
        }));
    };

    const startEditing = (index, currentText) => {
        setEditingIndex(index);
        setEditValue(currentText);
    };

    const saveEdit = (index) => {
        setCurriculum((prev) => {
            const updated = [...(prev[selectedStudent.id] || [])];
            updated[index].topic = editValue;
            return {
                ...prev,
                [selectedStudent.id]: updated,
            };
        });
        setEditingIndex(null);
        setEditValue('');
    };

    const selectStudent = (student) => {
        setSelectedStudent(student);
    };

    const handleStudentCardKeyDown = (e, student) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectStudent(student);
        }
    };

    const renderStudentList = (title, list) => (
        <>
            <h3 className="text-uppercase aria-supporting-text small fw-bold mt-4 mb-2">{title}</h3>
            {list.map((student) => {
                const active = selectedStudent.id === student.id;
                return (
                    <Card
                        key={student.id}
                        className={`mb-2 border-0 shadow-sm ${active ? 'aria-chat-thread-active' : ''}`}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={active}
                        aria-label={`${student.name}. ${student.preview}`}
                        onClick={() => selectStudent(student)}
                        onKeyDown={(e) => handleStudentCardKeyDown(e, student)}
                    >
                        <Card.Body className="py-3">
                            <div className="d-flex justify-content-between align-items-start gap-2">
                                <Card.Title as="p" className="h6 mb-1 fw-semibold mb-0">
                                    {student.name}
                                </Card.Title>
                            </div>
                            <Card.Text className="small aria-supporting-text mb-0">{student.preview}</Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );

    const currentCurriculum = curriculum[selectedStudent.id] || [];

    return (
        <Container fluid className="px-0" style={{ minHeight: 'calc(100vh - 4rem)' }}>
            <Row className="g-0" style={{ minHeight: 'calc(100vh - 4rem)' }}>
                <Col md={4} lg={3} className="border-end overflow-auto py-3 px-3 aria-instructor-panel">
                    <h2 className="mb-2 text-success h4">Students</h2>
                    <p className="small aria-supporting-text mb-0">Select a student to view contact info, notes, and lesson plan.</p>
                    {renderStudentList('Active students', students.active)}
                    {renderStudentList('Prospective', students.prospective)}
                </Col>

                <Col md={8} lg={9} className="p-4 overflow-auto aria-chat-main">
                    <section aria-labelledby="instructor-client-student-heading">
                        <h2 id="instructor-client-student-heading" className="text-primary h3">
                            {selectedStudent.name}
                        </h2>

                    <Card className="mb-3 aria-card-nested">
                        <Card.Body>
                            <Card.Title as="h3" className="h5">
                                Contact info
                            </Card.Title>
                            <p>
                                <strong>Email:</strong> {selectedStudent.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedStudent.phone}
                            </p>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3 aria-card-nested">
                        <Card.Body>
                            <Card.Title as="h3" className="h5">
                                Progress notes
                            </Card.Title>
                            <Form.Label htmlFor={notesFieldId} className="visually-hidden">
                                Progress notes for {selectedStudent.name}
                            </Form.Label>
                            <Form.Control
                                id={notesFieldId}
                                as="textarea"
                                rows={4}
                                value={progressNotes[selectedStudent.id] || ''}
                                onChange={(e) => handleNoteChange(e.target.value)}
                                placeholder="Track student progress, practice habits, and lesson notes..."
                            />
                        </Card.Body>
                    </Card>

                    <Card className="mb-3 aria-card-nested">
                        <Card.Body>
                            <Card.Title as="h3" className="h5">
                                Lesson plan
                            </Card.Title>
                            <ListGroup className="mb-2" aria-label="Lesson topics for this student">
                                {currentCurriculum.map((item, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        {editingIndex === index ? (
                                            <>
                                                <Form.Label className="visually-hidden" htmlFor={`lesson-topic-${selectedStudent.id}-${index}`}>
                                                    Edit topic name
                                                </Form.Label>
                                                <Form.Control
                                                    id={`lesson-topic-${selectedStudent.id}-${index}`}
                                                    size="sm"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="me-2"
                                                />
                                                <Button size="sm" type="button" onClick={() => saveEdit(index)}>
                                                    Save
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-link text-decoration-none text-start p-0 text-body"
                                                    onClick={() => toggleTopic(index)}
                                                    aria-label={`${item.completed ? 'Mark incomplete' : 'Mark complete'}: ${item.topic}`}
                                                >
                                                    {item.topic} {item.completed ? '✅' : '⬜'}
                                                </button>
                                                <Button
                                                    size="sm"
                                                    type="button"
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
                            <Button size="sm" type="button" onClick={handleAddTopic}>
                                Add lesson topic
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card className="aria-card-nested">
                        <Card.Body>
                            <Card.Title as="h3" className="h5">
                                Practice materials
                            </Card.Title>
                            <Form.Group className="mb-2">
                                <Form.Label htmlFor={fileFieldId}>Upload a file</Form.Label>
                                <Form.Control id={fileFieldId} type="file" accept=".pdf,.mp3,.wav,.m4a,.zip" />
                            </Form.Group>
                            <Button size="sm" type="button">
                                Upload
                            </Button>
                            <p className="mt-2 aria-supporting-text small mb-0">
                                Upload sheet music, exercises, or backing tracks for the student (PDFs, audio files, and practice
                                tracks recommended)
                            </p>
                        </Card.Body>
                    </Card>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}
