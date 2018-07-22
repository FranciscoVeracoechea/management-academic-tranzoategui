"use strict";
//dependencies
// const remote = require('electron').remote;
// const main = remote.require('./main.js');
// //database connecions
// const pool = main.pool;
// //utils
// const consts = require("./../../utils/consts");
//viewHandler
const UserViewHandler = require("./../../includes/Users");
const crypto = require("./../../utils/crypto");

function getTeachers() {
  return new Promise(resolve => {
    pool.query(`SELECT * FROM users WHERE role = '${consts.ROLES.TEACHER}'`, (err, results) =>{
      if (err) throw err;
      resolve(results);
    });
  });
}
function getStudents() {
  return new Promise(resolve => {
    pool.query(`SELECT * FROM users WHERE role = '${consts.ROLES.STUDENT}'`, (err, results) =>{
      if (err) throw err;
      resolve(results);
    });
  });
}

const searchUsers = (input = '', table = '') => {
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

async function showTeachers(){
  let teachers = await getTeachers();
  $(`table#teachersTable tbody`).empty();
  teachers.map(teacher => {
    UserViewHandler.addUser(teacher, "teachersTable tbody");
  });
}

async function showStudents() {
  let students = await getStudents();
  $(`table#studentsTable tbody`).empty();
  students.map(student => {
    UserViewHandler.addUser(student, "studentsTable tbody");
  });
}


$(async ()=>{
  showTeachers();
  showStudents();
  document.querySelector("a#teachers-tab").addEventListener("click", () => {
    showTeachers();
  });
  document.querySelector("a#students-tab").addEventListener("click", () => {
    showStudents();
  });

  let $newUserForm = $("form#newUserForm");

  $newUserForm.on("submit", (e) => {
    e.preventDefault();
    frontend.addLoader();
    let user = {};
    $newUserForm.serializeArray().map( json => {
      user[json.name] = json.value
    });
    user.password = crypto.encrypt(user.password);
    console.log(user.password)
    pool.query(`INSERT INTO users SET ?`, user, async (err) =>{
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
        frontend.removeLoader();
        $('html, body').animate({
          scrollTop: 0
        }, 400);
        frontend.showAlert(`éxito!`,`Usuario "${user.fullname}" creado!`);
      }
    });
  });

  //searchs
  $("input#inputSearchStudents").keyup(function(){
    let _this = this;
    $.each($(`table#studentsTable tbody tr`), function() {
        if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).fadeOut();
        else 
            $(this).fadeIn();
    });
  });
  $("input#inputSearchTeachers").keyup(function(){
    let _this = this;
    $.each($(`table#teachersTable tbody tr`), function() {
        if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).fadeOut();
        else 
            $(this).fadeIn();
    });
  });
  //asing subject ot user
  document.querySelector("ul#addUserToSubjectList").addEventListener("click", (e) =>{
    if(e.target.className === "list-group-item list-group-item-action user-to-subjects-selection"){
      let user_id = e.target.dataset.user;
      let school_subjects_id = e.target.dataset.subject;
      pool.query(`SELECT * FROM school_subjects__users WHERE user_id=${user_id} AND school_subjects_id=${school_subjects_id}`, 
        (err, results) => {
          if(err){
            $("div#addToSubjectModal").modal("hide");
            $('html, body').animate({
              scrollTop: 0
            }, 400);
            frontend.showAlert(`Error al insertar datos`, `${err.message}`, 'danger');
          } else if(results.length !== 0){
            $("div#addToSubjectModal").modal("hide");
            $('html, body').animate({
              scrollTop: 0
            }, 400);
            frontend.showAlert(`Error de Duplicado`, `este estudiante ya se encuentra en el programa`, 'danger');
          } else {
            pool.query(`INSERT INTO school_subjects__users (user_id, school_subjects_id) VALUES (${user_id}, ${school_subjects_id})`,
              (err, result) => {
                if(err){
                  $("div#addToSubjectModal").modal("hide");
                  $('html, body').animate({
                    scrollTop: 0
                  }, 400);
                  frontend.showAlert(`Error al insertar datos`, `${err.message}`, 'danger');
                } else{
                  $("div#addToSubjectModal").modal("hide");
                  $('html, body').animate({
                    scrollTop: 0
                  }, 400);
                  frontend.showAlert(`Exito!`, `Estudiante agragado correctamente`);
                }
              }
            ) 
          }
        }
      );
    }
  });
});