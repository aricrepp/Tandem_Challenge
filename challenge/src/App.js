import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questions from './components/Questions';
import confetti from './assets/confetti.gif';
import './app_root.css';

function App() {
  const [trivia, setTrivia] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => {
        console.log(res.data);
        setTrivia(res.data.results);
        setIsFetching(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app_root">
      <div className="confetti"></div>
      <header className="app_header">
        <h1> Test Your Trivia!</h1>
      </header>
      <section className="app_container">
        <Questions questions={trivia} />
      </section>
    </div>
  );
}

export default App;
