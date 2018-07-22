const moment = require("moment");
const consts = require("./../utils/consts");
const tab = `
<li class="nav-item">
  <a data-tip="tooltip" data-placement="bottom" title="Usuarios" class="nav-link text-white" id="users-tab" data-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="false">
    <i class="fa fa-users" aria-hidden="true"></i>
  </a>
</li>
`;

const content = `
<div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
  <section class="container-fluid p-4">
    <div class="row">
      <div class="col-sm-4 col-md-3 col-lg-2 mb-4">
        <ul class="nav nav-tabs nav-pills list-group" id="myTab" role="tablist">
          <li class="nav-item">
            <div class="list-group-item bg-dark text-light d-flex justify-content-between">
              <h5>Opciones</h5> <h5><i class="fa fa-bars" aria-hidden="true"></i></h5>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link active list-group-item list-group-item-action" id="teachers-tab" data-toggle="tab" href="#teachers-content" role="tab" aria-controls="teachers-content" aria-selected="true">
              Profesores
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link list-group-item list-group-item-action" id="students-tab" data-toggle="tab" href="#students-content" role="tab" aria-controls="students-content" aria-selected="true">
              Estudiantes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link list-group-item list-group-item-action" id="newUser-tab" data-toggle="tab" href="#newUser-content" role="tab" aria-controls="newUser-content" aria-selected="true">
              Crear Nuevo
            </a>
          </li>
        </ul>
      </div>
      <div class="col-sm-8 col-md-9 col-lg-10">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="teachers-content" role="tabpanel" aria-labelledby="teachers-tab">
            <div class="row">
              <div class="col-md-12">
                <h4>Profesores</h4>
                <div class="row">
                  <div class="col-md-5">
                    <div class="input-group mb-3">
                      <input required id="inputSearchTeachers" type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
                      <div class="input-group-prepend">
                        <i id="basic-addon1" class="input-group-text fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover bg-light" id="teachersTable">
                    <thead class="bg-dark text-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Edad</th>
                        <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                      </tr>
                    </thead>
                    <tbody id="teachersTtbody">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="students-content" role="tabpanel" aria-labelledby="students-tab">
            <div class="row">
              <div class="col-md-12">
                <h4>Estudiantes</h4>
                <div class="row">
                  <div class="col-md-5">
                    <div class="input-group mb-3">
                      <input required id="inputSearchStudents" type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
                      <div class="input-group-prepend">
                        <i id="basic-addon1" class="input-group-text fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover bg-light" id="studentsTable">
                    <thead class="bg-dark text-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Edad</th>
                        <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                      </tr>
                    </thead>
                    <tbody id="studentsTbody">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="newUser-content" role="tabpanel" aria-labelledby="newUser-tab">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header bg-dark text-light">
                    <i class="fa fa-plus" aria-hidden="true"></i> Nuevo usuario
                  </div>
                  <div class="card-body">
                    <form id="newUserForm">
                      <div class="form-group row">
                        <label for="newUserInputFullname" class="col-sm-2 col-form-label">Nombre y Apellido</label>
                        <div class="col-sm-10">
                          <input required type="text" class="form-control" name="fullname" id="newUserInputFullname" placeholder="Nombre y Apellido">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newUserInputCI" class="col-sm-2 col-form-label">CI</label>
                        <div class="col-sm-10">
                          <input required type="text" class="form-control" name="ci" id="newUserInputCI" placeholder="CI">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newUserInputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input required type="email" class="form-control" name="email" id="newUserInputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newUserInputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                          <input required type="password" class="form-control" name="password" id="newUserInputPassword" placeholder="Password">
                        </div>
                      </div>
                      <fieldset class="form-group">
                        <div class="row">
                          <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
                          <div class="col-sm-10">
                            <div class="form-check">
                              <input required class="form-check-input" type="radio" name="role" id="inputRoleStudent" value="${consts.ROLES.STUDENT}" checked>
                              <label class="form-check-label" for="inputRoleStudent">
                                Estudiante
                              </label>
                            </div>
                            <div class="form-check">
                              <input required class="form-check-input" type="radio" name="role" id="inputRoleTeacher" value="${consts.ROLES.TEACHER}">
                              <label class="form-check-label" for="inputRoleTeacher">
                                Profesor
                              </label>
                            </div>
                            <div class="form-check">
                              <input required class="form-check-input" type="radio" name="role" id="InputRoleAdmin" value="${consts.ROLES.ADMIN}">
                              <label class="form-check-label" for="InputRoleAdmin">
                                Administrador
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div class="form-group row">
                        <label for="newUserInputAge" class="col-sm-2 col-form-label">Edad</label>
                        <div class="col-sm-10">
                          <input required type="number" max="99" min="10" value="18" class="form-control" name="age" id="newUserInputAge" placeholder="Edad">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newUserInputDirection" class="col-sm-2 col-form-label">Dirección</label>
                        <div class="col-sm-10">
                          <input required type="text" maxlength="68" class="form-control" name="direction" id="newUserInputDirection" placeholder="Dirección">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newUserInputPhone" class="col-sm-2 col-form-label">Telefono</label>
                        <div class="col-sm-10">
                          <input required type="text"  maxlength="18" class="form-control" name="phone" id="newUserInputPhone" placeholder="Telefono">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newUserInputBiography" class="col-sm-2 col-form-label">Biografía</label>
                        <div class="col-sm-10">
                          <input type="text"  maxlength="168" class="form-control" name="biography" id="newUserInputBiography" placeholder="Biografía">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10 text-center">
                          <button type="submit" class="btn btn-danger">Crear Nuevo Usuario</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="addToSubjectModal" id="addToSubjectModal" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <h5>Lista de Programas</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card mb-4">
            <ul class="list-group scroll-list" id="addUserToSubjectList">
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="userModalContainer"></div>
  <script src="./../js/usersApp.js"></script>
</div>
`;

