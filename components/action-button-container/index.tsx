import { makeStyles } from "@material-ui/core";


function ActionButtonContainer({ children }) {
  const useStyles = makeStyles((theme) => ({
    actionBtnContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  const classes = useStyles()
  return <div className={classes.actionBtnContainer}>{children}</div>
}

export default ActionButtonContainer
