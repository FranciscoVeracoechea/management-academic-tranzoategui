const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;
const SubjectsHTML = require("../includes/Subjects");

const loadSingleSubjec = (id) =>{
  return new Promise(resolve => {
    pool.query(`SELECT * FROM school_subjects WHERE id = ${id}`, (err, results) =>{
      if (err) throw err;
      resolve(results[0]);
    });
  });
}

module.exports = loadSingleSubjec;