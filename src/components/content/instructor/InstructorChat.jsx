import { useId, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';

export default function InstructorChat() {
    const messageFieldId = useId();
    const [students] = useState({
        active: [
            { id: 1, name: 'Alice', preview: 'Working on piano scales & sight-reading' },
            { id: 2, name: 'Bob', preview: 'Drum timing & rudiments' },
        ],
        prospective: [
            { id: 3, name: 'Charlie', preview: 'Interested in beginner guitar lessons' },
            { id: 4, name: 'Diana', preview: 'Looking for vocal coaching' },
        ],
    });

    const [selectedStudent, setSelectedStudent] = useState(students.active[0]);

    const [conversations, setConversations] = useState({
        1: [{ sender: 'student', text: 'Can you help me practice my scales more effectively?' }],
        2: [],
        3: [{ sender: 'student', text: 'Hi, I am interested in guitar lessons!' }],
        4: [],
    });

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const studentId = selectedStudent.id;
        const text = newMessage;
        setNewMessage('');

        setConversations((prev) => ({
            ...prev,
            [studentId]: [...(prev[studentId] || []), { sender: 'instructor', text }],
        }));

        setTimeout(() => {
            setConversations((prev) => ({
                ...prev,
                [studentId]: [
                    ...(prev[studentId] || []),
                    { sender: 'student', text: 'Got it, thanks! Can we go over that in the next lesson?' },
                ],
            }));
        }, 1000);
    };

    const handleThreadKeyDown = (e, student) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedStudent(student);
        }
    };

    const renderStudentList = (title, list, badgeBg) => (
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
                        aria-label={`Open conversation with ${student.name}. ${student.preview}`}
                        onClick={() => setSelectedStudent(student)}
                        onKeyDown={(e) => handleThreadKeyDown(e, student)}
                    >
                        <Card.Body className="py-3">
                            <div className="d-flex justify-content-between align-items-start gap-2">
                                <Card.Title as="p" className="h6 mb-1 fw-semibold mb-0">
                                    {student.name}
                                </Card.Title>
                                <Badge bg={badgeBg} text="light">
                                    {badgeBg === 'success' ? 'Active' : 'Lead'}
                                </Badge>
                            </div>
                            <Card.Text className="small aria-supporting-text mb-0">{student.preview}</Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );

    const currentMessages = conversations[selectedStudent.id] || [];

    return (
        <Container fluid className="px-0" style={{ minHeight: 'calc(100vh - 4rem)' }}>
            <Row className="g-0" style={{ minHeight: 'calc(100vh - 4rem)' }}>
                <Col md={4} lg={3} className="border-end overflow-auto py-3 px-3 aria-instructor-panel" as="aside" aria-label="Student threads">
                    <h1 className="mb-2 text-success h4">Students</h1>
                    <p className="small aria-supporting-text mb-0">Reply to enrolled learners and prospective families.</p>
                    {renderStudentList('Active students', students.active, 'success')}
                    {renderStudentList('Prospective', students.prospective, 'secondary')}
                </Col>

                <Col md={8} lg={9} className="d-flex flex-column py-3 px-3 aria-chat-main" as="section" aria-labelledby="instructor-thread-heading">
                    <h2 id="instructor-thread-heading" className="mb-1 h4">
                        Chat with {selectedStudent.name}
                    </h2>
                    <p className="aria-supporting-text small mb-3">Music lessons · Aria</p>

                    <div
                        className="flex-grow-1 mb-3 p-3 rounded-3 border bg-white"
                        style={{ overflowY: 'auto', minHeight: '280px' }}
                        role="log"
                        aria-relevant="additions"
                        aria-label={`Messages with ${selectedStudent.name}`}
                    >
                        {currentMessages.length === 0 ? (
                            <p className="aria-supporting-text text-center py-5 mb-0">No messages yet in this thread.</p>
                        ) : (
                            currentMessages.map((msg, index) => (
                                <div
                                    key={`${index}-${msg.text.slice(0, 20)}`}
                                    className={`d-flex mb-3 ${
                                        msg.sender === 'instructor' ? 'justify-content-end' : 'justify-content-start'
                                    }`}
                                >
                                    <div
                                        className={`p-3 rounded-3 shadow-sm ${
                                            msg.sender === 'instructor' ? 'bg-success text-white' : 'bg-light border'
                                        }`}
                                        style={{ maxWidth: '78%' }}
                                    >
                                        <div className="small fw-semibold mb-1 opacity-90">
                                            {msg.sender === 'instructor' ? 'You' : selectedStudent.name}
                                        </div>
                                        {msg.text}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                    >
                        <Form.Label htmlFor={messageFieldId} className="visually-hidden">
                            Message to {selectedStudent.name}
                        </Form.Label>
                        <Form.Group className="d-flex gap-2">
                            <Form.Control
                                id={messageFieldId}
                                type="text"
                                placeholder="Ask about practice, technique, or lesson plans…"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="border-secondary"
                            />
                            <Button type="submit" variant="success" className="px-4">
                                Send
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
