const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;

module.exports =  (subject_id) =>{
  return new Promise(resolve => {
    pool.query(
      ` SELECT * FROM evaluations WHERE school_subjects_id = ${subject_id} ORDER BY id DESC`,
      (err, results) =>{
        if (err) throw err;
        resolve(results);
      }
    );
  });
}
