import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questions from './components/Questions';
import confetti from './assets/confetti.gif';
import './app_root.css';

function App() {
  const [trivia, setTrivia] = useState();
  const [newSet, setNewSet] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => {
        console.log(res.data);
        // setTrivia(res.data.results);
        setTrivia(
          res.data.results.map((result) => ({
            ...result,
            all_answers_shuffled: shuffle(
              result.incorrect_answers.concat(result.correct_answer)
            ),
          }))
        );
        console.log(trivia);
        setIsFetching(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newSet]);

  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  return (
    <div className="app_root">
      <header className="app_header">
        <h1 className="f1_h1">Trivia</h1>
        <h1 className="f2_h1">Night</h1>
      </header>

      <Questions
        questions={trivia}
        fetched={isFetching}
        change={newSet}
        setChange={setNewSet}
      />
    </div>
  );
}

export default App;
