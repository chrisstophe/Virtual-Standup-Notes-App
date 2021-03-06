const Standup = require("../../models/standup");
const mongoose = require("mongoose");

module.exports = function (router) {
  // GET the 12 newest standup meeting notes
  router.get("/standup", function (req, res) {
    // to sort by descending you could set createdOn to -1
    Standup.find()
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error finding standup meeting notes", error: err })
      );
  });

  // GET by team member Id
  router.get("/standup/:teamMemberId", function (req, res) {
    const qry = {
      _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId),
    };
    console.log(mongoose.Types.ObjectId(req.params.teamMemberId));
    Standup.find(qry)
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error finding notes for team member", error: err })
      );
  });

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
