import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Home from './components/content/Home'
import NotFound from './components/content/NotFound'
import Student from './components/auth/Student'
import Instructor from './components/auth/Instructor'
import StudentLogin from './components/auth/student/StudentLogin'
import InstructorLogin from './components/auth/instructor/InstructorLogin'
import StudentRegister from './components/auth/student/StudentRegister'
import InstructorRegister from './components/auth/instructor/InstructorRegister'
import InstructorDashboard from './components/content/instructor/InstructorDashboard'
import InstructorAccount from './components/content/instructor/InstructorAccount'
import InstructorChat from './components/content/instructor/InstructorChat'
import InstructorClientInfo from './components/content/instructor/InstructorClientInfo'
import StudentDashboard from './components/content/student/StudentDashbaord'
import StudentAccount from './components/content/student/StudentAccount'
import StudentChat from './components/content/student/StudentChat'
import StudentDiscover from './components/content/student/StudentDiscover'
import StudentLessonMaterials from './components/content/student/StudentLessonMaterials'


export default function App() 
{
    // Router
    return (
        <>
        {/* NavBar */}
        <Navbar/>
        <div style={{ paddingTop: '1rem' }}>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/student" element={<Student />} />
                <Route path="/instructor" element={<Instructor />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/instructor/login" element={<InstructorLogin />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/instructor/register" element={<InstructorRegister />} />
                <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                <Route path="/instructor/account" element={<InstructorAccount />} />
                <Route path="/instructor/chat" element={<InstructorChat />} />
                <Route path="/instructor/clientinfo" element={<InstructorClientInfo />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/account" element={<StudentAccount />} />
                <Route path="/student/chat" element={<StudentChat />} />
                <Route path="/student/discover" element={<StudentDiscover />} />
                <Route path="/student/lessonmaterials" element={<StudentLessonMaterials />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
        </>
        
    )
}