const useStyles = (theme) => ({
  root: {
    display: 'block',
    flexGrow: 1,
  },
  card: {
    marginTop: 45,
    width: theme.spacing(40),
    height: theme.spacing(45),
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: '20px',
    marginTop: -60,
  },
  restText: {
    marginTop: 20,
    fontFamily: 'Nunito',
    fontSize: '18px',
    marginBottom: 25,
  },
  restButton: {
    backgroundColor: "#54B82A",
    fontFamily: 'Nunito',
    textTransform: 'none',
    fontSize: '18px',
    borderRadius: 15,
    width: '30%',
    color: "white",
    "&:hover": {
      backgroundColor: "#54B82A",
      color: '#fff',
    }
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: '20px',
  },
  logo: {
    maxWidth: '600px',
    float: "right",
    marginTop: -85
  },
});

export default useStyles;
