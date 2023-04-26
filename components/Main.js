import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import $ from "jquery";
import "./a.css";
import styles from './a.css';


function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [titles, setTitles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const readFileContent = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });

    const extractTitleAndBody = (xml) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'application/xml');
        const titleTags = xmlDoc.getElementsByTagName('title');
        const titleAndBodyArray = [];

        for (let i = 0; i < titleTags.length; i++) {
            const title = titleTags[i].textContent;
            const body = xmlDoc.getElementsByTagName('body')[i].textContent;
            titleAndBodyArray.push({ title, body });
        }

        return titleAndBodyArray;
    };

    const handleTitleClick = (event) => {
        event.preventDefault();
        const title = event.target.innerText;
        const body = titles.find((t) => t.title === title).body;
        const newWindow = window.open();
        newWindow.document.write(`<pre>${body}</pre>`);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        try {
            const content = await readFileContent(selectedFile);
            const titlesAndBodies = extractTitleAndBody(content);
            setTitles(titlesAndBodies);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputSection}>
                <input type="file" accept=".xml" onChange={handleFileChange} />
                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                <button onClick={handleFileUpload}>Display Titles and Bodies</button>
            </div>
            {titles.length > 0 && (
                <div className={styles.xmlContent}>
                    <h3>List of Titles:</h3>
                    <ul className={styles.titlesList}>
                        {titles.map((titleAndBody, index) => (
                            <li key={index}>
                                <a href="#" onClick={handleTitleClick}>
                                    {titleAndBody.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


export default Main;
