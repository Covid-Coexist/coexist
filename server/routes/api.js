const express = require('express');
const apiRouter = express.Router();
const BoardController = require('../controllers/BoardController');
const sessionController = require('../controllers/sessionController');

//get all stickies for a user board
apiRouter.get('/stickies/:id', sessionController.verify, BoardController.getStickies, (req, res) => {
  //get all stickies for current board
  res.status(200).json(res.locals.stickies);
});

//post new sticky
apiRouter.post('/stickies', BoardController.postSticky, (req, res) => {
  res.status(200).json(res.locals.stickyId);
});

//edit a sticky
apiRouter.patch('/stickies', BoardController.updateSticky, (req, res) => {
  res.status(200).json(res.locals.sticky);
});

//delete a sticky
apiRouter.delete('/stickies', BoardController.deleteSticky, (req, res) => {
  res.sendStatus(200);
});

// add anew row item to a sticky note
apiRouter.post(
  '/stickies/addstickyitem',
  BoardController.addStickyItem,
  (req, res) => {
    res.sendStatus(200);
  }
);

// // uploading a file to category
// apiRouter.post('/upload', FileController.uploadFile, (req, res) => {
//   res.status(200);
// });

// // retrieving files for category
// apiRouter.get('/files', FileController.getFiles, (req, res) => {
//   res.status(200);
// });

module.exports = apiRouter;
