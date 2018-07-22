// view handler
const EvaluationsViewHandler = require("./../../includes/Evaluations");
//utils
const getAllsubjects = require("./../../utils/getAllsubjects");
const getSubjectsByUser = require("./../../utils/getSubjectsByUser");
const getEvaluationsBySubject = require("./../../utils/getEvaluationsBySubject");
const getUsersBySubject = require("./../../utils/getUsersBySubject");

// teacher 27

async function getSubjects(){
  let subjects;
  if(user.role === consts.ROLES.ADMIN){
    subjects = await getAllsubjects();
  } else if (user.role === consts.ROLES.TEACHER){
    subjects = await getSubjectsByUser(user.id);
  }
  return subjects;
}
async function showSubjectsSubmenu(){
  let subjects = await getSubjects();
  $("ul#evaluationsOptionsNav").empty();
  $("ul#newEvaluationSubjectsList").empty();
  $("ul#evaluationsOptionsNav").append(EvaluationsViewHandler.submenuHeader);
  subjects.map( (subject, i) => {
    EvaluationsViewHandler.addSubjectsTab(subject);
    EvaluationsViewHandler.addSubjectToModalForm(subject);
  });
  clickFirstNavItem();
}

async function addEvaluationsBySubject(subject_id){
  let evaluations = await getEvaluationsBySubject(subject_id);
  $("tbody#evaluationsTableBody").empty();
  evaluations.map(ev => EvaluationsViewHandler.showEvaluationRow(ev));
}

function clickFirstNavItem() {
  document.querySelector("ul#evaluationsOptionsNav").firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.click()
}

$(async ()=>{
  let selectedSubject = false, selectedUser = false;
  document.querySelector("a#evaluations-tab").addEventListener("click", () => {
    showSubjectsSubmenu();
  });

  showSubjectsSubmenu();
  let subjects = await getSubjects();
  // console.log(subjects[0].id)
  if(subjects.length > 0){
    addEvaluationsBySubject(subjects[0].id);
  }
  
  $("div#evaluationsModalContainer").append(EvaluationsViewHandler.newEvaluationModal);

  document.querySelector("ul#evaluationsOptionsNav").addEventListener("click", (e)=>{
    if(e.target.className === "nav-link list-group-item list-group-item-action subjects-tab-menu"){
      let className = e.target.className + " active";
      let oldActive = document.querySelector(`a.${className.replace(new RegExp(" ", 'g'), ".")}`);
      if(oldActive) {
        oldActive.classList.toggle("active");
      }
      e.target.classList.toggle("active");
      addEvaluationsBySubject(e.target.dataset.id);
    }
  });

  $("ul#newEvaluationSubjectsList").on("click", async (e) => {
    if(e.target.className.includes("subject-selection")){
      selectedSubject = e.target.dataset.id;
      selectedUser = false;
      $("ul#newEvaluationStudentsList").empty();
      let users = await getUsersBySubject(e.target.dataset.id);
      users.map(user => {
        EvaluationsViewHandler.addUserToModalForm(user);
      });
      let className = e.target.className + " active";
      let oldActive = document.querySelector(`li.${className.replace(new RegExp(" ", 'g'), ".")}`);
      if(oldActive) {
        oldActive.classList.toggle("active");
      }
      e.target.classList.toggle("active");
    }
  });
  $("ul#newEvaluationStudentsList").on("click", (e)=>{
    if(e.target.className.includes("user-selection")){
      selectedUser = e.target.dataset.id
    
      let className = e.target.className + " active";
      let oldActive = document.querySelector(`li.${className.replace(new RegExp(" ", 'g'), ".")}`);
      if(oldActive) {
        oldActive.classList.toggle("active");
      }
      e.target.classList.toggle("active");
    }
  });
  $("form#newEvaluationForm").on("submit", (e) =>{
    e.preventDefault();
    if(!selectedSubject || !selectedUser){
      alert("Error! Selecione un programa y un estudiante");
      return;
    }
    frontend.addLoader();
    let data = {};
    $("form#newEvaluationForm").serializeArray().map( json => {
      data[json.name] = json.value
    });
    data.school_subjects_id = selectedSubject;
    data.student_id = selectedUser;
    pool.query(`INSERT INTO evaluations SET ?`, data, async (err) =>{
      if(err){
        $('html, body').animate({
          scrollTop: 0
        }, 400);
        frontend.showAlert(`Error al insertar datos`, `${err.message}`, 'danger');
        frontend.removeLoader();
      } else {
        await showTeachers();
        await showStudents();
        e.target.reset();
        showSubjectsSubmenu();
        $("div#newEvaluationModal").modal("hide");
        frontend.removeLoader();
        $('html, body').animate({
          scrollTop: 0
        }, 400);
        frontend.showAlert(`éxito!`,`Evaluación "${data.description}" agregada!`);
      }
    });
  });
});