//dependencies
const remote = require('electron').remote;
const main = remote.require('./main.js');
//database connecions
const pool = main.pool;
//utils
const emailValidator = require("./../../utils/emailValidator");
const crypto = require("./../../utils/crypto");
const frontend = require("./../../utils/frontend");

$(()=>{
  let indicator = document.querySelector("#input-indicator"),
  $errorModal = $("#errorModal"), errorModalCotent = document.querySelector("#modal-content");
  $inputEmail = $("#inputEmail");
  let emailValid = false;

  $inputEmail.on("input", (e)=>{
    if(e.target.value){
      $inputEmail.val(e.target.value.toLowerCase());
      if(emailValidator(e.target.value)){
        emailValid = true;
        indicator.innerHTML = '<i class="fa fa-check text-success" aria-hidden="true"></i>';
      } else {
        emailValid = false;
        indicator.innerHTML = '<i class="fa fa-ban text-danger" aria-hidden="true" style="color: red;"></i>';
      }
    } else {
      emailValid = false;
      indicator.innerHTML = 'Login';
    }
  });
  
  $("#form-login").on("submit", (e)=>{
    e.preventDefault();
    frontend.addLoader();
    let inputEmail = document.querySelector("input#inputEmail");
    let inputPassword = document.querySelector("input#inputPassword");
    let password = inputPassword.value;

    pool.query({
      sql: `SELECT * FROM users WHERE email = ? LIMIT 1`,
      values: [inputEmail.value]
    }, (error, results, fields) => {
      if (error) throw error;
      if(!emailValid){
        errorModalCotent.innerHTML = `<p> El "email" es invalido, por favor ingrese uno con el formato correcto. </p>`;
        frontend.removeLoader();
        $errorModal.modal("show");
      } else if(!results.length || password !== crypto.decrypt(results[0].password)){
        errorModalCotent.innerHTML = `<p> Credenciales invalidas... </p>`;
        frontend.removeLoader();
        $errorModal.modal("show");
      } else if (results[0].status !== 'ACTIVE'){
        errorModalCotent.innerHTML = `<p>Este usuario se encuentra bloqueado, por favor pongase en contacto con los administradores</p>`;
        frontend.removeLoader();
        $errorModal.modal("show");
      } else{
        sessionStorage.setItem('user', JSON.stringify(results[0]));
        window.location.href = "./main.html";
      }
    });
  });
});