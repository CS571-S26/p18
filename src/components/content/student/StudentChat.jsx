// Chat with instructors — same interaction model as InstructorChat, student-first layout

import { useId, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const DEFAULT_CONNECTED = [
    { id: '7', name: 'Taylor Morgan', preview: 'Cello: bow exercises for this week' },
    { id: '2', name: 'Jordan Ellis', preview: 'Great work on that blues scale run!' },
];

const DEFAULT_OUTREACH = [
    { id: '3', name: 'Sam Rivera', preview: 'Trumpet — asking about weekend availability' },
    { id: '4', name: 'Avery Brooks', preview: 'Voice: audition piece feedback' },
];

function buildInstructors(state) {
    let connected = [...DEFAULT_CONNECTED];
    const outreach = [...DEFAULT_OUTREACH];
    if (state?.instructorId != null && state?.instructorName) {
        const id = String(state.instructorId);
        const inConnected = connected.some((c) => c.id === id);
        const inOutreach = outreach.some((c) => c.id === id);
        if (!inConnected && !inOutreach) {
            connected = [{ id, name: state.instructorName, preview: 'New thread from Discover' }, ...connected];
        }
    }
    return { connected, outreach };
}

function getInitialSelected(instructors, state) {
    if (state?.instructorId != null) {
        const id = String(state.instructorId);
        const all = [...instructors.connected, ...instructors.outreach];
        const found = all.find((i) => String(i.id) === id);
        if (found) return found;
    }
    return instructors.connected[0] ?? instructors.outreach[0];
}

export default function StudentChat() {
    const location = useLocation();
    const messageFieldId = useId();
    const [instructors] = useState(() => buildInstructors(location.state));
    const [selectedInstructor, setSelectedInstructor] = useState(() =>
        getInitialSelected(buildInstructors(location.state), location.state)
    );

    const [conversations, setConversations] = useState({
        7: [
            { sender: 'instructor', text: "Hi! This week let's focus on smooth bow changes on the open strings." },
            { sender: 'student', text: 'Sounds good — should I record myself and send a clip?' },
        ],
        2: [{ sender: 'instructor', text: 'Bring your metronome set to 72 bpm for the ii-V lick we charted.' }],
        3: [{ sender: 'student', text: 'Hi Sam, are you free Saturday mornings for trumpet?' }],
        4: [],
    });

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const id = String(selectedInstructor.id);
        const text = newMessage;
        setNewMessage('');

        setConversations((prev) => ({
            ...prev,
            [id]: [...(prev[id] || []), { sender: 'student', text }],
        }));

        setTimeout(() => {
            setConversations((prev) => ({
                ...prev,
                [id]: [
                    ...(prev[id] || []),
                    {
                        sender: 'instructor',
                        text: "Thanks for the message! I'll reply with more detail before your next lesson.",
                    },
                ],
            }));
        }, 1000);
    };

    const handleThreadKeyDown = (e, inst) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedInstructor(inst);
        }
    };

    const renderInstructorList = (title, list, badgeVariant) => (
        <>
            <h3 className="text-uppercase aria-supporting-text small fw-bold mt-4 mb-2">{title}</h3>
            {list.map((inst) => {
                const active = String(selectedInstructor.id) === String(inst.id);
                return (
                    <Card
                        key={inst.id}
                        className={`mb-2 border-0 shadow-sm ${active ? 'aria-chat-thread-student' : ''}`}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={active}
                        aria-label={`Open conversation with ${inst.name}. ${inst.preview}`}
                        onClick={() => setSelectedInstructor(inst)}
                        onKeyDown={(e) => handleThreadKeyDown(e, inst)}
                    >
                        <Card.Body className="py-3">
                            <div className="d-flex justify-content-between align-items-start gap-2">
                                <Card.Title as="p" className="h6 mb-1 fw-semibold mb-0">
                                    {inst.name}
                                </Card.Title>
                                <Badge bg={badgeVariant} text={badgeVariant === 'info' ? 'dark' : 'light'}>
                                    {badgeVariant === 'info' ? 'Lessons' : 'Inbox'}
                                </Badge>
                            </div>
                            <Card.Text className="small aria-supporting-text mb-0">{inst.preview}</Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );

    const currentKey = String(selectedInstructor.id);
    const currentMessages = conversations[currentKey] || [];

    return (
        <Container fluid className="px-0" style={{ minHeight: 'calc(100vh - 4rem)' }}>
            <Row className="g-0" style={{ minHeight: 'calc(100vh - 4rem)' }}>
                <Col md={4} lg={3} className="border-end overflow-auto py-3 px-3 aria-student-panel" as="aside" aria-label="Instructor threads">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h1 className="mb-0 text-primary h4">Messages</h1>
                        <Button as={Link} to="/student/discover" variant="outline-primary" size="sm" type="button">
                            Find instructors
                        </Button>
                    </div>
                    <p className="small aria-supporting-text mb-0">Chat with your Aria instructors in one place.</p>
                    {renderInstructorList('My instructors', instructors.connected, 'info')}
                    {renderInstructorList('Updates & outreach', instructors.outreach, 'secondary')}
                </Col>

                <Col md={8} lg={9} className="d-flex flex-column py-3 px-3 aria-chat-main" as="section" aria-labelledby="thread-heading">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <div>
                            <h2 id="thread-heading" className="mb-0 h4">
                                {selectedInstructor.name}
                            </h2>
                            <span className="aria-supporting-text small">Private music lessons on Aria</span>
                        </div>
                        <Button as={Link} to={`/student/instructor/${selectedInstructor.id}`} variant="light" className="border" type="button">
                            View profile
                        </Button>
                    </div>

                    <div
                        className="flex-grow-1 mb-3 p-3 rounded-3 border bg-white"
                        style={{ overflowY: 'auto', minHeight: '280px' }}
                        role="log"
                        aria-relevant="additions"
                        aria-label={`Messages with ${selectedInstructor.name}`}
                    >
                        {currentMessages.length === 0 ? (
                            <p className="aria-supporting-text text-center py-5 mb-0">
                                No messages yet — say hello to start the conversation.
                            </p>
                        ) : (
                            currentMessages.map((msg, index) => (
                                <div
                                    key={`${index}-${msg.text.slice(0, 24)}`}
                                    className={`d-flex mb-3 ${msg.sender === 'student' ? 'justify-content-end' : 'justify-content-start'}`}
                                >
                                    <div
                                        className={`p-3 rounded-3 shadow-sm ${
                                            msg.sender === 'student' ? 'bg-info text-dark' : 'bg-light border'
                                        }`}
                                        style={{ maxWidth: '78%' }}
                                    >
                                        <div className="small fw-semibold mb-1 text-body-secondary">
                                            {msg.sender === 'student' ? 'You' : selectedInstructor.name}
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
                            Message to {selectedInstructor.name}
                        </Form.Label>
                        <Form.Group className="d-flex gap-2 align-items-stretch">
                            <Form.Control
                                id={messageFieldId}
                                type="text"
                                placeholder="Ask a question, share a practice update, or coordinate your next lesson…"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="border-secondary"
                            />
                            <Button type="submit" variant="info" className="text-dark fw-semibold px-4">
                                Send
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
