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
          <li class="nav-item ">
            <a class="nav-link active list-group-item list-group-item-action" id="teachers-tab" data-toggle="tab" href="#teachers-content" role="tab" aria-controls="teachers-content" aria-selected="true">
              Profesores
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link list-group-item list-group-item-action" id="students-tab" data-toggle="tab" href="#students-content" role="tab" aria-controls="students-content" aria-selected="true">
              Estudiantes
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
                      <input id="inputSearchTeachers" type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
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
                        <th>Evaluaciones</th>
                        <th>Profesores</th>
                        <th>Estudiantes</th>
                        <th>Semanas</th>
                        <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                      </tr>
                    </thead>
                    <tbody id="">
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
                      <input id="inputSearchStudents" type="text" class="form-control" placeholder="Que buscas?" aria-label="Username" aria-describedby="basic-addon1">
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
                        <th>Evaluaciones</th>
                        <th>Profesores</th>
                        <th>Estudiantes</th>
                        <th>Semanas</th>
                        <th><i class="fa fa-cogs" aria-hidden="true"></i></th>
                      </tr>
                    </thead>
                    <tbody id="">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
`;

module.exports = {
  tab,
  content
}