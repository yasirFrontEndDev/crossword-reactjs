import React, { useState } from "react";
import { Link } from "react-router-dom";

const Single = () => {
  const [inputPattern, setInputPattern] = useState("");
  const [dictionary, setDictionary] = useState("big");
  const [results, setResults] = useState([]);

  const handleInputChange = () => {
    setInputPattern(
      Array.from({ length: 15 })
        .map((_, i) => document.getElementById(`l${i + 1}`).value)
        .join("")
    );
  };

  const handleDictionaryChange = (e) => {
    setDictionary(e.target.value);
  };

  const fetchDictionary = async () => {
    const response = await fetch(`/assets/${dictionary}.txt`);
    const text = await response.text();
    return text.split("\n").map((word) => word.trim());
  };

  const convertToRegex = (pattern) => {
    let regexPattern = "";
    let i = 0;
  
    while (i < pattern.length) {
      const char = pattern[i];
  
      if (char === "." || char === "?") {
        // Any single character for unknown letter
        regexPattern += "\\w";
      } else if (/\d/.test(char)) {
        // Handle repeated unknown characters (e.g., "11" means 11 same unknown letters)
        let numRepeat = "";
        while (i < pattern.length && /\d/.test(pattern[i])) {
          numRepeat += pattern[i];
          i++;
        }
        regexPattern += `\\w{${numRepeat}}`; // Match exactly n repeated characters
        continue; // Skip incrementing i here since it's already done in the inner loop
      } else if (/[A-Za-z]/.test(char)) {
        // Specific letter
        regexPattern += char;
      }
      
      i++;
    }
  
    return regexPattern;
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputPattern) {
      setResults(["Please enter a valid pattern."]);
      return;
    }

    const regexPattern = convertToRegex(inputPattern);
    const regex = new RegExp(`^${regexPattern}$`);
    console.log("Regex Pattern:", regexPattern);
    try {
      const words = await fetchDictionary();
      const matchingWords = words.filter((word) => regex.test(word));
      console.log("Dictionary Words:", words);
      setResults(matchingWords.length ? matchingWords : ["No matches found."]);
    } catch (error) {
      console.error("Error fetching dictionary:", error);
      setResults(["Error loading dictionary. Please try again later."]);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="headerMain">
        <Link to="/">
          <img src="assets/codeword_solver.jpg" alt="Best Codeword Solver" />
          <h2 className="header-h2">Codeword Solver</h2>
        </Link>
      </div>

      {/* Main Content */}
      <div className="wrapperMain">
        <main>
          <div className="gamelinks">
            <Link to="/">Single</Link> |{" "}
            <Link to="/multi">Multiple</Link>
            <br />
            <br />
          </div>

          <b>Instructions:</b> Enter the letters that you already have, with{" "}
          <code>.</code> or <code>?</code> for unique unknown letters, and
          numbers for <i>repeated</i> unknown letters.
          <br />
          <b>Examples:</b> <code>11.E</code> would match `ooze` and{" "}
          <code>112.2</code> would match `llama``.
          <form onSubmit={handleSubmit}>
            <div>
              {[...Array(15)].map((_, index) => (
                <input
                  key={index}
                  name={`l${index + 1}`}
                  id={`l${index + 1}`}
                  className="textbox"
                  maxLength="1"
                  type="text"
                />
              ))}
              <input className="button" style={{ visibility: "hidden" }} />
            </div>
            <hr />
            <div>

           
            Dictionary 
            <select onChange={handleDictionaryChange} name="dict" id="dict">
              <option value="big">Big (260k words)</option>
              <option value="original">Original (115k words)</option>
              <option value="pocket">Pocket (20k words)</option>
            </select>
            <input type="submit" className="button" value="submit" />
             </div>
          </form>

          <hr />
          <p>Solutions for <b> {inputPattern} </b></p>   
          <div>
          <h3>Results:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
          <hr />
          
          <b>Longer example:</b>
          <img src="assets/example.png" alt="How to solve codewords" /> is
          entered as <b>..A122.1R</b>
          <span className="smaller">
            <ul>
              <li>
                Letters one, two and seven are unique unknown letters, so we
                enter <b>.</b> in those positions.
              </li>
              <li>
                Third and ninth letters are known so we enter <b>A</b> and{" "}
                <b>R</b> in those positions.
              </li>
              <li>
                Fourth and eighth letters are repeated unknown letters, so we
                enter <b>1</b> in those positions.
              </li>
              <li>
                Letters five and six are a different set of repeated unknown
                letters, so we enter <b>2</b> in those positions.
              </li>
              <li>
                Thus we enter <b>..A122.1R</b> and get the only word that
                matches the pattern: <b>`chauffeur.</b>
              </li>
            </ul>
          </span>

          <hr />
        </main>
      </div>

      {/* Footer Section */}
      <footer className="footerMain">
        <Link to="/privacy">Privacy Policy</Link> |{" "}
        <a href="mailto:mythomasgames@gmail.com">Contact</a>
      </footer>
    </div>
  );
};

export default Single;
