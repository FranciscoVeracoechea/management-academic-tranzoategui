const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;

module.exports = (id, table) => {
  let query = `DELETE FROM ${table} WHERE id=${id}`;
  console.log(query)
  return new Promise(resolve => {
    pool.query(query, (err, results) => {
      if(err) throw err;
      console.log(results)
      resolve(results);
    });
  });
};