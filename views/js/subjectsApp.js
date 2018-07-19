//dependencies
const remote = require('electron').remote;
const main = remote.require('./main.js');
const loadAllSubjects = require("./../../utils/loadAllSubjects");
const loadMySubjects = require("./../../utils/loadMySubjects");
//database connecions
const pool = main.pool;
//utils
const frontend = require("./../../utils/frontend");
const loadSingleSubject = require("./../../utils/loadSingleSubject");
const SubjectsHTML = require("./../../includes/Subjects");
const consts = require("./../../utils/consts");
let subjectsTab = document.querySelector("a#all-subjects-tab");
subjectsTab.addEventListener("click", loadAllSubjects);


// let user = JSON.parse(sessionStorage.user);
user = JSON.parse('{"id":1,"ci":"25257248","fullname":"Francisco Veracoechea","password":"591eac8920f14465","email":"veracoechea@gmail.com","role":"ADMIN","age":18,"direction":"barcelona","biography":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magnam similique perferendis minus maiores, nostrum aperiam cumque, at ea, quaerat quis qui ad sed architecto optio blanditiis consequuntur deserunt odio?","status":"ACTIVE","created_at":"2018-07-14T01:14:49.000Z","updated_at":"2018-07-14T02:26:47.000Z"}');


const search = (input = '', table = '') => {
  $("input#inputSearchSubject").keyup(function(){
    _this = this;
    $.each($(`${table} tbody tr`), function() {
        if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).fadeOut();
        else 
            $(this).fadeIn();
    });
  });
}

function handleOnClickSubjectActions(e){
  switch (e.target.className) {
    case "dropdown-item text-info subject-show":
      loadSingleSubject(e.target.dataset.subject)
      .then(subject => SubjectsHTML.showModal(subject));
      break;
    case "dropdown-item text-info subject-edit":
      loadSingleSubject(e.target.dataset.subject)
      .then(subject => SubjectsHTML.editModal(subject));
      break;
  
    default:
      // e.preventDefault();
      break;
  }
}

$(()=>{
  let $newSubjectForm = $("form#newSubjectForm"),
      $editSubjectForm = $("form#editSubjectForm");
  if(user.role !== consts.ROLES.ADMIN){
    loadMySubjects(user.id, user.role);
  }
  
  search("input#inputSearchSubject", "table#subjectsTable");
  search("input#inputSearchMySubject", "table#mySubjectsTable");
  
  document.body.addEventListener("click", handleOnClickSubjectActions);
  
  $newSubjectForm.on("submit", function(e){
    e.preventDefault();
    frontend.addLoader();
    let subject = {};
    $("form#newSubjectForm").serializeArray().map( json => {
      subject[json.name] = json.value
    });
    pool.query(`INSERT INTO school_subjects SET ?`, subject, (err, results) =>{
      if(err) throw err;
      e.target.reset();
      subjectsTab.click();
      frontend.removeLoader();
      frontend.showAlert(`Programa de formación #${results.insertId} creado con éxito!`);
    });
  });

  $(document).on('submit', 'form#editSubjectForm', function (e) {
    e.preventDefault();
    frontend.addLoader();
    var subjectId;
    let subject = []
    $("form#editSubjectForm").serializeArray().forEach( json => {
      if(json.name !== "id"){
        subject.push(json.value);
      } else {
        subjectId = json.value;
      }
    });
    pool.query(`UPDATE school_subjects SET evaluations_number = ?, weeks_number = ?, description = ? WHERE id = ${subjectId}`, subject, (err, results) =>{
      if(err) throw err;
      e.target.reset();
      subjectsTab.click();
      $("div#subjectModal").modal("hide");
      frontend.removeLoader();
      frontend.showAlert(`Programa modificado con éxito!`);
    });
  });

});
