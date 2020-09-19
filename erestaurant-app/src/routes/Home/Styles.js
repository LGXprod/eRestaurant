import { TextField, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  background: {
    backgroundColor: "grey",
  },
  middleground: {
    backgroundColor: "white",
    padding: '10px'
  },
  foreground: {
    backgroundColor: "grey",
  },
  text: {
    color: "Black",
    marginTop: '100px',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
  bottomText: {
    color: "Black",
    marginTop: '100px',
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    display: 'inline-block',
  },
  formRows: {
    margin: theme.spacing(1.5),
    textAlign: "center",
  },
  signformRows: {
    margin: theme.spacing(1.5),
    width: '164px',
    textAlign: "center",
  },
  logo: {
    flexGrow: 1,
    marginLeft: 25,
    marginTop: -50,
    marginBottom: -140,
  },
  loginButton: {
    backgroundColor: "#54B82A",
    fontFamily: 'Nunito',
    textTransform: 'none',
    fontSize: '19px',
    borderRadius: 0,
    width: '80%',
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: '#fff',
    }
  },
  signupButton: {
    backgroundColor: "#54B82A",
    fontFamily: 'Nunito',
    textTransform: 'none',
    fontSize: '19px',
    borderRadius: 0,
    width: '93.5%',
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: '#fff',
    }
  },
});

const STextField = withStyles({
  root: {
    width: '80%',

    '& label.Mui-focused': {
      color: "grey",
      fontFamily: 'Nunito-Regular',
    },
    '& .MuiFormLabel-root': {
      color: "grey",
      fontFamily: 'Nunito-Regular',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "grey",
        borderWidth: "1px",
        borderRadius: 0,
        color: "grey"
      },
      '&:hover fieldset': {
        borderColor: "black",
        borderWidth: "1px",
        borderRadius: 0
      },
      '&.Mui-focused fieldset': {
        borderColor: "black",
        borderWidth: "1px",
        borderRadius: 0
      },
    },
  },
})(TextField);

export default useStyles;
export { STextField };
