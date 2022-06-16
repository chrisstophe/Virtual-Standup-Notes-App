const Standup = require("../../models/standup");

module.exports = function (router) {
  // GET the 12 newest standup meeting notes
  router.get("/standup", function (req, res) {});

  //POST: Get new meeting note document
  router.post("/standup", function (req, res) {
    // note is a document instance of the standup model
    let note = new Standup(req.body);
    note.save(function (err, note) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(note);
    });
  });
};
