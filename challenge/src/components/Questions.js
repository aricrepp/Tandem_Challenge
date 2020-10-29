import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import './css/Questions.css';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 50px 0 50px',
  },
  projects: {
    color: 'grey',
    fontSize: '0.9rem',
    padding: '0.5rem',
    width: '60%',
    '@media (max-width: 500px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const Questions = (props) => {
  const classes = useStyles();
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);

  const diplayAnswers = () => {
    if (props.fetched) {
      const correct = props.questions[counter].correct_answer;
      const inc1 = props.questions[counter].incorrect_answers[0];
      const inc2 = props.questions[counter].incorrect_answers[1];
      const inc3 = props.questions[counter].incorrect_answers[2];
      let array = [];
      array.push(correct, inc1, inc2, inc3);
      let newArray = shuffle(array);
      console.log(newArray);

      return newArray.map((e, key) => {
        return <button onClick={(e) => handleChoice(e)}>{e}</button>;
      });
    }
  };

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  const handleNextQuestion = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  const counterTimeout = (e) => {
    props.setChange(props.change + 1);

    const timer = setTimeout(() => {
      setCounter(e);
    }, 200);

    return timer;
  };
  const changeTimeout = () => {
    const timer = setTimeout(() => {
      props.setChange(props.change + 1);
    }, 800);

    return timer;
  };

  const handleStartOver = (e) => {
    e.preventDefault();
    // props.setChange(props.change + 1);
    // setCounter(0);
    // changeTimeout();
    counterTimeout(0);
  };

  const handleChoice = (e) => {
    e.preventDefault();
    console.log('clicked');
  };

  if (props.fetched) {
    return (
      <div className="questions_container">
        <h1 className="questions_h1">{score}</h1>
        <Card className={classes.content}>
          <section key={counter}>
            <p
              dangerouslySetInnerHTML={{
                __html: props.questions[counter].question,
              }}
            ></p>
            <div className="answers_container">{diplayAnswers()}</div>
          </section>

          <section>
            {counter < 9 ? (
              <button onClick={(e) => handleNextQuestion(e)}>
                Next Question
              </button>
            ) : (
              <button onClick={(e) => handleStartOver(e)}>Start Over</button>
            )}
          </section>
        </Card>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Questions;
