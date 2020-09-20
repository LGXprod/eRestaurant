import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const HomePage = (props) =>{

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: -50,
      marginRight: 106,
      marginLeft: 106
    },
    title: {
      fontFamily: 'Nunito-Bold',
      fontSize: '1.5vw'
    },
    logo: {
      maxWidth: '600px',
      float: "right",
      marginTop: -90
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>

    <Typography className={classes.title}>
      Book a table and order your favourite
    </Typography>
    <Typography className={classes.title}>
      restaurant foods in advance,
    </Typography>
    <Typography className={classes.title}>
      with Dineout
    </Typography>

    <img src={require("../../../Assets/dashboardIMG.svg")} alt="logo" className={classes.logo} />

    </div>
  )
}

export default HomePage;
