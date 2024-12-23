import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import image from './assets/EMSI.png'; // Ajustez le chemin selon votre structure de dossiers
import data from "/home/adarrab/td-react-MedAd666/data.json"

const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
};

const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    borderRadius: '2%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: 'purple',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 1000,
    width: '23%',
    height: '25%',
    overflowY: 'auto'
};

function Menu() {
    const [popupContent, setPopupContent] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [item, setItem] = useState(getRandomItem(data));
    const handleRandomize = () => {
        const randomItem = getRandomItem(data);
        setItem(randomItem);
    };

    const handleLinkClick = (content) => {
        setPopupContent(content);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <nav style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: '30px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
                <ul style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <li style={{ marginRight: '20px' }}><a href="#notes" style={buttonStyle} onClick={() => handleLinkClick(`${item.grade}`)}>Notes</a></li>
                    <li style={{ marginRight: '20px' }}><a href="#students" style={buttonStyle} onClick={() => handleLinkClick(`${item.student.firstname} ${item.student.lastname}`)}>Etudiants</a></li>
                    <li style={{ marginRight: '20px' }}><a href="#subjects" style={buttonStyle} onClick={() => handleLinkClick(`${item.course}`)}>Matières</a></li>
                    <li style={{ marginRight: '20px' }}><a href="#about" style={buttonStyle} onClick={() =>  handleLinkClick(`${item.student.firstname} ${item.student.lastname} - Grade: ${item.grade} - Course: ${item.course}`)}>A propos</a></li>
                </ul>
            </nav>
            {isPopupOpen && (
                <div style={popupStyle}>
                    <h2>Informations</h2>
                    <p>{popupContent}</p>
                    <button onClick={closePopup}>Close</button>
                </div>
            )}
        </>
    );
}




function Header() {
    return (
        <header>
            <img src={image} style={{width: '400px'}}/>;
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    )
}

function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function RandomItem() {
    const [item, setItem] = useState(getRandomItem(data));
    const handleRandomize = () => {
        const randomItem = getRandomItem(data);
        setItem(randomItem);
    };
    return (
        <div>
            <h2>Information sur L'Etudiant : </h2>
            <table>
                <tbody>
                <tr>
                    <td><strong>Course :</strong></td>
                    <td>{item.course}</td>
                </tr>
                <tr>
                    <td><strong>Student :</strong></td>
                    <td>{item.student.firstname} {item.student.lastname}</td>
                </tr>
                <tr>
                    <td><strong>Date :</strong></td>
                    <td>{item.date}</td>
                </tr>
                <tr>
                    <td><strong>Grade :</strong></td>
                    <td>{item.grade}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={handleRandomize}>Tirer un autre élément</button>
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
            <p>Bonjour, on est le {day}, {month}, {year} et il est {hour}:{minute}:{second}</p>
        </>
    );
}

function Footer(){
    const now = new Date();
    const year = now.getFullYear();
    return (
        <p>© {year} - Mohammed Amine Adarrab, Tous droits réservés.</p>
    )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div>
            <br/>
            <br/>
            <Header/>
            <MainContent/>
            <Menu/>
            <center><RandomItem/></center>


        </div>
        
        <Footer/>
    </>
  )
}

export default App
