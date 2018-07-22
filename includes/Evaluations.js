const moment = require("moment");
const consts = require("./../utils/consts");

const tab = `
<li class="nav-item">
  <a data-tip="tooltip" data-placement="bottom" title="Evaluaciones" class="nav-link text-white" id="evaluations-tab" data-toggle="tab" href="#evaluations-content" role="tab" aria-controls="evaluations-content" aria-selected="false">
      <i class="fa fa-question-circle" aria-hidden="true"></i>
  </a>
</li>
`;
const addSubjectsTab = (subject) => {
  let html = `
  <li class="nav-item">
    <a class="nav-link list-group-item list-group-item-action subjects-tab-menu" data-id="${subject.id}" aria-selected="true">
      ${subject.name}
    </a>
  </li>
  `;
  $("ul#evaluationsOptionsNav").append(html);
}
const submenuHeader = `
<li class="nav-item">
  <div class="list-group-item list-group-item-action bg-dark text-light d-flex justify-content-between">
    <h5>Programas de Formación</h5> <h5><i class="fa fa-bars" aria-hidden="true"></i></h5>
  </div>
</li>
`;
const content = `
<div class="tab-pane fade container-fluid pt-6 p-4" id="evaluations-content" role="tabpanel" aria-labelledby="evaluations-tab">
  <div class="row">
    <div class="col-sm-5 col-md-4 col-lg-3 mb-4">
      <ul class="nav nav-tabs nav-pills list-group" id="evaluationsOptionsNav" role="tablist">
      </ul>
    </div>
    <div class="col-sm-7 col-md-8 col-lg-9">
      <div class="row pb-2">
        <div class="col-sm-6">
          <h4>Evaluaciones</h4>
        </div>
        <div class="col-sm-6 pull-right text-right">
          <button class="btn btn-info newEvaluation-button" id="newEvaluation">
            <i class="fa fa-plus"></i> Nueva Evaluación
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover bg-light" id="evaluationsTable">
          <thead class="bg-dark text-light">
            <tr>
              <th>Nro de control</th>
              <th>Descripción</th>
              <th>calificación</th>
              <th>Fecha</th>
              <th><i class="fa fa-cogs"></i></th>
            </tr>
          </thead>
          <tbody id="evaluationsTableBody">
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div id="evaluationsModalContainer"></div>
  <script src="./../js/evaluationsApp.js"></script>
</div>
`;
const addSubjectToModalForm = (subject) => {
  let html = `
  <li class="list-group-item list-group-item-action subject-selection" data-id="${subject.id}">
    ${subject.name}
  </li>
  `;
  $("ul#newEvaluationSubjectsList").append(html);
}
const addUserToModalForm = (user) => {
  let html = `
  <li class="list-group-item list-group-item-action user-selection" data-id="${user.id}">
    ${user.fullname}
  </li>
  `;
  $("ul#newEvaluationStudentsList").append(html);
}
const newEvaluationModal = `
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="newEvaluationModal" id="newEvaluationModal" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-dark text-light">
        <h5><i class="fa fa-plus"></i> Nueva Evaluación</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <form id="newEvaluationForm">
            <div class="row">
              <div class="col-sm-6">
                <h5>Selecciona un programa de formación:</h5>
                <ul class="list-group scroll-list" id="newEvaluationSubjectsList">
                </ul>
              </div>
              <div class="col-sm-6">
                <h5>Selecciona un estudiante:</h5>
                <ul class="list-group scroll-list" id="newEvaluationStudentsList">
                </ul>
              </div>
              <div class="col-sm-12">
              <div class="form-group row">
                <label for="newEvaluationInputQualification" class="col-sm-4 col-form-label">Calificación</label>
                <div class="col-sm-8">
                  <input type="number" name="qualification" class="form-control" id="newEvaluationInputQualification" min="01" max="99" placeholder="Calificación" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="newEvaluationInputDescription" class="col-sm-4 col-form-label">Nombre o Tema de Evaluación</label>
                <div class="col-sm-8">
                  <input type="text" name="description" class="form-control" id="newEvaluationInputDescription" placeholder="Nombre o Tema de Evaluación" required>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12 text-center">
                  <button type="submit" class="btn btn-danger">Crear Evaluación</button>
                </div>
              </div>
            </div>
          </form>
      </div>
    </div>.
  </div>
</div>
`;
const showEvaluationRow = (evaluation) => {
  let html = `
    <tr>
      <td>${evaluation.id}</td>
      <td>${evaluation.description}</td>
      <td>${evaluation.qualification}</td>
      <td>${moment(evaluation.created_at).format("L")}</td>
      <td>
        <button class="btn btn-danger btn-delete" data-id="${evaluation.id}" data-table="evaluations">
          <i class="fa fa-trash"></i> Borrar
        </button>
      </td>
    </tr>
  `;
  $("tbody#evaluationsTableBody").append(html);
}
module.exports = {
  content,
  tab,
  addSubjectsTab,
  submenuHeader,
  showEvaluationRow,
  newEvaluationModal,
  addSubjectToModalForm,
  addUserToModalForm
}