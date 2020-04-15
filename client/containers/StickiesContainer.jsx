import React, { useState } from "react"
import Stickies from "../components/Stickies"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

const StickiesContainer = () => {
  const [stickies, setStickies] = useState([
    {
      stickyId: 1,
      name: "To-Do List",
      items: [
        {
          itemId: 1,
          content: "Workout",
          additional: "100 pull-ups, 100push-ups, 200 sit-ups",
          completed: true,
        },
      ],
    },
  ])
  
  // const [grabData, setGrabData] = useState(false);
  // useEffect(() => {
  //   fetch(`/api/${id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       // console.log(data);
  //       setState(data);
  //     });
  // }, [grabData]);

  const stickyData = stickies.map((sticky) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Stickies stickies={stickies} setStickies={setStickies} stickyData={sticky} />
      </Grid>
    )
  })
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={3}>
        {stickyData}
      </Grid>
    </div>
  )
}

export default StickiesContainer
