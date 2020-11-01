import React, { useState, useEffect } from 'react';
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
    width: '75%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 50px 0 50px',
  },
  content_body: {
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

  const createAnswers = () => {
    if (props.fetched) {
      const correct = props.questions[counter].correct_answer;
      const inc1 = props.questions[counter].incorrect_answers[0];
      const inc2 = props.questions[counter].incorrect_answers[1];
      const inc3 = props.questions[counter].incorrect_answers[2];
      let array = [];
      array.push(correct, inc1, inc2, inc3);
      let newArray = shuffle(array);
      return displayAnswers(newArray);
    }
  };

  const displayAnswers = (array) => {
    return array.map((e, key) => {
      console.log(e);
      return (
        <button
          key={key}
          className={
            e === props.questions[counter].correct_answer ? 'green' : 'red'
          }
          onClick={(e) => handleChoice(e)}
          dangerouslySetInnerHTML={{
            __html: e,
          }}
        ></button>
      );
    });
  };

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

  const handleNextQuestion = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
    document.querySelector('.green').disabled = false;
    document.querySelector('.red').disabled = false;
  };

  const counterTimeout = (e) => {
    props.setChange(props.change + 1);

    const timer = setTimeout(() => {
      setCounter(e);
    }, 200);

    return timer;
  };

  const handleStartOver = (e) => {
    e.preventDefault();
    setScore(0);
    counterTimeout(0);
  };

  const handleChoice = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.textContent);
    console.log('clicked');

    if (e.target.textContent === props.questions[counter].correct_answer) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    let buttons = document.querySelectorAll('button');
    buttons.forEach((e) => {
      e.disabled = true;
    });
  };

  if (props.fetched) {
    return (
      <section className="questions_container">
        <Card className={classes.content}>
          <h1 className="questions_h1">{score}</h1>
          <CardContent className={classes.content_body}>
            <section key={counter}>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: props.questions[counter].question,
                }}
              ></Typography>
              <div className="answers_container">{createAnswers()}</div>
            </section>

            <section>
              {counter < 9 ? (
                <div
                  onClick={(e) => handleNextQuestion(e)}
                  className="questions_button_next"
                >
                  Next >
                </div>
              ) : (
                <div
                  onClick={(e) => handleStartOver(e)}
                  className="questions_button_over"
                >
                  New Game?
                </div>
              )}
            </section>
          </CardContent>
        </Card>
      </section>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Questions;
