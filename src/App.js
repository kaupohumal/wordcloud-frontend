import React from "react";
import {useState} from "react";
import axios from "axios";
import './App.css';

function App() {

  const BASE_URL = "http://localhost:8080/api/v1/";

  const [file, setFile] = useState()

  const [returnedUUID, setReturnedUUID] = useState()

  const [inputUUID, setInputUUID] = useState()

  const [words, setWords] = useState("")

  function handleChange(event) {
    setFile(null);
    setFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    console.log(file)
    axios.post(BASE_URL + "upload", formData, config)
    .then( (response) => {
      setReturnedUUID(response.data);
      setInputUUID(response.data)
    });
  }

  function handleTextChange(event) {
    setInputUUID(event.target.value)
  }

  function handleGetWords() {
    axios.get(BASE_URL + "words/" + inputUUID,)
        .then((response) => {
          let result = JSON.stringify(response.data)
          if (result === "{}") {
              setWords("No result")
          }
            else {
            setWords(result)
          }
        })
  }

  return (
      <div>
        <h1>Wordcloud</h1>
        <div className="description">
          <h3>A tool to find word frequencies in a text.</h3>
        </div>
        <div className="container">
          <h3>Upload a file...</h3>
          <div className="upload">
            <input id="uploadButton" type="file" onChange={handleChange}/>
            <button onClick={handleSubmit}>
              Upload
            </button>
          </div>
          <h3 className="UUID">{returnedUUID}</h3>
          <h3 className="enterId">...or enter an identifier from a previous upload to see the results</h3>
          <div className="getWords">
            <input className="inputControl" type="text" onChange={handleTextChange}/>
            <button onClick={handleGetWords}>Get Words</button>
          </div>
          <textarea value={words}></textarea>
        </div>
      </div>
  )
}

export default App;
