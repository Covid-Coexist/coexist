const sessionController = {};

sessionController.verify = (req, res, next) => {
  if (res.locals.boardId) { // if coming from login
    req.session.boardId = res.locals.boardId;
  } else if (req.session.boardId) { // if coming
    req.params.id = req.session.boardId;
  }
  next();
}

module.exports = sessionController;