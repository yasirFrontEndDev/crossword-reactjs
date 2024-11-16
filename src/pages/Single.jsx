import React, { useState } from "react";
import { Link } from "react-router-dom";

const Single = () => {

  const [inputPattern, setInputPattern] = useState("");
  const [dictionary, setDictionary] = useState("big");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
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
    console.log(response);
    const text = await response.text();
    return text.split("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexPattern = inputPattern
      .replace(/\./g, "\\w") // Replace . with any letter.
      .replace(/\d/g, (match) => `\\w{${match}}`); // Replace numbers with repeated groups.

    const words = await fetchDictionary();
    const matchingWords = words.filter((word) => new RegExp(`^${regexPattern}$`).test(word));

    setResults(matchingWords);
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
                id={`l${index + 1}`}
                className="textbox"
                maxLength="1"
                onChange={handleInputChange}
              />
            ))}
          </div>
          <select onChange={handleDictionaryChange}>
            <option value="big">Big (260k words)</option>
            <option value="original">Original (115k words)</option>
            <option value="pocket">Pocket (20k words)</option>
          </select>
          <button type="submit" className="button">Submit</button>
        </form>
        <h1>Solutions for 11.E</h1>
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