const addUser = (user, tableId) => {
  let html = `
    <tr>
      <td>${user.fullname}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.age}</td>
      <td>
      <div class="btn-group btn-group-sm" role="group">
          <button id="btnGroupDrop-users-${user.id}" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Acciones
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop-users-${user.id}">
            <a class="dropdown-item text-info user-show" data-user="${user.id}" href="#"><i class="fa fa-eye" aria-hidden="true"></i> Ver más</a>
            ${
              user.role === consts.ROLES.ADMIN
              ? ``
              : `
                <a class="dropdown-item text-info user-to-subject" data-user="${user.id}" href="#"><i class="fa fa-book" aria-hidden="true"></i> Asignar Programa</a>
                <a class="dropdown-item text-danger btn-delete" data-id="${user.id}" data-table="users" href="#"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</a>
              `
            }
          </div>
        </div>
      </td>
    </tr> `;
  $(`table#${tableId}`).append(html);
}

const addToProgramModal = (subjects, user_id) => {
  $("ul#addUserToSubjectList").empty();
    subjects.map(subject => {
      let html = `<li class="list-group-item list-group-item-action user-to-subjects-selection" data-user="${user_id}" data-subject="${subject.id}">
                    ${subject.name}
                  </li> `;
      $("ul#addUserToSubjectList").append(html);
    });
}
const showUser = (data) => {
  $("div#userModalContainer").empty();
  let html = `
  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="subjectModal" id="showUserModal" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <h5>${data.user.fullname}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card mb-4">
            <div class="card-body row">
              <div class="col-sm-6">
                <p><b>CI:</b> ${data.user.ci}</p>
                <p><b>Email:</b> ${data.user.email}</p>
              </div>
              <div class="col-sm-6">
                <p><b>Edad:</b> ${data.user.age}</p>
                <p><b>Telefono:</b> ${data.user.phone}</p>
              </div>
              <div class="col-sm-12">
                <p><b>Dirección:</b> ${data.user.direction}</p>
              </div>
            </div>
          </div>
          ${
            (data.user.role === consts.ROLES.STUDENT)
            ? 
            ` <div class="table-responsive">
                <h5>Evaluaciones</h5>
                <table class="table table-hover table-sm bg-ligth" id="userEvaluationsTable">
                  <thead class="bg-info text-light">
                    <tr>
                      <th>Nro de control</th>
                      <th>Descripción</th>
                      <th>calificación</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody id="userEvaluationsTbody">
                    ${
                      data.evaluations.map( ev => `
                        <tr>
                          <td>${ev.id}</td>
                          <td>${ev.description}</td>
                          <td>${ev.qualification}</td>
                          <td>${moment(ev.created_at).format("L")}</td>
                        </tr>
                      `)
                    }
                  </tbody>
                </table>
              </div>`
            : ``
          }
        </div>
      </div>
    </div>
  </div>
  `;
  $("div#userModalContainer").append(html);
  $("div#showUserModal").modal("show");
};

module.exports = {
  tab,
  content,
  addUser,
  showUser,
  addToProgramModal
}