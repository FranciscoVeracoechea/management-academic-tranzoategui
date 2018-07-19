//dependencies
const remote = require('electron').remote;
const pool = remote.require('./main.js').pool;
const os = require('os');
const prettyBytes = require('pretty-bytes');
const moment = require('moment');
//utils
const consts = require("./../../utils/consts");
const frontend = require("./../../utils/frontend");
const loadNotices = require("./../../utils/loadNotices");
// const edidNotice = require("./editNotice");

//includes
const NoticeHTML = require("../../includes/Notice");
const ProfileHTML = require("./../../includes/ProfileView");
const addListenersToEditNotice = require("./../../utils/addListenersToEditNotice");
const Subjects = require("./../../includes/Subjects");

// let user = JSON.parse(sessionStorage.user);
let user = JSON.parse('{"id":1,"ci":"25257248","fullname":"Francisco Veracoechea","password":"591eac8920f14465","email":"veracoechea@gmail.com","role":"ADMIN","age":18,"direction":"barcelona","biography":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magnam similique perferendis minus maiores, nostrum aperiam cumque, at ea, quaerat quis qui ad sed architecto optio blanditiis consequuntur deserunt odio?","status":"ACTIVE","created_at":"2018-07-14T01:14:49.000Z","updated_at":"2018-07-14T02:26:47.000Z"}');

function setProfile(){
  document.getElementById("userFullname").innerText = user.fullname;
  document.getElementById("userDirection").innerText = user.direction;
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userCi").innerText = user.ci;
  document.getElementById("userAge").innerText = user.age;
  document.getElementById("userRole").innerText = user.role;
  document.getElementById("userCreatedAt").innerText = moment(user.created_at).format("DD/MM/YYYY");
  document.querySelector("img.avatar").src = `./../img/${user.role.toLowerCase()}.png`;
}
function loadViews(){
  let $tabsNav = $("#tabsNav"), $TabsContent = $("#TabsContent");
  $tabsNav.append(ProfileHTML.tab);
  $TabsContent.append(ProfileHTML.content);  
  $tabsNav.append(Subjects.tab);
  $TabsContent.append(Subjects.content);  
  if(user.role === consts.ROLES.ADMIN){
    $tabsNav.append(NoticeHTML.tab);
    $TabsContent.append(NoticeHTML.content);
    document.querySelector("#editNoticeModalContainer").innerHTML = NoticeHTML.editNoticeModal;
  }
}
function loadSingleNotice(id){
  return new Promise(resolve => {
    pool.query(`SELECT * FROM notices WHERE id=${id} LIMIT 1`, (err, results) =>{
      if(err) throw err;
      resolve(results[0])
    });
  });
}
function fillEditNoticeForm(notice){
  document.querySelector("input#editNoticeTitle").value = notice.title;
  document.querySelector("input#editNoticeType").value = notice.type;
  document.querySelector("textarea#editNoticeContent").value = notice.content;
}
async function  noticeCardsEventLinsteners(e){
  let notice = {};
  switch (e.target.className) {
    case "btn btn-sm btn-outline-danger view-notice-button":
      notice = await loadSingleNotice(e.target.dataset.notice);
      NoticeHTML.showModalNotice(notice);
      break;
    case "btn btn-sm btn-outline-dark edit-notice":
      notice = await loadSingleNotice(e.target.dataset.notice);
      fillEditNoticeForm(notice);
      addListenersToEditNotice(notice.id);
      $("div#noticeEditModal").modal("show");
      break;
  }
}
function setStats(){
  $(".stats").append(`Número de procesadores: <span>${ os.cpus().length}</span> - `);
  $(".stats").append(`Memoria libre: <span>${prettyBytes(os.freemem())}</span> - `);
  $(".stats").append(`Sistema operativo: <span>${os.type()}</span>`);
}


//Excecutiosn on Dom!
$( async ()=>{
  frontend.addLoader();
  loadViews();
  setStats();
  setProfile();
  await loadNotices(user.role);
  $('[data-tip="tooltip"]').tooltip();
  frontend.removeLoader();

  document.body.addEventListener("click", noticeCardsEventLinsteners);
  document.querySelector("a#home-tab").addEventListener("click", ()=> loadNotices(user.role));
});