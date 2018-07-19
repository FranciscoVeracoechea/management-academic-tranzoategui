const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;
const SubjectsHTML = require("../includes/Subjects");

const loadAllSubjects = (role) =>{
  let $subjectSTbody = $("tbody#subjects-tbody");
  $subjectSTbody.empty();
  return new Promise(resolve => {
    pool.query(`SELECT * FROM school_subjects ORDER BY id DESC`, (err, results) =>{
      if (err) throw err;
      resolve(results.map(subject => {
        SubjectsHTML.addSubject(subject,role);
      }));
    });
  });
}

module.exports = loadAllSubjects;
// all-subjects-tab