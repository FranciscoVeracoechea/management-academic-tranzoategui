const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;
const SubjectsHTML = require("../includes/Subjects");

const loadSingleSubjec = (id) =>{
  return new Promise(resolve => {
    pool.query(`SELECT * FROM school_subjects WHERE id = ${id}`, (err, results) =>{
      if (err) throw err;
      resolve(results[0]);
    });
  })
  .then(subject => {
    return new Promise(resolve => {
      pool.query(`SELECT users.*, school_subjects__users.id AS relation_id FROM users 
          JOIN school_subjects__users ON (school_subjects__users.user_id = users.id)
          JOIN school_subjects ON (school_subjects__users.school_subjects_id = school_subjects.id)
          WHERE school_subjects.id = ${id}
        ORDER BY school_subjects.id DESC`, 
      (err, results) => {
        if (err) throw err;
        resolve({subject, users: results})
      });
    });
  });
}

module.exports = loadSingleSubjec;