const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    marginTop: 45,
    width: theme.spacing(40),
    height: theme.spacing(45),
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: "20px",
    marginTop: -60,
  },
  restText: {
    marginTop: 20,
    fontFamily: "Nunito",
    fontSize: "18px",
    marginBottom: 25,
  },
  restButton: {
    backgroundColor: "#54B82A",
    fontFamily: "Nunito",
    textTransform: "none",
    fontSize: "18px",
    borderRadius: 15,
    width: "30%",
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: "#fff",
    },
  },
  mainTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: "35px",
    color: "black",
  },
  title: {
    fontFamily: "Nunito",
    fontSize: "20px",
  },
  logo: {
    maxWidth: "700px",
    float: "right",
    marginTop: -140,
    ["@media (min-width:1650px)"]: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "750px",
    },
  },
});

export default useStyles;
