import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import image from './assets/EMSI.png'; // Ajustez le chemin selon votre structure de dossiers
import data from "/home/adarrab/td-react-MedAd666/data.json"



function Header(){
  return (
      <header>
          <img src={image} style={{ width: '400px' }} />;
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

            <Header/>
            <MainContent/>
            <center><RandomItem/></center>

            <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>
        </div>
        <h1>Vite + React + MBDS</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <Footer/>
    </>
  )
}

export default App
