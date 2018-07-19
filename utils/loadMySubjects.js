const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;
const SubjectsHTML = require("../includes/Subjects");

const loadMySubjects = (userId, role) =>{
  let $subjectSTbody = $("tbody#my-subjects-tbody");
  $subjectSTbody.empty();
  return new Promise(resolve => {
    pool.query(`
      SELECT school_subjects.* FROM school_subjects 
        JOIN school_subjects__users ON (school_subjects__users.school_subjects_id = school_subjects.id)
        JOIN users ON (school_subjects__users.user_id = users.id)
        WHERE users.id = ${userId}
      ORDER BY school_subjects.id DESC
    `, (err, results) =>{
      if (err) throw err;
      // console.log(results)
      resolve(results.map(subject => {
        SubjectsHTML.addSubject(subject, role, "table#mySubjectsTable");
      }));
    });
  });
}

module.exports = loadMySubjects;