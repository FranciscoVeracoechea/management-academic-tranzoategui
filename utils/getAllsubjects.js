const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;

module.exports =  () =>{
  return new Promise(resolve => {
    pool.query(`SELECT * FROM school_subjects ORDER BY id DESC`, (err, results) =>{
      if (err) throw err;
      resolve(results);
    });
  });
}

