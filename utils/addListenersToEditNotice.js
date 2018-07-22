// dependencies
const remote = require('electron').remote;
const main = remote.require('./main.js');
//database connecions
const pool = main.pool;
// utils
const frontend = require("./frontend");
const loadNotices = require("./loadNotices");

let user = JSON.parse(sessionStorage.user);
// let user = JSON.parse('{"id":1,"ci":"25257248","fullname":"Francisco Veracoechea","password":"591eac8920f14465","email":"veracoechea@gmail.com","role":"ADMIN","age":18,"direction":"barcelona","biography":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magnam similique perferendis minus maiores, nostrum aperiam cumque, at ea, quaerat quis qui ad sed architecto optio blanditiis consequuntur deserunt odio?","status":"ACTIVE","created_at":"2018-07-14T01:14:49.000Z","updated_at":"2018-07-14T02:26:47.000Z"}');

module.exports = addListenersToEditNotice = (noticeId) =>{
  let $formEditNotice = $("form#formEditNotice"),
    $inputEditImage = $("input#editNoticeImage"),
    $inputEditTitle = $("input#editNoticeTitle"),
    $inputEditContent = $("textarea#editNoticeContent"),
    $inputEditType = $("input#editNoticeType"),
    editedBase64Image = false,
    formEdictwNotice = document.querySelector("form#formEdictwNotice");

  $inputEditImage.on("change", (e)=>{
    let files = e.target.files || e.dataTransfer.files;
    if(!files.length) return;
    editedBase64Image = false;
    if(files[0].size >= 460800){
      $("#noticeEditModal").modal("hide");
      frontend.showAlert("La imagen es demasiado grande", "", "warning");
      formEdictwNotice.reset();
    } else {
      let fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.onload = function() { 
        editedBase64Image = fr.result; 
      };
    }
  });

  $formEditNotice.on("submit", (e)=>{
    e.preventDefault();
    frontend.addLoader();
    let notice = [
      $inputEditTitle.val(),
      $inputEditContent.val(),
      $inputEditType.val()
    ], imgQuery = "";
    if(editedBase64Image){
      imgQuery = ", image = ?";
      notice.push(editedBase64Image);
    }
    pool.query(
      `UPDATE notices SET title = ?, content = ?, type = ?${imgQuery} WHERE id=${noticeId}`, 
      notice, 
      (error)=>{
        if (error) throw error;
        e.target.reset();
        loadNotices(user.role)
        .then(()=>{
          frontend.removeLoader();
          $("#noticeEditModal").modal("hide");
          frontend.showAlert("Noticia editada con éxito!");
          $formEditNotice.off("submit");
          $inputEditImage.on("change");
        });
      });
  });
}