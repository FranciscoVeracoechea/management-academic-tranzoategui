const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;

module.exports =  (user_id) =>{
  return new Promise(resolve => {
    pool.query(
      ` SELECT school_subjects.* FROM school_subjects
        JOIN school_subjects__users ON (school_subjects__users.school_subjects_id = school_subjects.id)
        JOIN users ON (school_subjects__users.user_id = users.id)
        WHERE users.id = ${user_id} ORDER BY school_subjects.id DESC
      `,
      (err, results) =>{
        if (err) throw err;
        resolve(results);
      }
    );
  });
}
