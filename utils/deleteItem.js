const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;

module.exports = (id, table) => {
  let query = `DELETE FROM ${table} WHERE id=${id}`;
  console.log(query)
  return new Promise(resolve => {
    pool.query(query, (err, results) => {
      if(err) {
        $('html, body').animate({
          scrollTop: 0
        }, 400);
        frontend.showAlert(`Error al borrar`, `${err.message}`, 'danger');
        frontend.removeLoader();
      } else {
        resolve(results);
      }
    });
  });
};