import React, { useState, useEffect } from 'react';
import Stickies from '../components/Stickies';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from '../components/TopNav';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
  root: {
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

  useEffect(() => {
    // retrieves stickies for currently signed in user
    fetch(`/api/stickies/${currentBoard}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
        console.log(stickies);
      });
  }, [currentBoard]);

  const updateContent = text => {
    setContent(text);
    console.log(content);
  };

  const addSticky = () => {

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
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form
        style={{
          width: '400px',
          height: '100px',
          justifyContent: 'center',
          margin: '10px auto',
        }}
        onSubmit={e => {
          e.preventDefault();
          updateContent('');
        }}
      >
        <span>
          <input
            style={{
              width: '200px',
              height: '50px',
              marginRight: '5px',
            }}
            type='text'
            onChange={e => updateContent(e.target.value)}
          />
          <Button
            style={{
              height: '27px',
              width: '80px',
            }}
            onClick={addSticky}
          >
            Add a sticky!
          </Button>
        </span>
      </form>

      <Grid container spacing={3}>
        {stickies.map((sticky, idx) => {
          return (
            <Grid key={`grid-${idx}`} item md={6} sm={6} xs={12}>
              <Stickies key={`sticky-${idx}`} stickyData={sticky} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default StickiesContainer;
