const TeamMember = require("../../models/teamMember");

module.exports = function (router) {
  // GET the list of team members
  router.get("/team", function (req, res) {});

  //POST: Create new team member
  router.post("/team", function (req, res) {
    // member is a document instance of the TeamMember model
    let member = new TeamMember(req.body);
    member.save(function (err, note) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(member);
    });
  });
};
