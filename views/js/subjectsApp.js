//dependencies
const remote = require('electron').remote;
const main = remote.require('./main.js');
const loadAllSubjects = require("./../../utils/loadAllSubjects");
//database connecions
const pool = main.pool;
//utils
const frontend = require("./../../utils/frontend");
let subjectsTab = document.querySelector("a#all-subjects-tab");
subjectsTab.addEventListener("click", loadAllSubjects);


let $newSubjectForm = $("form#newSubjectForm");

$(()=>{
  $("input#inputSearchSubject").keyup(function(){
    _this = this;
    $.each($("table#subjectsTable tbody tr"), function() {
        if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).fadeOut();
        else 
            $(this).fadeIn();
    });
  });
    
  $newSubjectForm.on("submit", function(e){
    e.preventDefault();
    frontend.addLoader();
    let subject = {};
    $newSubjectForm.serializeArray().map( json => {
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
});
