import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import IconButton from "@material-ui/core/IconButton"
import Add from "@material-ui/icons/add"
import TextField from "@material-ui/core/TextField"
import Portal from "@material-ui/core/Portal"
import { v4 as uuid } from "uuid"
import Button from "@material-ui/core/Button"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    "& > span": {
      margin: theme.spacing(2),
    },
    "& > *": {
      margin: theme.spacing(2),
    },
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const Stickies = (props) => {
  const container = React.useRef(null)
  const [content, setContent] = React.useState("")
  const [additional, setAdditional] = React.useState("")
  const [show, setShow] = React.useState(false)
  const { stickyData } = props
  console.log(additional)

  const updateContent = (text) => {
    setContent(text)
  }
  const updateAdditional = (text) => {
    setAdditional(text)
  }

  const handleClick = () => {
    setShow(!show)
  }
  const handleSubmit = () => {
    stickyData.items.push({
      itemId: uuid(),
      content: content,
      additional: additional,
      completed: false,
    })
  }

  const classes = useStyles()
  const stickyList = stickyData.items.map((data) => {
    return (
      <Paper elevation={0}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions2-content"
            id="additional-actions2-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox />}
              label={data.content}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{data.additional}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    )
  })

  return (
    <div>
      <Card>
        <CardActionArea>
          <h2 className="container-header">{props.stickyData.name} </h2>
          <IconButton
            onClick={handleClick}
            aria-label="delete"
            className={classes.margin}
            size="small"
          >
            <Add />
          </IconButton>
          <CardContent ref={container}>
            {stickyList}
            {show ? (
              <Portal container={container.current}>
                <form
                  className={classes.drawer}
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                    updateContent("")
                    updateAdditional("")
                    handleClick()
                  }}
                >
                  <TextField
                    id="content-input"
                    label=""
                    value={content}
                    onChange={(e) => updateContent(e.target.value)}
                  />
                  <TextField
                    id="additional-input"
                    label=""
                    value={additional}
                    onChange={(e) => updateAdditional(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    color="gray"
                    type="submit"
                    style={{ margin: "2px" }}
                  >
                    Save
                  </Button>
                </form>
              </Portal>
            ) : null}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Stickies
