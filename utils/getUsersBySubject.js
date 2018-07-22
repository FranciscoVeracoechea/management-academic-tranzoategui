const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;

module.exports = (subject_id) => {
  return new Promise(resolve=>{
    pool.query(
      `
        SELECT users.* FROM users 
        JOIN school_subjects__users ON (school_subjects__users.user_id = users.id)
        JOIN school_subjects ON (school_subjects__users.school_subjects_id = school_subjects.id)
        WHERE school_subjects.id = ${subject_id}
        ORDER BY school_subjects.id DESC
      `, 
      (err, results)=>{
        if(err) throw err;
        resolve(results)
      }
    );
  });
}