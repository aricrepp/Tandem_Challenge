import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './css/Questions.css';

// Material UI component styles
//
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
    '@media (max-width: 500px)': {
      display: 'flex',
      flexDirection: 'column',
      width: '70vw',
      padding: '20px 20px 0 20px',
    },
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
    '@media (max-width: 1440px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    '@media (max-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    '@media (max-width: 500px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
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
    '@media (max-width: 768px)': {
      width: '70%',
      textAlign: 'center',
      fontSize: '0.8rem',
      padding: '1.5rem',
    },
    '@media (max-width: 500px)': {
      width: '80%',
      textAlign: 'center',
      fontSize: '0.8rem',
      padding: '1.5rem',
    },
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
  const [highscore, setHighscore] = useState(score);

  // Maps through and creates the answers for each question once the data has been fetched.
  // Returns an individual question based on counter state
  //
  const createAnswers = () => {
    if (props.fetched) {
      let array = props.questions[counter].all_answers_shuffled;

      return array.map((e, key) => {
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
    }
  };

  // Handle click function for next question.
  // Adds to counter for a round of 10 questions
  //
  const handleNextQuestion = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  // Timeout function for rendering the data and setting state back to 0
  //
  const counterTimeout = (e) => {
    props.setChange(props.change + 1);

    const timer = setTimeout(() => {
      setCounter(e);
    }, 100);

    return timer;
  };

  // Handle click function for Start Over
  // Checks score against prev highscore after start over
  //
  const handleStartOver = (e) => {
    e.preventDefault();
    setScore(0);
    counterTimeout(0);
    if (score > highscore) {
      setHighscore(score);
    }
  };

  // Handles an individual answer choice. Does multiple things
  // 1. Sets buttons color when chosen to show user the correct and incorrect answers
  // 2. Increases or descreases score based on choice
  // 3. Disables buttons for that specific until the next set of questions.
  //
  const handleChoice = (e) => {
    e.preventDefault();

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

  // Component return based on if data is fetched
  //
  if (props.fetched) {
    return (
      <section className="questions_container">
        <div className={score === 10 ? 'confetti_show' : null}></div>
        <Typography className={classes.heading_text}>
          It's trivia night here! Name of the game is to get a positive score.
          Unlock the special suprise by getting all 10 questions correct!
        </Typography>
        <Card className={classes.content}>
          <div className="highscore">
            <h4>highscore: {highscore}</h4>
          </div>
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
