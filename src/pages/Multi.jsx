import React from 'react'
import { Link } from "react-router-dom";
const Multi = () => {
  return (
    <div>
         {/* Header Section */}
      <div className="headerMain">
        <a href="index.htm">
          <img src="assets/codeword_solver.jpg" alt="Best Codeword Solver" />
          <h2 className="header-h2">Codeword Solver</h2>
        </a>
      </div>
      <div className="wrapperMain">
      <main>
      <div className="gamelinks">
      <Link to="/">Single</Link> |{" "}
      <Link to="/multi">Multiple</Link>
        <br />
        <br />
      </div>

      <b>Multi Pattern Solver</b>
      <br />
      With this advanced mode, you can solve two words at the same time. See below for an example.
      <hr />
      <div>Pattern 1</div>

      <form action="results" id="cs" name="cs" autoComplete="off">
        <div>
          {[...Array(15)].map((_, i) => (
            <input
              key={`l${i + 1}`}
              name={`l${i + 1}`}
              id={`l${i + 1}`}
              className="textbox"
              maxLength="1"
              type="text"
            />
          ))}
          <input className="button" style={{ visibility: "hidden" }} />
        </div>

        <hr />
        <div>Pattern 2</div>
        <p>
          {[...Array(15)].map((_, i) => (
            <input
              key={`m${i + 1}`}
              name={`m${i + 1}`}
              id={`m${i + 1}`}
              value=""
              className="textbox"
              maxLength="1"
              type="text"
            />
          ))}
          <input type="submit" className="button" style={{ visibility: "hidden" }} />
        </p>
        <hr />
        Dictionary
        <select name="dict" id="dict">
          <option value="big">Big (260k words)</option>
          <option value="original">Original (115k words)</option>
          <option value="pocket">Pocket (20k words)</option>
        </select>
        <input type="submit" className="button" value="submit" />
      </form>

      <hr />
      <img
        src="assets/example2.png"
        alt="Solving multiple codeword words"
        align="left"
        style={{ marginRight: "15px" }}
      />
      <b>Example:</b>
      <br />
      We want to solve the highlighted 8-letter word going across together with the 10-letter word going down.
      <br />
      <br />
      We enter:
      <br />
      <b>12321o54</b>
      <br />
      <b>5.324o...5</b>
      <br />
      <br />
      As a solution, we get <b>catacomb:metabolism</b>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
    </main>
    </div>
      {/* Footer Section */}
      <footer className="footerMain">
      <Link to="/privacy">Privacy Policy</Link> |{" "}
        <a href="mailto:mythomasgames@gmail.com">Contact</a>
      </footer>
    </div>
  )
}

export default Multi