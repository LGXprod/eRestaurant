import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";

const BookingPage = (props) =>{

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginLeft: 106,
    },
    card: {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(40),
    },
    text: {
      fontFamily: 'Nunito-Bold',
      fontSize: '1.2vw',
      marginTop: -48
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography
          className={classes.text}
          variant="h3"
        >
          Select a Restaurant
        </Typography>

        <Paper variant="outlined" className={classes.card}/>

    </div>
  )
}

export default BookingPage;
