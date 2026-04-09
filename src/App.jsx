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
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
        </>
        
    )
}