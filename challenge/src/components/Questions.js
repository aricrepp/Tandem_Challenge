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
    fontFamily: 'Arial Black, Gadget, sans-serif',
  },
  content_body: {
    color: '#333',
    fontSize: '0.9rem',
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '80%',
    '@media (max-width: 500px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  content_text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading_text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    textAlign: 'center',
    fontSize: '0.9rem',
    padding: '1rem',
    fontFamily: 'Arial Black, Gadget, sans-serif',
    color: '#333',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    height: '100vh',
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
    }, 100);

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
    let greenButton = document.querySelector('.green');
    let redButton = document.querySelectorAll('.red');

    greenButton.setAttribute('style', 'background-color: #69b57881');
    redButton.forEach((e) => {
      e.setAttribute('style', 'background-color: #db546181');
    });

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
        <div className={score === 10 ? 'confetti_show' : null}></div>
        <Typography className={classes.heading_text}>
          It's trivia night here! Name of the game is to get a positive score
          with a special suprise if you manage to get all 10 questions correct!
        </Typography>
        <Card className={classes.content}>
          <h2 className="questions_h2">SCORE: {score}</h2>
          <CardContent className={classes.content_body}>
            <section key={counter}>
              <Typography
                className={classes.content_text}
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
                  Next
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
    return <Typography className={classes.loading}>Loading...</Typography>;
  }
};

export default Questions;
