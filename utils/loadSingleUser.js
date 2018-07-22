const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;
const consts = require("./consts");

module.exports = (id) => {
  return new Promise(resolve => {
    pool.query(`SELECT * FROM users WHERE id=${id} LIMIT 1`, (err, result)=>{
      if(err) throw err;
      resolve(result[0]);
    })
  })
  .then(user =>{
    return new Promise(resolve => {
      if(user.role === consts.ROLES.STUDENT){
        pool.query(`SELECT * FROM evaluations WHERE student_id=${id}`, (err, results)=>{
          if(err) throw err;
          resolve({user, evaluations: results});
        });
      } else {
        resolve({ user });
      }
    })
  });
}