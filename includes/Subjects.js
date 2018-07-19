const consts = require("./../utils/consts");
const moment = require("moment");
const tab = `
<li class="nav-item">
  <a data-tip="tooltip" data-placement="bottom" title="Programas de Formación" class="nav-link text-white" id="subjects-tab" data-toggle="tab" href="#subjects" role="tab" aria-controls="subjects" aria-selected="false">
    <i class="fa fa-book" aria-hidden="true"></i>
  </a>
</li>
`;

const content = (role) => (`
<div class="tab-pane fade" id="subjects" role="tabpanel" aria-labelledby="subjects-tab">
  <section class="container-fluid p-4">
    <div class="row">
      <div class="col-sm-4 col-md-3 col-lg-2 mb-4">
        <ul class="nav nav-tabs nav-pills list-group" id="myTab" role="tablist">
          <li class="nav-item">
            <div class="list-group-item bg-dark text-light d-flex justify-content-between">
              <h5>Opciones</h5> <h5><i class="fa fa-bars" aria-hidden="true"></i></h5>
            </div>
          </li>
          <li class="nav-item ">
            <a class="nav-link active list-group-item list-group-item-action" id="all-subjects-tab" data-toggle="tab" href="#all-subjects-content" role="tab" aria-controls="all-subjects-content" aria-selected="true">
              Todos
            </a>
          </li>
          ${
            (role !== consts.ROLES.ADMIN)
            ? ''
            :
            ` <li class="nav-item">
                <a class="nav-link list-group-item list-group-item-action" id="new-subjects-tab" data-toggle="tab" href="#new-subjects-content" role="tab" aria-controls="new-subjects-content" aria-selected="false">
                  Crear Nuevo
                </a>
              </li>`
          }
          ${
            (role === consts.ROLES.ADMIN)
            ? ''
            :
            ` <li class="nav-item">
                <a class="nav-link list-group-item list-group-item-action" id="my-subjects-tab" data-toggle="tab" href="#my-subjects-content" role="tab" aria-controls="my-subjects-content" aria-selected="false">
                  Mis Programas de Formación
                </a>
              </li>`
          }
        </ul>
      </div>
      <div class="col-sm-8 col-md-9 col-lg-10">
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="all-subjects-content" role="tabpanel" aria-labelledby="home-tab">
          <div class="row">
            <div class="col-md-12">
              <h2>Programas de Formación</h2>
              <div class="row">
                <div class="col-md-5">
                  <div class="input-group mb-3">
                    <input id="inputSearchSubject" type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
                    <div class="input-group-prepend">
                      <i id="basic-addon1" class="input-group-text fa fa-search" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover bg-light" id="subjectsTable">
                  <thead class="bg-dark text-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Evaluaciones</th>
                      <th>Profesores</th>
                      <th>Estudiantes</th>
                      <th>Semanas</th>
                      <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                    </tr>
                  </thead>
                  <tbody id="subjects-tbody">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        ${
          (role !== consts.ROLES.ADMIN)
          ? ''
          :
          `<div class="tab-pane fade" id="new-subjects-content" role="tabpanel" aria-labelledby="subjects-tab">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header bg-dark text-light">
                    <h5><i class="fa fa-plus" aria-hidden="true"></i>  Nuevo programa de Formación</h5>
                  </div>
                  <form class="card-body" id="newSubjectForm">
                    <div class="form-group row">
                      <label for="subjectNameinput" class="col-sm-2 col-form-label">Título</label>
                      <div class="col-sm-10">
                        <input type="text" name="name" class="form-control" id="subjectNameinput" maxlength="68" placeholder="Título" required>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="subjectEvaluationsInput" class="col-sm-2 col-form-label">Número de Evaluaciones</label>
                      <div class="col-sm-10">
                        <input type="number" name="evaluations_number" value="1" class="form-control" id="subjectEvaluationsInput" min="1" max="99" placeholder="Número de Evaluaciones" required>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="subjectWeeksInput" class="col-sm-2 col-form-label">Número de Semanas</label>
                      <div class="col-sm-10">
                        <input type="number" name="weeks_number" value="1" class="form-control" id="subjectWeeksInput" min="1" max="99" placeholder="Número de Semanas" required>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="subjectsDescripitonTextarea" class="col-sm-2 col-form-label">Contenido Programático</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" name="description" id="subjectsDescripitonTextarea" placeholder="Contenido Programático" rows="8" required></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-12 text-center">
                        <button type="submit" class="btn btn-danger">Crear Programa</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>`
        }
        ${
          (role === consts.ROLES.ADMIN)
          ? ''
          :
          ` <div class="tab-pane fade" id="my-subjects-content" role="tabpanel" aria-labelledby="contact-tab">
              <div class="row">
                <div class="col-md-12">
                  <h2>Programas de Formación</h2>
                  <div class="row">
                    <div class="col-md-5">
                      <div class="input-group mb-3">
                        <input id="inputSearchMySubject" type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
                        <div class="input-group-prepend">
                          <i id="basic-addon1" class="input-group-text fa fa-search" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover bg-light" id="mySubjectsTable">
                      <thead class="bg-dark text-light">
                        <tr>
                          <th>Nombre</th>
                          <th>Evaluaciones</th>
                          <th>Profesores</th>
                          <th>Estudiantes</th>
                          <th>Semanas</th>
                          <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                        </tr>
                      </thead>
                      <tbody id="my-subjects-tbody">
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>`
        }
      </div>
      </div>
    </div>
    <div id="subjectModalsContainer"></div>
    <script src="./../js/subjectsApp.js"></script>
  </section>
</div>
`);
const addSubject = (subject, role, table = "tbody#subjects-tbody") =>{
  let html = `
  <tr>
    <th>${subject.name}</th>
    <td>${subject.evaluations_number}</td>
    <td>${subject.teachers_count}</td>
    <td>${subject.students_count}</td>
    <td>${subject.weeks_number}</td>
    <td>
      <div class="btn-group btn-group-sm" role="group">
        <button id="btnGroupDrop-${table}" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Acciones
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop-${table}">
          <a class="dropdown-item text-info subject-show" data-subject="${subject.id}" href="#"><i class="fa fa-eye" aria-hidden="true"></i> Ver más</a>
          ${
            (role !== consts.ROLES.ADMIN)
            ? ``
            :
              `<a class="dropdown-item text-info subject-edit" data-subject="${subject.id}" href="#"><i class="fa fa-pencil" aria-hidden="true"></i> Editar</a>
              <a class="dropdown-item text-danger subject-delete" data-subject="${subject.id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</a>`
          }
        </div>
      </div>
    </td>
  </tr>
  `;
  $(table).append(html);
}

const showModal = (subject, modalType = "dark") => {
  let html= `
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="subjectModal" id="subjectModal" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-${modalType}">
        <h5 class="modal-title text-light">${subject.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><b>Numero de evaluaciones</b> ${subject.evaluations_number}
        <br/>  <b>Numero de profesores</b> ${subject.teachers_count}
        <br/>  <b>Numero de alumnos</b> ${subject.students_count}</p>
        <hr>
        <p class="mt-2">
          <b>Descripción</b>
        </p>
        <div class="form-group row p-2">
          <textarea class="form-control" rows="12" readonly>${subject.description}</textarea>
        </div>
        <hr>
        <div className="text-right">
          <small class="text-muted">${moment.duration(moment(subject.created_at).diff(moment())).humanize()}</small>
        </div>
      </div>
    </div>
  </div>
</div>  
`;
document.querySelector("#subjectModalsContainer").innerHTML = html;
$("div#subjectModal").modal("show");
}

const editModal = (subject, modalType = "dark")=> {
  let html = 
  `<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="subjectModal" id="subjectModal" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-${modalType}">
            <h5 class="modal-title text-light">Editar ${subject.name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="editSubjectForm">
              <div class="form-group row">
                <label for="editSubjectEvaluationsInput" class="col-sm-2 col-form-label">Número de Evaluaciones</label>
                <div class="col-sm-10">
                  <input type="hidden" name="id" value="${subject.id}"/>
                  <input type="number" value="${subject.evaluations_number}" name="evaluations_number" value="1" class="form-control" id="editSubjectEvaluationsInput" min="1" max="99" placeholder="Número de Evaluaciones" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="editSubjectWeeksInput" class="col-sm-2 col-form-label">Número de Semanas</label>
                <div class="col-sm-10">
                  <input type="number" value="${subject.weeks_number}" name="weeks_number" value="1" class="form-control" id="editSubjectWeeksInput" min="1" max="99" placeholder="Número de Semanas" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="editSubjectsDescripitonTextarea" class="col-sm-2 col-form-label">Contenido Programático</label>
                <div class="col-sm-10">
                  <textarea class="form-control" name="description" id="editSubjectsDescripitonTextarea" placeholder="Contenido Programático" rows="12" required
                  >${subject.description}</textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12 text-center">
                  <button type="submit" class="btn btn-danger">Editar Programa</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>`;
    document.querySelector("#subjectModalsContainer").innerHTML = html;
    $("div#subjectModal").modal("show");
}

module.exports = {
  tab,
  content,
  addSubject,
  showModal,
  editModal
}