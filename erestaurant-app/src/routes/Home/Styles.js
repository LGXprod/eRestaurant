import { TextField, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  background: {
    backgroundColor: "grey",
  },
  middleground: {
    backgroundColor: "white",
  },
  foreground: {
    backgroundColor: "grey",
  },
  text: {
    color: "Black",
    fontSize: 20,
  },
  formRows: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7ed957",
    color: "white",
    "&:hover": {
      background: "grey"
    }
  },
  root: {
    flexGrow: 1,
    marginLeft: 20,
    marginRight: 80,
    marginTop: -100,
  },
  logo: {
    flexGrow: 1,
  },
});

const STextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: "grey",
    },
    '& .MuiFormLabel-root': {
      color: "grey",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "grey",
        borderWidth: "2px",
        color: "grey"
      },
      '&:hover fieldset': {
        borderColor: "#84a9ac",
        borderWidth: "2px"
      },
      '&.Mui-focused fieldset': {
        borderColor: "#84a9ac",
        borderWidth: "2px"
      },
    },
  },
})(TextField);

export default useStyles;
export { STextField };
