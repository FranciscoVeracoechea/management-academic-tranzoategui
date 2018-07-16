const remote = require('electron').remote;
const pool = remote.require("./main.js").pool;
const NoticeHTML = require("../includes/Notice");

module.exports = function loadNotices(role){
  let $noticeContainer = $("#noticeContainer");
  $noticeContainer.empty();
  $noticeContainer.append(NoticeHTML.header);
  return new Promise(resolve => {
    pool.query(`SELECT * FROM notices ORDER BY id DESC LIMIT 9`, (err, result, afectedRow) => {
      if(err) throw err;
      resolve(result.map(  notice => {
          NoticeHTML.showNotice(notice, role, $noticeContainer);
      }));
    });
  })
}