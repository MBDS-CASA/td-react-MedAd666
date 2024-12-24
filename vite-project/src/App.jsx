import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import image from './assets/EMSI.png';
import data from '/home/adarrab/td-react-Mohammed_Amine_Adarrab/data.json';

//
// --- STYLES ---
const cardStyle = {
    margin: '2rem auto',
    width: '90%',
    maxWidth: '50rem',
    backgroundColor: '#2f1d43',
    color: '#ebe7ef',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    padding: '2rem',
};

const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#7925d3',
    color: '#ebe7ef',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
};

const randomButtonStyle = {
    padding: '8px 16px',
    marginTop: '1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#7925d3',
    color: '#ebe7ef',
    fontWeight: 'bold',
};

//
// Menu items for the navbar
//
const menuItems = [
    { label: 'Notes', value: 'grades' },
    { label: 'Etudiants', value: 'students' },
    { label: 'Matières', value: 'subjects' },
];

function App() {
    const [view, setView] = useState('');

    return (
        <>
            <nav
                style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    zIndex: 999,
                }}
            >
                {menuItems.map((menuItem, index) => (
                    <button
                        key={index}
                        style={buttonStyle}
                        onClick={() => setView(menuItem.value)}
                    >
                        {menuItem.label}
                    </button>
                ))}
            </nav>

            <Header />

            <div>
                <MainContent />

                <div style={cardStyle}>
                    <center>
                        <RandomItem />
                    </center>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ textAlign: 'center' }}>Toutes les Informations des Etudiants :</h2>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        {view === 'grades' && <AllGrades />}
                        {view === 'students' && <AllStudents />}
                        {view === 'subjects' && <AllSubjects />}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

function AllGrades() {
    const uniqueGrades = [...new Set(data.map((item) => item.grade))];

    const fadeStyles = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.div style={fadeStyles}>
            <TableContainer component={Paper}>
                <Table aria-label="grades table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uniqueGrades.map((grade, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {grade}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </animated.div>
    );
}

//
// AllStudents with Search Feature
//
function AllStudents() {
    // For our search input
    const [searchQuery, setSearchQuery] = useState('');

    // 1) Build an array of unique students by ID
    const uniqueStudents = [];
    const ids = new Set();
    data.forEach((item) => {
        const { id, firstname, lastname } = item.student;
        if (!ids.has(id)) {
            ids.add(id);
            uniqueStudents.push({ id, firstname, lastname });
        }
    });

    // 2) Filter the students based on searchQuery
    const filteredStudents = uniqueStudents.filter((student) => {
        const fullName = (student.firstname + ' ' + student.lastname).toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    // 3) Animate the entire table
    const fadeStyles = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.div style={fadeStyles}>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                    }}
                />
            </div>

            <TableContainer component={Paper}>
                <Table aria-label="students table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{student.firstname}</TableCell>
                                <TableCell>{student.lastname}</TableCell>
                                <TableCell>{student.id}</TableCell>
                            </TableRow>
                        ))}

                        {/* If no results found, show a row that says so */}
                        {filteredStudents.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                    Aucun étudiant trouvé
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </animated.div>
    );
}

function AllSubjects() {
    const uniqueCourses = [...new Set(data.map((item) => item.course))];

    const fadeStyles = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.div style={fadeStyles}>
            <TableContainer component={Paper}>
                <Table aria-label="subjects table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uniqueCourses.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell>{course}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </animated.div>
    );
}

function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function RandomItem() {
    const [item, setItem] = useState(getRandomItem(data));

    const handleRandomize = () => {
        setItem(getRandomItem(data));
    };

    return (
        <div>
            <h2>Information sur L'Etudiant :</h2>
            <TableContainer component={Paper}>
                <Table aria-label="random item table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{item.course}</TableCell>
                            <TableCell>
                                {item.student.firstname} {item.student.lastname}
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.grade}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <button style={randomButtonStyle} onClick={handleRandomize}>
                Tirer un autre élément
            </button>
        </div>
    );
}

function MainContent() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return (
        <>
            <p>Ici, nous afficherons des informations intéressantes :)</p>
            <p>
                Bonjour, on est le {day}, {month}, {year} et il est {hour}:{minute}:
                {second}
            </p>
        </>
    );
}

function Header() {
    return (
        <header style={{ textAlign: 'center', marginTop: '80px' }}>
            <img src={image} style={{ width: '400px' }} alt="EMSI Logo" />
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
}

function Footer() {
    return (
        <footer style={{ marginTop: '20px', textAlign: 'center' }}>
            © {new Date().getFullYear()} - Mohammed Amine Adarrab, All rights reserved.
        </footer>
    );
}

export default App;
