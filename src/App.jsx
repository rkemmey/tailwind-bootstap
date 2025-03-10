import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
import tailwindcss from '@tailwindcss/vite'

function App() {
  //      getter         setter             init
  const [dogData, setData] = useState(null);
  const [breed, setBreed] = useState(""); // store breed in a state for new pic button 

  const getDogInfo = async (selectedBreed = breed) => {
    try {
        //let breed = document.getElementById('user-breed').value.trim();
        if (!selectedBreed) return;
        
        console.log(selectedBreed)
        let { data } = await axios.get(
          `https://dog.ceo/api/breed/${selectedBreed}/images`
        );
        setData(data);
    } catch (error) {
        console.error("Error fetching images:", error);
      }
      };

  useEffect(() => {
    console.log(dogData);
  }, [dogData]);

  return (
    <>
       <h1 style={{backgroundColor:'lightblue'}}>Random Dog Picture Generator</h1>
      {dogData && dogData.message.length > 0 ? (
        <img src={dogData.message[Math.floor(Math.random() * dogData.message.length)]} 
            alt="Dog Pic"
            className="w-64 h-64 object-cover rounded-lg"
        />) : 
          (<p>No images available.</p>)}
      <h3>Enter a Breed</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const inputBreed = document.getElementById("user-breed").value.trim();
          if (inputBreed) {
            setBreed(inputBreed); // store for reuse
            getDogInfo(inputBreed);
          }
        }}
      >
        <input type="text" id="user-breed" placeholder="breed" />
        <input type="submit" />
      </form>

      {/* new image of the same breed if dogData exists*/}
      {dogData && (<button onClick={() => getDogInfo()}>Get New Image</button>)}
      
    </>
  )
}

export default App
