import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function InstructorChat() {
    const [students] = useState({
        active: [
            { id: 1, name: 'Alice', preview: 'Working on piano scales & sight-reading' },
            { id: 2, name: 'Bob', preview: 'Drum timing & rudiments' },
        ],
        prospective: [
            { id: 3, name: 'Charlie', preview: 'Interested in beginner guitar lessons' },
            { id: 4, name: 'Diana', preview: 'Looking for vocal coaching' },
        ]
    });

    const [selectedStudent, setSelectedStudent] = useState(students.active[0]);

    const [conversations, setConversations] = useState({
        1: [
            { sender: 'student', text: 'Can you help me practice my scales more effectively?' },
        ],
        2: [],
        3: [
            { sender: 'student', text: 'Hi, I am interested in guitar lessons!' }
        ],
        4: []
    });

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const studentId = selectedStudent.id;

        setConversations(prev => ({
            ...prev,
            [studentId]: [
                ...(prev[studentId] || []),
                { sender: 'instructor', text: newMessage }
            ]
        }));

        setNewMessage('');

        setTimeout(() => {
            setConversations(prev => ({
                ...prev,
                [studentId]: [
                    ...(prev[studentId] || []),
                    { sender: 'student', text: 'Got it, thanks! Can we go over that in the next lesson?' }
                ]
            }));
        }, 1000);
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

    const currentMessages = conversations[selectedStudent.id] || [];

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                {/* Sidebar */}
                <Col md={4} className="border-end overflow-auto">
                    <h4 className="mt-3">Students</h4>
                    {renderStudentList('Active Students', students.active)}
                    {renderStudentList('Prospective Students', students.prospective)}
                </Col>

                {/* Chat Area */}
                <Col md={8} className="d-flex flex-column">
                    <h4 className="mt-3">Chat with {selectedStudent.name} (Music Lessons)</h4>

                    <div
                        className="flex-grow-1 mb-3 p-3"
                        style={{ overflowY: 'auto', backgroundColor: '#f8f9fa' }}
                    >
                        {currentMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`d-flex mb-2 ${
                                    msg.sender === 'instructor'
                                        ? 'justify-content-end'
                                        : 'justify-content-start'
                                }`}
                            >
                                <div
                                    className={`p-3 rounded ${
                                        msg.sender === 'instructor'
                                            ? 'bg-primary text-white'
                                            : 'bg-light'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                    >
                        <Form.Group className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Ask about practice, technique, or lesson plans..."
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                            />
                            <Button type="submit" className="ms-2">
                                Send
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}