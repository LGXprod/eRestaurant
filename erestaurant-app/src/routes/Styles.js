import { TextField, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  background: {
    backgroundColor: "grey",
  },
  middleground: {
    backgroundColor: "white",
    padding: "10px",
  },
  foreground: {
    backgroundColor: "grey",
  },
  text: {
    color: "Black",
    marginTop: "100px",
    fontFamily: "Nunito-Bold",
    fontSize: 20,
  },
  bottomText: {
    color: "Black",
    marginTop: "100px",
    fontFamily: "Nunito-Bold",
    fontSize: 13,
    display: "inline-block",
  },
  formRows: {
    margin: theme.spacing(1.5),
    textAlign: "center",
  },
  signformRows: {
    margin: theme.spacing(1.5),
    width: "164px",
    textAlign: "center",
  },
  accountformRows: {
    margin: theme.spacing(3),
    width: '500px',
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
    fontFamily: "Nunito",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: 0,
    width: "80%",
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: "#fff",
    },
  },
  signupButton: {
    backgroundColor: "#54B82A",
    fontFamily: "Nunito",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: 0,
    width: "93.5%",
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: "#fff",
    },
  },
  accountText: {
    fontFamily: 'Nunito-Bold',
    fontSize: '20px',
    marginTop: -60,
    textAlign: 'center',
    marginRight: 320
  },
  accountCard: {
    marginTop: 45,
    width: theme.spacing(55),
    height: theme.spacing(30),
    margin: '0 auto',
  },
  label: {
    fontFamily: 'Nunito',
    color: "grey",
    fontSize: '22px',
    marginBottom: '5px'
  },
  inputData: {
    fontFamily: "Nunito-Regular",
    marginTop: "15px",
  },
  addMenuButton: {
    backgroundColor: "#54B82A",
    fontFamily: "Nunito",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: 0,
    width: "80%",
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: "#fff",
    },
  },
  uploadFileButton: {
    backgroundColor: "grey",
    fontFamily: "Nunito",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: 0,
    width: "80%",
    color: "white",
    "&:hover": {
      backgroundColor: "grey",
      color: "#fff",
    },
  },
  roleButton: {
    backgroundColor: "white",
    fontFamily: "Nunito-Regular",
    textTransform: "none",
    fontSize: "17px",
    height: "47px",
    borderRadius: 0,
    boxShadow: "none",
    border: "1px solid grey",
    width: "93.5%",
    color: "black",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  loading: {
    color: "Black",
    fontFamily: "Nunito",
    fontSize: 15,
  },
});

const STextField = withStyles({
  root: {
    width: "80%",

    "& label.Mui-focused": {
      color: "grey",
      fontFamily: "Nunito-Regular",
    },
    "& .MuiFormLabel-root": {
      color: "grey",
      fontFamily: "Nunito-Regular",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "grey",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
        borderWidth: "1px",
        borderRadius: 0,
        color: "grey",
      },
      "&:hover fieldset": {
        borderColor: "black",
        borderWidth: "1px",
        borderRadius: 0,
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        borderWidth: "1px",
        borderRadius: 0,
      },
    },
  },
})(TextField);

export default useStyles;
export { STextField };
