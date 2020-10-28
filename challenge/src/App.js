import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [trivia, setTrivia] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => {
        console.log(res.data);
        setTrivia(res.data);
        setIsFetching(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="App"></div>;
}

export default App;
