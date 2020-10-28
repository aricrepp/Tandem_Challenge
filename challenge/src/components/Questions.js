import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
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
  image: {
    width: '200px',
    height: '200px',
    padding: '0 50px 0 50px',
    '@media (max-width: 500px)': {
      width: '150px',
      height: '150px',
    },
  },
  image2: {
    width: '260px',
    height: '120px',
    padding: '0 50px 0 50px',
    '@media (max-width: 500px)': {
      width: '200px',
      height: '100px',
    },
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: '#73e9df',
    fontWeight: 'bold',
  },
  chipOld: {
    margin: theme.spacing(0.5),
    backgroundColor: '#E9737D',
    fontWeight: 'bold',
  },
  button: {
    margin: '15px',
  },
}));

const Questions = () => {
  return <Card></Card>;
};

export default Questions;
