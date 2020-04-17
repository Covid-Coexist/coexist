import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Portal from '@material-ui/core/Portal';
import { v4 as uuid } from 'uuid';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
    '& > *': {
      margin: theme.spacing(2),
    },
    width: '100%',
  },
  drawer: {
    width: '100%',
    flexShrink: 0,
    background: '#fafafa',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  margin: {
    width: '100%',
    margin: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
  },
  card: {
    background: '#fafafa',
  },
  inputs: {
    width: '100%',
  },
  panel: {
    marginBottom: '5px',
  },
}));

const Stickies = props => {
  const container = React.useRef(null);
  const [content, setContent] = React.useState('');
  const [additional, setAdditional] = React.useState('');
  const [show, setShow] = React.useState(false);
  const { stickyData } = props;

  const updateContent = text => {
    setContent(text);
  };
  const updateAdditional = text => {
    setAdditional(text);
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    // create item to store in state
    const newItem = {
      itemId: uuid(),
      content: content,
      additional: additional,
      complete: false,
    };

    // add item to the state array first
    stickyData.items.push(newItem);

    // add stickyId on to object before sending to db
    newItem.stickyId = props.stickyData.stickyId;

    // then send insert query to db
    fetch('/api/stickies/addstickyitem', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
  };

  const classes = useStyles();
  const stickyList = props.stickyData.items.map((data, idx) => {
    return (
      <Paper key={`item-${idx}`} elevation={0}>
        <ExpansionPanel classes={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label='Expand'
            aria-controls='additional-actions2-content'
            id='additional-actions2-header'
          >
            <FormControlLabel
              aria-label='Acknowledge'
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox />}
              label={data.content}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{data.additional}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  });

  return (
    <div>
      <Card>
        <CardActionArea className={classes.card}>
          <h2 className='container-header'>{props.stickyData.name} </h2>
          <Add
            onClick={handleClick}
            aria-label='delete'
            className={classes.margin}
            size='small'
          />
          <CardContent ref={container}>
            {stickyList.length >= 0 ? stickyList : null}
            {show ? (
              <Portal container={container.current}>
                <form
                  className={classes.drawer}
                  noValidate
                  autoComplete='off'
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                    updateContent('');
                    updateAdditional('');
                    handleClick();
                  }}
                >
                  <TextField
                    id='content-input'
                    label='Item text'
                    value={content}
                    onChange={e => updateContent(e.target.value)}
                  />
                  <TextField
                    id='additional-input'
                    label='Add details here'
                    value={additional}
                    onChange={e => updateAdditional(e.target.value)}
                  />
                  <Button
                    variant='outlined'
                    type='submit'
                    style={{ margin: '2px' }}
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
  );
};

export default Stickies;
