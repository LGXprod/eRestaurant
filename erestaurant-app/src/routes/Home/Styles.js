import { TextField, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  background: {
    backgroundColor: "#204051",
  },
  middleground: {
    backgroundColor: "#3b6978",
  },
  foreground: {
    backgroundColor: "#84a9ac",
  },
  text: {
    color: "#e4e3e3",
  },
  formRows: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
});

const STextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: "#84a9ac",
    },
    '& .MuiFormLabel-root': {
      color: "#e4e3e3",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#84a9ac",
        borderWidth: "2px",
        color: "#84a9ac"
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