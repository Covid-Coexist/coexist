import React, { useState, useEffect } from 'react';
import Stickies from '../components/Stickies';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from '../components/TopNav';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
  root: {
    width: 88,
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '& > span': {
      margin: theme.spacing(2),
    },
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const StickiesContainer = props => {
  console.log(props);
  const [stickies, setStickies] = useState([]);
  const [content, setContent] = React.useState('');
  const { currentBoard } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // retrieves stickies for currently signed in user
    fetch(`/api/stickies/${currentBoard}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data, 'data');
        const newStickies = [];
        // iterate over array of data returned from db
        for (let i = 0; i < data.length; i++) {
          // check if output array already contains the current stickyId object
          const index = newStickies.findIndex(
            sticky => sticky.stickyId === data[i].sticky_id
          );

          // an index of -1 means no match was found
          if (index === -1) {
            // if no match: create a new object with itemid, name, items array filled with nested data
            const pushObject = {
              stickyId: data[i].sticky_id,
              name: data[i].name,
              items: [
                {
                  // data to appear upon expansion of row
                  itemId: data[i].item_id,
                  content: data[i].content,
                  additional: data[i].additional,
                  completed: data[i].complete,
                },
              ],
            };
            // push reformatted sticky data into array
            newStickies.push(pushObject);
          } else {
            // if the sticky already exists, then just add a new object to its items array
            const pushObject = {
              itemId: data[i].item_id,
              content: data[i].content,
              additional: data[i].additional,
              completed: data[i].complete,
            };

            newStickies[index].items.push(pushObject);
          }
        }
        setStickies(newStickies);
      });
  }, [currentBoard]);

  const updateContent = text => {
    setContent(text);
    // console.log(content, 'content');
  };

  const addSticky = () => {
    setOpen(false);

    if (!content) {
      return;
    }

    const someData = {
      name: content,
      boardId: currentBoard,
    };

    fetch('/api/stickies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(someData),
    })
      .then(res => res.json())
      .then(data => {
        let sticky = {
          sticky_id: data.sticky_id,
          name: content,
          items: [
            {
              itemId: null,
              content: null,
              additional: null,
              completed: null,
            },
          ],
        };
        setStickies([...stickies, sticky]);
      });
      updateContent('');
  };

  const classes = useStyles();
  return (
    <>

      <div>
      <Grid container spacing={3}>
        <Grid key={`grid-1`} item xs={12} sm={12} md={12}>
          <List style={{ background: 'transparent', boxShadow: 'none', alignSelf: 'flex-start'}}>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ width: 200}}>
              <ListItem className={classes.nested}>
                <TextField onChange={e => updateContent(e.target.value)} label="Enter title"/>
                <Button
                  onClick={addSticky}
                >
                  Add Sticky
                </Button>
              </ListItem>
            </List>
          </Collapse>
        </List>
        </Grid>
        {stickies.map((sticky, idx) => {
          return (
            <Grid key={`grid-${idx+1}`} item xs={12} sm={6} md={4}>
              <Stickies key={`sticky-${idx}`} stickyData={sticky} />
            </Grid>
          );
        })}
      </Grid>
      </div>
      </>
  );
};

export default StickiesContainer;
