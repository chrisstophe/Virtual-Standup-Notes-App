const Project = require("../../models/project");

module.exports = function (router) {
  // GET the list of active projects
  router.get("/projects", function (req, res) {});

  //POST: Create new project
  router.post("/projects", function (req, res) {
    // project is a document instance of the Project model
    let project = new Project(req.body);
    project.save(function (err, note) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(project);
    });
  });
};
